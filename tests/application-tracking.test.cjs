const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

// Exercise the real submit handler with isolated transport, analytics and hooks.
// No requests are sent to Telegram or the live Meta dataset.
function loadSource(path, mocks = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, {
    exports,
    require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id),
    process: { env: {} },
    ...globals,
  }, { filename: path });
  return exports;
}

function formHarness({ trackLead = true, fetch, fbq }) {
  const states = [];
  const pixel = loadSource("lib/meta-pixel.ts", {}, { window: { fbq } });
  const { ApplicationForm } = loadSource("components/ApplicationForm.tsx", {
    react: {
      useId: () => "test-form",
      useRef: (current) => ({ current }),
      useState: (initial) => [initial, (state) => states.push(state)],
    },
    "react-hook-form": {
      Controller: () => null,
      useForm: () => ({
        register: () => ({}), reset: () => {}, control: {},
        handleSubmit: (handler) => handler,
        formState: { errors: {}, isSubmitting: false },
      }),
    },
    "@hookform/resolvers/zod": { zodResolver: () => {} },
    "@/lib/application-schema": {},
    "@/lib/meta-pixel": pixel,
    "react-phone-input-2": () => null,
    "react-phone-input-2/lang/ru.json": {},
    "@phosphor-icons/react": {},
  }, { fetch });
  const form = ApplicationForm({ trackLead });
  return { submit: () => form.props.onSubmit({ name: "Test", phone: "+998901234567", interest: "Студента" }), states };
}

const response = (ok, body) => ({ ok, json: async () => body });

test("popup sends one Lead only after confirmed success; concurrent clicks are ignored", async () => {
  let resolveRequest;
  let requests = 0;
  const events = [];
  const form = formHarness({
    fetch: () => { requests++; return new Promise((resolve) => { resolveRequest = resolve; }); },
    fbq: (...args) => events.push(args),
  });
  const pending = form.submit();
  await form.submit();
  assert.equal(requests, 1);
  assert.equal(events.length, 0);
  resolveRequest(response(true, { ok: true }));
  await pending;
  assert.deepEqual(events, [["track", "Lead"]]);
  assert.equal(form.states.at(-1), "success");
});

test("footer form sends no Lead", async () => {
  const events = [];
  const form = formHarness({ trackLead: false, fetch: async () => response(true, { ok: true }), fbq: (...args) => events.push(args) });
  await form.submit();
  assert.equal(form.states.at(-1), "success");
  assert.equal(events.length, 0);
});

test("failed, unconfirmed and malformed responses send no Lead and allow retry", async () => {
  for (const failure of [response(false, { ok: false }), response(true, { ok: false }), { ok: true, json: async () => { throw Error("invalid JSON"); } }]) {
    const events = [];
    let currentResponse = failure;
    const form = formHarness({ fetch: async () => currentResponse, fbq: (...args) => events.push(args) });
    await form.submit();
    assert.equal(form.states.at(-1), "error");
    assert.equal(events.length, 0);
    currentResponse = response(true, { ok: true });
    await form.submit();
    assert.equal(form.states.at(-1), "success");
    assert.equal(events.length, 1);
  }
});

test("blocked analytics cannot fail an accepted application", async () => {
  for (const fbq of [undefined, () => { throw Error("blocked"); }]) {
    const form = formHarness({ fetch: async () => response(true, { ok: true }), fbq });
    await form.submit();
    assert.equal(form.states.at(-1), "success");
  }
});

test("remounting the popup or reloading the page never sends a Lead", () => {
  const events = [];
  for (let i = 0; i < 3; i++) formHarness({ fetch: () => { throw Error("unexpected request"); }, fbq: (...args) => events.push(args) });
  assert.equal(events.length, 0);
});

test("server confirms Telegram JSON success, including HTTP 200 with ok:false", async () => {
  for (const accepted of [true, false]) {
    const route = loadSource("app/api/telegram/route.ts", {
      "next/server": { NextResponse: { json: (body, options = {}) => ({ body, status: options.status || 200 }) } },
      "@/lib/application-schema": { applicationSchema: { safeParse: () => ({ success: true, data: { name: "Test", phone: "+998901234567", interest: "Студента" } }) } },
    }, {
      URL,
      process: { env: { TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "test-chat" } },
      fetch: async () => response(true, { ok: accepted }),
    });
    const result = await route.POST({ url: "http://localhost/api/telegram", headers: new Headers(), json: async () => ({}) });
    assert.equal(result.status, accepted ? 200 : 502);
    assert.equal(result.body.ok === true, accepted);
  }
});

test("pixel bootstrap queues init, PageView and a Lead before external script loads", () => {
  const { SiteScripts } = loadSource("components/SiteScripts.tsx", {
    "next/script": () => null,
    "@/lib/meta-pixel": { META_PIXEL_ID: "29133354936276505" },
  });
  const bootstrap = SiteScripts().props.children;
  let inserted = 0;
  const window = {};
  const document = { createElement: () => ({}), getElementsByTagName: () => [{ parentNode: { insertBefore: () => inserted++ } }] };
  const context = vm.createContext({ window, document });
  Object.defineProperty(context, "fbq", { get: () => window.fbq });
  vm.runInContext(bootstrap, context);
  window.fbq("track", "Lead");
  assert.equal(inserted, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(window.fbq.queue.map((args) => Array.from(args)))), [
    ["init", "29133354936276505"], ["track", "PageView"], ["track", "Lead"],
  ]);
});
