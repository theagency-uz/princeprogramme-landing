"use client";

import Image from "next/image";
import { Buildings } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

type CollegeMedia = {
	id: string;
	name: string;
	type: "video" | "image";
	videoId?: string;
	imageSrc?: string;
	alt?: string;
};

const collegeMedia: CollegeMedia[] = [
	{
		id: "plymouth",
		name: "City College Plymouth",
		type: "video",
		videoId: "qhRlKnGd9XQ",
	},
	{
		id: "edinburgh",
		name: "Edinburgh College",
		type: "video",
		videoId: "J1Xhnv69JdI",
	},
	{
		id: "glasgow",
		name: "City of Glasgow College",
		type: "video",
		videoId: "35aPmGb43GI",
	},
];

const transition = { duration: 0.56, ease: [0.16, 1, 0.3, 1] as const };

export function CollegesShowcase() {
	const reduceMotion = useReducedMotion();
	const [activeIndex, setActiveIndex] = useState(2);
	const [direction, setDirection] = useState(1);
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const activeCollege = collegeMedia[activeIndex];
	const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

	const selectCollege = (nextIndex: number) => {
		if (nextIndex === activeIndex) return;
		setDirection(nextIndex > activeIndex ? 1 : -1);
		setActiveIndex(nextIndex);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

		event.preventDefault();
		let nextIndex = index;

		if (event.key === "Home") nextIndex = 0;
		else if (event.key === "End") nextIndex = collegeMedia.length - 1;
		else if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % collegeMedia.length;
		else nextIndex = (index - 1 + collegeMedia.length) % collegeMedia.length;

		selectCollege(nextIndex);
		tabRefs.current[nextIndex]?.focus();
	};

	return (
		<div className="grid gap-3 lg:grid-cols-[minmax(0,1.58fr)_minmax(300px,0.62fr)]">
			<div
				id="college-media-panel"
				role="tabpanel"
				aria-labelledby={`college-tab-${activeCollege.id}`}
				className="relative aspect-video min-h-[240px] overflow-hidden rounded-[28px] bg-[#031328] md:min-h-[420px] lg:aspect-auto lg:min-h-[560px]"
			>
				<AnimatePresence mode="wait" custom={direction} initial={false}>
					<motion.div
						key={activeCollege.id}
						custom={direction}
						initial={reduceMotion ? false : { opacity: 0, x: direction * 42, scale: 0.975 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -32, scale: 1.018 }}
						transition={reduceMotion ? { duration: 0.15 } : transition}
						className="absolute inset-0"
					>
						{activeCollege.type === "video" && activeCollege.videoId ? (
							<iframe
								className="absolute inset-0 size-full"
								src={`https://www.youtube-nocookie.com/embed/${activeCollege.videoId}?rel=0`}
								title={`${activeCollege.name} | Обзор колледжа | Prince Programme`}
								loading="lazy"
								referrerPolicy="strict-origin-when-cross-origin"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
						) : (
							<figure className="absolute inset-0">
								<Image
									src={`${basePath}${activeCollege.imageSrc}`}
									alt={activeCollege.alt ?? activeCollege.name}
									fill
									sizes="(min-width: 1024px) 68vw, 100vw"
									className="object-cover"
								/>
								<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#031328]/92 to-transparent" />
								<figcaption className="absolute bottom-4 right-4 text-xs font-semibold text-white/72">
									Фото: NCDOfficial, CC BY-SA 3.0
								</figcaption>
							</figure>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="flex flex-col rounded-[28px] bg-[color-mix(in_srgb,var(--ink)_88%,var(--paper)_12%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
				<div className="flex items-center gap-3">
					<Buildings className="size-8 shrink-0 text-[var(--gold)]" weight="duotone" />
					<h3 className="text-2xl font-black">Партнерские колледжи</h3>
				</div>

				<div className="mt-8 flex flex-1 flex-col justify-end" role="tablist" aria-label="Выбор колледжа">
					{collegeMedia.map((college, index) => {
						const isActive = index === activeIndex;

						return (
							<button
								key={college.id}
								ref={(element) => {
									tabRefs.current[index] = element;
								}}
								id={`college-tab-${college.id}`}
								type="button"
								role="tab"
								aria-selected={isActive}
								aria-controls="college-media-panel"
								tabIndex={isActive ? 0 : -1}
								onClick={() => selectCollege(index)}
								onKeyDown={(event) => handleKeyDown(event, index)}
								className="group relative flex min-h-[72px] w-full items-center overflow-hidden border-b border-white/12 px-4 py-4 text-left first:border-t focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--gold)]"
							>
								{isActive && (
									<motion.span
										layoutId="active-college-background"
										className="absolute inset-1 rounded-2xl bg-[color-mix(in_srgb,var(--gold)_14%,transparent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
										transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 32 }}
									/>
								)}
								<motion.span
									animate={{ scaleY: isActive ? 1 : 0.25, opacity: isActive ? 1 : 0.34 }}
									transition={reduceMotion ? { duration: 0 } : transition}
									className="relative z-10 mr-4 h-8 w-1 origin-center rounded-full bg-[var(--gold)]"
								/>
								<span
									className={`relative z-10 text-lg font-black leading-7 transition-colors duration-300 ${
										isActive
											? "text-[var(--gold)]"
											: "text-[var(--page)] group-hover:text-[color-mix(in_srgb,var(--page)_76%,var(--gold)_24%)]"
									}`}
								>
									{college.name}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
