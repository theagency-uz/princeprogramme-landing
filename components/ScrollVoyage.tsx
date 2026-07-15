"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollVoyage() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 22,
    mass: 0.32
  });

  const veilOpacity = useTransform(smoothProgress, [0, 0.08, 0.88, 1], [0, 0.95, 0.85, 0.25]);
  const navigatorY = useTransform(smoothProgress, [0, 1], ["9vh", "80vh"]);
  const navigatorX = useTransform(
    smoothProgress,
    [0, 0.22, 0.45, 0.7, 1],
    ["0px", "-34px", "18px", "-24px", "0px"]
  );
  const navigatorRotate = useTransform(smoothProgress, [0, 0.5, 1], [-18, 34, -10]);
  const navigatorScale = useTransform(smoothProgress, [0, 0.38, 0.72, 1], [0.86, 1.08, 0.94, 1]);
  const wakeLength = useTransform(smoothProgress, [0, 0.12, 1], [0, 0.16, 0.42]);
  const wakeOffset = useTransform(smoothProgress, [0, 1], [0, 0.72]);
  const latitudeShift = useTransform(smoothProgress, [0, 1], ["-12%", "16%"]);
  const compassSpin = useTransform(smoothProgress, [0, 1], [0, 180]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 hidden overflow-hidden md:block"
    >
      <motion.svg
        className="absolute inset-y-0 right-[-10vw] h-[100dvh] w-[62vw]"
        viewBox="0 0 760 1000"
        fill="none"
        preserveAspectRatio="none"
        style={{ opacity: veilOpacity }}
      >
        <defs>
          <linearGradient id="voyage-thread" x1="220" y1="10" x2="620" y2="940" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(198, 157, 69, 0)" />
            <stop offset="18%" stopColor="rgba(229, 199, 124, 0.5)" />
            <stop offset="48%" stopColor="rgba(245, 239, 219, 0.68)" />
            <stop offset="76%" stopColor="rgba(202, 160, 64, 0.52)" />
            <stop offset="100%" stopColor="rgba(198, 157, 69, 0)" />
          </linearGradient>
          <linearGradient id="voyage-silk" x1="160" y1="30" x2="650" y2="970" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(244, 224, 162, 0)" />
            <stop offset="30%" stopColor="rgba(244, 224, 162, 0.16)" />
            <stop offset="58%" stopColor="rgba(255, 255, 255, 0.12)" />
            <stop offset="100%" stopColor="rgba(244, 224, 162, 0)" />
          </linearGradient>
          <filter id="voyage-glow" x="-35%" y="-10%" width="170%" height="120%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.78 0 1 0 0 0.58 0 0 1 0 0.18 0 0 0 0.58 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M650 10C560 108 638 198 520 282C380 382 248 330 214 466C178 610 360 628 394 746C430 872 324 916 244 990"
          stroke="url(#voyage-silk)"
          strokeWidth="86"
          strokeLinecap="round"
        />
        <path
          d="M650 10C560 108 638 198 520 282C380 382 248 330 214 466C178 610 360 628 394 746C430 872 324 916 244 990"
          stroke="rgba(17, 42, 76, 0.09)"
          strokeWidth="1.2"
          strokeDasharray="9 20"
          strokeLinecap="round"
        />
        <motion.path
          d="M650 10C560 108 638 198 520 282C380 382 248 330 214 466C178 610 360 628 394 746C430 872 324 916 244 990"
          stroke="url(#voyage-thread)"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#voyage-glow)"
          style={{ pathLength: smoothProgress }}
        />
        <motion.path
          d="M650 10C560 108 638 198 520 282C380 382 248 330 214 466C178 610 360 628 394 746C430 872 324 916 244 990"
          stroke="rgba(255,255,255,0.86)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="1 18"
          style={{ pathLength: wakeLength, pathOffset: wakeOffset }}
        />

        <g opacity="0.46" stroke="rgba(199, 160, 78, 0.5)" strokeWidth="1.1">
          <path d="M604 130L624 142L604 154L584 142Z" />
          <path d="M482 300L506 314L482 328L458 314Z" />
          <path d="M230 472L254 486L230 500L206 486Z" />
          <path d="M382 742L406 756L382 770L358 756Z" />
          <path d="M282 900L306 914L282 928L258 914Z" />
        </g>

        <motion.g style={{ x: latitudeShift }} opacity="0.28" stroke="rgba(17, 42, 76, 0.22)" strokeWidth="1">
          <path d="M118 196C276 134 424 132 646 182" />
          <path d="M86 590C250 534 448 530 690 612" />
          <path d="M132 824C286 780 464 782 642 842" />
        </motion.g>
      </motion.svg>

      <motion.div
        className="absolute right-[5.7vw] top-0 h-16 w-16"
        style={{ y: navigatorY, x: navigatorX, rotate: navigatorRotate, scale: navigatorScale }}
      >
        <motion.svg
          viewBox="0 0 72 72"
          className="h-full w-full overflow-visible"
          style={{
            filter: "drop-shadow(0 18px 30px rgba(27, 49, 86, 0.2)) drop-shadow(0 0 18px rgba(210, 171, 76, 0.3))"
          }}
        >
          <motion.g style={{ rotate: compassSpin, transformOrigin: "36px 36px" }}>
            <path
              d="M36 2L45.5 26.5L70 36L45.5 45.5L36 70L26.5 45.5L2 36L26.5 26.5Z"
              fill="rgba(249, 244, 226, 0.9)"
              stroke="rgba(201, 160, 70, 0.82)"
              strokeWidth="1.4"
            />
            <path
              d="M36 13L41.2 30.8L59 36L41.2 41.2L36 59L30.8 41.2L13 36L30.8 30.8Z"
              fill="rgba(17, 42, 76, 0.92)"
            />
            <path d="M36 18L40 36L36 54L32 36Z" fill="rgba(234, 199, 111, 0.95)" />
          </motion.g>
        </motion.svg>
      </motion.div>
    </div>
  );
}
