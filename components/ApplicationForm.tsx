"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { applicationSchema, type ApplicationFormValues } from "@/lib/application-schema";

const interests = [
  "Business pathway",
  "Science pathway",
  "Подбор колледжа",
  "Консультация для родителей"
];

export function ApplicationForm() {
  const [serverState, setServerState] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interest: "",
      comment: ""
    }
  });

  async function onSubmit(values: ApplicationFormValues) {
    setServerState("idle");

    const response = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setServerState("error");
      return;
    }

    setServerState("success");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-[var(--ink)]">
          Ваше имя
        </label>
        <input
          id="name"
          {...register("name")}
          autoComplete="name"
          className="h-12 rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-sm font-semibold text-[var(--ink)]">
            Телефон
          </label>
          <input
            id="phone"
            {...register("phone")}
            autoComplete="tel"
            className="h-12 rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-[var(--ink)]">
            Имейл
          </label>
          <input
            id="email"
            {...register("email")}
            autoComplete="email"
            className="h-12 rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="interest" className="text-sm font-semibold text-[var(--ink)]">
          Интересующее направление
        </label>
        <select
          id="interest"
          {...register("interest")}
          className="h-12 rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
        >
          <option value="">Выберите направление</option>
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
        <FieldError message={errors.interest?.message} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="comment" className="text-sm font-semibold text-[var(--ink)]">
          Комментарии
        </label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={4}
          className="resize-none rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 py-3 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
        />
        <FieldError message={errors.comment?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-7 text-sm font-bold text-[var(--page)] shadow-[0_18px_50px_rgba(7,24,47,0.18)] transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--ink)_88%,var(--gold)_12%)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Отправляем" : "Оставить заявку"}
        <ArrowRight className="size-4 transition group-hover:translate-x-1" weight="bold" />
      </button>

      {serverState === "success" ? (
        <p className="flex items-center gap-2 rounded-xl bg-[color-mix(in_srgb,var(--gold)_12%,transparent)] px-4 py-3 text-sm font-semibold text-[var(--ink)] shadow-[0_12px_32px_rgba(7,24,47,0.06)]">
          <CheckCircle className="size-5 text-[var(--gold-deep)]" weight="fill" />
          Заявка отправлена. Мы с вами свяжемся.
        </p>
      ) : null}

      {serverState === "error" ? (
        <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 shadow-[0_12px_32px_rgba(127,29,29,0.08)]">
          <WarningCircle className="size-5" weight="fill" />
          Не удалось отправить заявку. Попробуйте еще раз или напишите на info@princeconsult.com.
        </p>
      ) : null}
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return <span className="min-h-5 text-xs text-[var(--muted)]"> </span>;
  }

  return <span className="min-h-5 text-xs font-semibold text-red-700">{message}</span>;
}
