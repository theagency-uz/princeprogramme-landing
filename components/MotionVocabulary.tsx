"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export function PageScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 });

  if (reduce) return null;

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-[var(--gold)]"
      style={{ scaleX, width: "100%" }}
    />
  );
}

export function ParallaxFrame({
  children,
  className,
  y = 72,
  scale = 0.06
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const translateY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [y, -y]);
  const imageScale = useTransform(scrollYProgress, [0, 0.55, 1], reduce ? [1, 1, 1] : [1 + scale, 1, 1 + scale / 2]);

  return (
    <motion.div ref={ref} className={className} style={{ y: translateY, scale: imageScale }}>
      {children}
    </motion.div>
  );
}

const heroSignalPoints = [
  { x: "9%", y: "71%", delay: 1.05 },
  { x: "34%", y: "36%", delay: 1.22 },
  { x: "61%", y: "29%", delay: 1.39 },
  { x: "82%", y: "17%", delay: 1.56 }
];

const heroFieldMarks = [
  { x: "15%", y: "18%", size: "size-2", delay: 1.2 },
  { x: "28%", y: "78%", size: "size-1.5", delay: 1.38 },
  { x: "51%", y: "13%", size: "size-2.5", delay: 1.56 },
  { x: "73%", y: "64%", size: "size-1.5", delay: 1.74 },
  { x: "90%", y: "38%", size: "size-2", delay: 1.92 }
];

export function HeroHeadlineWords({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.16,
            staggerChildren: 0.085
          }
        }
      }}
    >
      {words.map((word) => (
        <span key={word} className="inline-block overflow-hidden pr-[0.16em] pb-[0.045em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "112%", opacity: 0, rotateX: -64 },
              visible: {
                y: "0%",
                opacity: 1,
                rotateX: 0,
                transition: { type: "spring", stiffness: 130, damping: 18, mass: 0.85 }
              }
            }}
            style={{ transformOrigin: "50% 100%" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export function HeroCinematicStage({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 22, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 22, mass: 0.45 });
  const rotateY = useTransform(smoothX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const lightX = useTransform(smoothX, [-1, 1], [18, 82]);
  const lightY = useTransform(smoothY, [-1, 1], [22, 72]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(247,243,234,0.32), rgba(247,243,234,0.06) 27%, transparent 58%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      initial={
        reduce
          ? false
          : {
              clipPath: "polygon(0 0, 64% 0, 48% 100%, 0 100%)",
              opacity: 0,
              scale: 0.965
            }
      }
      animate={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        scale: 1
      }}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d"
      }}
      transition={reduce ? { duration: 0 } : { duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 mix-blend-screen"
        style={{ background: spotlight }}
      />
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
        <svg className="absolute inset-0 size-full" viewBox="0 0 900 680" preserveAspectRatio="none">
          <motion.path
            d="M88 486 C185 420 215 262 345 252 C462 243 514 124 734 104 C787 99 814 82 844 58"
            fill="none"
            stroke="rgba(247,243,234,0.58)"
            strokeWidth="2.3"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { delay: 0.72, duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M88 486 C185 420 215 262 345 252 C462 243 514 124 734 104 C787 99 814 82 844 58"
            fill="none"
            stroke="rgba(201,166,70,0.95)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 0.55 }
                : { pathLength: [0, 0.23, 0.23], pathOffset: [0, 0.42, 0.86], opacity: [0, 1, 0] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { delay: 1.45, duration: 3.05, repeat: Infinity, repeatDelay: 1.05, ease: "easeInOut" }
            }
          />
          <motion.text
            x="74"
            y="528"
            fill="rgba(247,243,234,0.86)"
            fontSize="19"
            fontWeight="800"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { delay: 1.02, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Central Asia
          </motion.text>
          <motion.text
            x="658"
            y="48"
            fill="rgba(247,243,234,0.9)"
            fontSize="19"
            fontWeight="800"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { delay: 1.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            United Kingdom
          </motion.text>
        </svg>

        {heroSignalPoints.map((point) => (
          <motion.span
            key={`${point.x}-${point.y}`}
            className="absolute size-3 rounded-full bg-[var(--gold)] shadow-[0_0_26px_rgba(201,166,70,0.76)]"
            style={{ left: point.x, top: point.y, translateX: "-50%", translateY: "-50%" }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { delay: point.delay, type: "spring", stiffness: 320, damping: 18 }}
          />
        ))}

        {heroFieldMarks.map((mark) => (
          <motion.span
            key={`${mark.x}-${mark.y}`}
            className={`absolute ${mark.size} rotate-45 rounded-[2px] bg-[#f7f3ea]/88 shadow-[0_0_18px_rgba(247,243,234,0.54)]`}
            style={{ left: mark.x, top: mark.y }}
            initial={reduce ? false : { opacity: 0, scale: 0.35 }}
            animate={
              reduce
                ? { opacity: 0.7, scale: 1 }
                : { opacity: [0, 0.9, 0.38, 0.85], scale: [0.35, 1, 0.72, 1] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { delay: mark.delay, duration: 3.4, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }
            }
          />
        ))}
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[-22%] z-30 w-[24%] -rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-md"
        initial={reduce ? false : { x: "-145%", opacity: 0 }}
        animate={reduce ? undefined : { x: "560%", opacity: [0, 1, 0] }}
        transition={{ delay: 0.78, duration: 1.18, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

export function ProgramArcAnimation({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const points = [
    { cx: 84, cy: 166, r: 7, delay: 0.34 },
    { cx: 228, cy: 74, r: 5, delay: 0.48 },
    { cx: 404, cy: 126, r: 6, delay: 0.62 },
    { cx: 566, cy: 38, r: 8, delay: 0.76 }
  ];

  return (
    <svg className={className} viewBox="0 0 640 220" fill="none" aria-hidden="true">
      <motion.path
        d="M54 178 C126 86 184 44 270 72 C362 103 392 174 486 96 C526 63 559 45 606 34"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={reduce ? { duration: 0 } : { duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M54 178 C126 86 184 44 270 72 C362 103 392 174 486 96 C526 63 559 45 606 34"
        stroke="rgba(247,243,234,0.92)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, pathOffset: 0, opacity: 0 }}
        whileInView={
          reduce
            ? { pathLength: 1, opacity: 0.26 }
            : { pathLength: [0, 0.18, 0.18], pathOffset: [0, 0.46, 0.92], opacity: [0, 0.9, 0] }
        }
        viewport={{ once: false, amount: 0.35 }}
        transition={
          reduce
            ? { duration: 0 }
            : { delay: 0.82, duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }
        }
      />
      {points.map((point) => (
        <motion.g key={`${point.cx}-${point.cy}`}>
          <motion.circle
            cx={point.cx}
            cy={point.cy}
            r={point.r + 12}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.24"
            initial={reduce ? false : { scale: 0.52, opacity: 0 }}
            whileInView={reduce ? { opacity: 0.24, scale: 1 } : { scale: [0.52, 1.16, 1], opacity: [0, 0.34, 0.24] }}
            viewport={{ once: true, amount: 0.35 }}
            transition={reduce ? { duration: 0 } : { delay: point.delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${point.cx}px ${point.cy}px` }}
          />
          <motion.circle
            cx={point.cx}
            cy={point.cy}
            r={point.r}
            fill="currentColor"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={reduce ? { duration: 0 } : { delay: point.delay + 0.08, type: "spring", stiffness: 280, damping: 18 }}
            style={{ transformOrigin: `${point.cx}px ${point.cy}px` }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

export function CollegeNetworkAnimation({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const nodes = [
    { cx: 78, cy: 144, delay: 0.18 },
    { cx: 178, cy: 70, delay: 0.3 },
    { cx: 292, cy: 116, delay: 0.42 },
    { cx: 396, cy: 54, delay: 0.54 },
    { cx: 490, cy: 136, delay: 0.66 }
  ];

  return (
    <svg className={className} viewBox="0 0 560 220" fill="none" aria-hidden="true">
      <motion.path
        d="M78 144 L178 70 L292 116 L396 54 L490 136"
        stroke="rgba(201,166,70,0.78)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.34 }}
        transition={reduce ? { duration: 0 } : { duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M78 144 C152 188 250 180 292 116 C330 58 428 74 490 136"
        stroke="rgba(247,243,234,0.3)"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.34 }}
        transition={reduce ? { duration: 0 } : { delay: 0.28, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="292"
        cy="116"
        r="86"
        stroke="rgba(247,243,234,0.14)"
        strokeWidth="1"
        initial={reduce ? false : { scale: 0.72, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.34 }}
        transition={reduce ? { duration: 0 } : { delay: 0.46, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "292px 116px" }}
      />
      {nodes.map((node, index) => (
        <motion.g key={`${node.cx}-${node.cy}`}>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r={index === 2 ? 12 : 8}
            fill={index === 2 ? "rgba(201,166,70,0.95)" : "rgba(247,243,234,0.9)"}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.34 }}
            transition={reduce ? { duration: 0 } : { delay: node.delay, type: "spring", stiffness: 260, damping: 17 }}
            style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
          />
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r={index === 2 ? 25 : 18}
            stroke={index === 2 ? "rgba(201,166,70,0.52)" : "rgba(247,243,234,0.24)"}
            strokeWidth="1"
            initial={reduce ? false : { scale: 0.5, opacity: 0 }}
            whileInView={reduce ? { scale: 1, opacity: 1 } : { scale: [0.5, 1.2, 1], opacity: [0, 1, 0.7] }}
            viewport={{ once: true, amount: 0.34 }}
            transition={reduce ? { duration: 0 } : { delay: node.delay + 0.12, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

export function PathwayWeaveAnimation({
  className,
  tone = "light"
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduce = useReducedMotion();
  const mainStroke = tone === "dark" ? "rgba(215,185,87,0.68)" : "rgba(147,117,29,0.5)";
  const softStroke = tone === "dark" ? "rgba(247,243,234,0.15)" : "rgba(7,24,47,0.12)";
  const signalStroke = tone === "dark" ? "rgba(247,243,234,0.72)" : "rgba(201,166,70,0.76)";

  return (
    <svg className={className} viewBox="0 0 900 280" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <motion.path
        d="M18 218 C150 66 274 72 370 172 C444 248 548 254 630 162 C708 74 788 62 876 112"
        stroke={mainStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={reduce ? { duration: 0 } : { duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M114 118 C192 188 286 204 362 150 M506 212 C556 134 608 102 684 96 M704 92 C742 154 792 184 856 172"
        stroke={softStroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={reduce ? { duration: 0 } : { delay: 0.26, duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M18 218 C150 66 274 72 370 172 C444 248 548 254 630 162 C708 74 788 62 876 112"
        stroke={signalStroke}
        strokeWidth="8"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, pathOffset: 0, opacity: 0 }}
        whileInView={
          reduce
            ? { pathLength: 1, opacity: 0.2 }
            : { pathLength: [0, 0.16, 0.16], pathOffset: [0, 0.46, 0.9], opacity: [0, 0.8, 0] }
        }
        viewport={{ once: false, amount: 0.28 }}
        transition={
          reduce
            ? { duration: 0 }
            : { delay: 0.72, duration: 3.15, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }
        }
      />
    </svg>
  );
}

export function WhyCompassAnimation({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg className={className} viewBox="0 0 320 320" fill="none" aria-hidden="true">
      <motion.circle
        cx="160"
        cy="160"
        r="112"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.22"
        initial={reduce ? false : { scale: 0.82, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.22 }}
        viewport={{ once: true, amount: 0.32 }}
        transition={reduce ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "160px 160px" }}
      />
      <motion.circle
        cx="160"
        cy="160"
        r="76"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.16"
        initial={reduce ? false : { scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.16 }}
        viewport={{ once: true, amount: 0.32 }}
        transition={reduce ? { duration: 0 } : { delay: 0.18, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "160px 160px" }}
      />
      <motion.path
        d="M160 34 L181 139 L286 160 L181 181 L160 286 L139 181 L34 160 L139 139 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.44"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.44 }}
        viewport={{ once: true, amount: 0.32 }}
        transition={reduce ? { duration: 0 } : { delay: 0.32, duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M96 196 C122 144 174 118 226 112"
        stroke="rgba(247,243,234,0.72)"
        strokeWidth="7"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: reduce ? 0.45 : [0, 0.76, 0.38] }}
        viewport={{ once: false, amount: 0.32 }}
        transition={
          reduce
            ? { duration: 0 }
            : { delay: 0.9, duration: 2.4, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }
        }
      />
      <motion.circle
        cx="160"
        cy="160"
        r="9"
        fill="currentColor"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.32 }}
        transition={reduce ? { duration: 0 } : { delay: 0.66, type: "spring", stiffness: 260, damping: 18 }}
        style={{ transformOrigin: "160px 160px" }}
      />
    </svg>
  );
}

export function AcademicPulseAnimation({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ticks = Array.from({ length: 16 }, (_, index) => index);

  return (
    <svg className={className} viewBox="0 0 260 260" fill="none" aria-hidden="true">
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? { duration: 0 } : { duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "130px 130px" }}
      >
        {ticks.map((tick) => {
          const angle = (tick / ticks.length) * Math.PI * 2;
          const x1 = Math.cos(angle) * 102 + 130;
          const y1 = Math.sin(angle) * 102 + 130;
          const x2 = Math.cos(angle) * 116 + 130;
          const y2 = Math.sin(angle) * 116 + 130;

          return (
            <motion.line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.35"
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 0.35, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduce ? { duration: 0 } : { delay: tick * 0.025, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </motion.g>
      {[92, 60, 28].map((radius, index) => (
        <motion.circle
          key={radius}
          cx="130"
          cy="130"
          r={radius}
          stroke="currentColor"
          strokeWidth={index === 0 ? "1.5" : "1"}
          opacity={index === 0 ? "0.28" : "0.18"}
          initial={reduce ? false : { scale: 0.72, opacity: 0 }}
          whileInView={{ scale: 1, opacity: index === 0 ? 0.28 : 0.18 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduce ? { duration: 0 } : { delay: 0.12 + index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "130px 130px" }}
        />
      ))}
      <motion.path
        d="M83 133 L116 159 L181 88"
        stroke="rgba(247,243,234,0.9)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduce ? { duration: 0 } : { delay: 0.58, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="130"
        cy="130"
        r="118"
        stroke="rgba(247,243,234,0.62)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="120 650"
        initial={reduce ? false : { rotate: -120, opacity: 0 }}
        whileInView={{ rotate: reduce ? 0 : 240, opacity: reduce ? 0.3 : [0, 0.64, 0.18] }}
        viewport={{ once: false, amount: 0.3 }}
        transition={reduce ? { duration: 0 } : { delay: 1, duration: 3.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "130px 130px" }}
      />
    </svg>
  );
}

export function CampusArchAnimation({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg className={className} viewBox="0 0 520 420" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <motion.path
        d="M82 352 L82 176 C82 83 162 42 260 42 C358 42 438 83 438 176 L438 352"
        stroke="rgba(247,243,234,0.72)"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={reduce ? { duration: 0 } : { duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
      />
      {[142, 218, 302, 378].map((x, index) => (
        <motion.path
          key={x}
          d={`M${x} 352 L${x} 170`}
          stroke="rgba(247,243,234,0.42)"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={reduce ? { duration: 0 } : { delay: 0.28 + index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <motion.path
        d="M58 352 H462"
        stroke="rgba(201,166,70,0.86)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={reduce ? { duration: 0 } : { delay: 0.72, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M82 352 L82 176 C82 83 162 42 260 42 C358 42 438 83 438 176 L438 352"
        stroke="rgba(201,166,70,0.9)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, pathOffset: 0, opacity: 0 }}
        whileInView={
          reduce
            ? { pathLength: 1, opacity: 0.2 }
            : { pathLength: [0, 0.13, 0.13], pathOffset: [0, 0.44, 0.86], opacity: [0, 0.72, 0] }
        }
        viewport={{ once: false, amount: 0.28 }}
        transition={reduce ? { duration: 0 } : { delay: 1.05, duration: 3.1, repeat: Infinity, repeatDelay: 1.3, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function BenefitGlyphAnimation({
  className,
  variant
}: {
  className?: string;
  variant: "gate" | "branch" | "mentor" | "shield" | "value";
}) {
  const reduce = useReducedMotion();
  const paths = {
    gate: [
      "M30 148 V82 C30 48 58 30 96 30 C134 30 162 48 162 82 V148",
      "M54 148 V86 M96 148 V58 M138 148 V86"
    ],
    branch: [
      "M34 152 C68 116 82 82 96 40 C112 86 132 116 166 152",
      "M96 40 L96 156 M69 103 C84 104 92 112 96 128 M123 101 C110 104 101 113 96 130"
    ],
    mentor: [
      "M42 132 C72 74 122 74 152 132",
      "M64 92 C86 58 110 58 132 92 M72 142 C88 122 106 122 122 142"
    ],
    shield: [
      "M96 28 L158 54 V98 C158 132 134 154 96 166 C58 154 34 132 34 98 V54 Z",
      "M68 94 L88 116 L126 76"
    ],
    value: [
      "M38 130 C60 70 96 44 154 54",
      "M50 154 C84 106 122 92 166 98 M70 70 C92 132 112 148 150 158"
    ]
  }[variant];

  return (
    <svg className={className} viewBox="0 0 192 192" fill="none" aria-hidden="true">
      <motion.circle
        cx="96"
        cy="96"
        r="72"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
        initial={reduce ? false : { scale: 0.78, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={reduce ? { duration: 0 } : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "96px 96px" }}
      />
      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke={index === 0 ? "currentColor" : "rgba(201,166,70,0.86)"}
          strokeWidth={index === 0 ? "2.2" : "5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: index === 0 ? 0.32 : 0.9 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={reduce ? { duration: 0 } : { delay: 0.16 + index * 0.22, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}

export function ContactSignatureAnimation({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg className={className} viewBox="0 0 640 220" fill="none" aria-hidden="true">
      <motion.path
        d="M46 146 C98 84 160 75 216 116 C260 148 290 170 336 132 C386 92 430 84 480 116 C512 136 544 150 596 106"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.72 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={reduce ? { duration: 0 } : { duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M118 156 C206 190 394 194 538 144"
        stroke="rgba(201,166,70,0.86)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={reduce ? { duration: 0 } : { delay: 0.4, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      />
      {[92, 252, 478].map((cx, index) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={index === 1 ? 96 : 132}
          r={index === 1 ? 7 : 5}
          fill="currentColor"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.8, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={reduce ? { duration: 0 } : { delay: 0.62 + index * 0.12, type: "spring", stiffness: 260, damping: 17 }}
          style={{ transformOrigin: `${cx}px ${index === 1 ? 96 : 132}px` }}
        />
      ))}
    </svg>
  );
}

export function ClipReveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.72 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function NumberTicker({
  value,
  suffix = "",
  className
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString("ru-RU"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: value > 500 ? 1.25 : 0.9,
      ease: [0.16, 1, 0.3, 1]
    });
    return controls.stop;
  }, [inView, motionValue, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function LineDrawing({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg className={className} viewBox="0 0 760 220" fill="none" aria-hidden="true">
      <motion.path
        d="M18 175 C130 50 225 208 334 92 C454 -35 520 166 742 34"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
      />
      {[18, 334, 742].map((cx, index) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={index === 0 ? 175 : index === 1 ? 92 : 34}
          r="7"
          fill="currentColor"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ delay: 0.5 + index * 0.18, type: "spring", stiffness: 260, damping: 18 }}
        />
      ))}
    </svg>
  );
}

export function OrbitCountries({ countries }: { countries: string[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[36px] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--paper)_92%,var(--gold)_8%),color-mix(in_srgb,var(--page)_80%,var(--paper)_20%))] p-7 shadow-[0_26px_80px_rgba(7,24,47,0.08)]">
      <svg className="pointer-events-none absolute inset-0 size-full text-[var(--gold)]" viewBox="0 0 460 420" fill="none" aria-hidden="true" preserveAspectRatio="none">
        {[42, 72, 104].map((radius, index) => (
          <motion.circle
            key={radius}
            cx="230"
            cy="228"
            r={radius}
            stroke="currentColor"
            strokeWidth="1.4"
            initial={reduce ? false : { scale: 0.62, opacity: 0 }}
            animate={
              reduce
                ? { scale: 1, opacity: 0.12 }
                : { scale: [0.62, 1.42, 1.78], opacity: [0, 0.18, 0] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { delay: index * 0.52, duration: 3.2, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }
            }
            style={{ transformOrigin: "230px 228px" }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 hidden size-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--gold)_22%,transparent),transparent_64%)] md:block"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between">
        <div className="max-w-sm">
          <p className="text-sm font-black text-[var(--gold-deep)]">Central Asia</p>
          <h3 className="font-display mt-3 text-4xl font-semibold leading-tight">Пять стран региона</h3>
        </div>
        <div className="relative mx-auto hidden size-[310px] md:block">
          <div className="absolute inset-14 grid place-items-center rounded-full bg-[var(--ink)] text-center text-sm font-black text-[var(--page)] shadow-[0_24px_70px_rgba(7,24,47,0.22)]">
            Prince<br />Programme
          </div>
          {countries.map((country, index) => {
            const angle = (index / countries.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * 132 + 155;
            const y = Math.sin(angle) * 132 + 155;
            return (
              <motion.div
                key={country}
                className="absolute rounded-full bg-[var(--paper)] px-4 py-2 text-sm font-black text-[var(--ink)] shadow-[0_16px_40px_rgba(7,24,47,0.1)]"
                style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
                initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 220, damping: 18 }}
              >
                {country}
              </motion.div>
            );
          })}
        </div>
        <div className="grid gap-3 md:hidden">
          {countries.map((country, index) => (
            <motion.div
              key={country}
              className="rounded-2xl bg-[var(--paper)] px-5 py-4 text-base font-black text-[var(--ink)] shadow-[0_12px_32px_rgba(7,24,47,0.08)]"
              initial={reduce ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {country}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TiltSurface({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.4 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -8);
    rotateY.set(px * 8);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
        transformStyle: "preserve-3d"
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      whileHover={reduce ? undefined : { scale: 1.012 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

export function WhyScrollScrub({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-38, 38]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0.72, 1, 1, 0.78]);

  return (
    <motion.div ref={ref} className={className} style={{ x, opacity }}>
      {children}
    </motion.div>
  );
}
