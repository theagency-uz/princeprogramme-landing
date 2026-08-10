"use client";

import { ArrowRight, List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MobileMenuItem = {
	href: string;
	label: string;
};

export function MobileMenu({ items }: { items: MobileMenuItem[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const reduceMotion = useReducedMotion();
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLElement>(null);
	const firstLinkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		firstLinkRef.current?.focus();

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
				triggerRef.current?.focus();
				return;
			}

			if (event.key !== "Tab" || !menuRef.current) return;

			const focusableElements = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
			const firstElement = focusableElements[0];
			const lastElement = focusableElements.at(-1);

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement?.focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault();
				firstElement?.focus();
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	function closeMenu() {
		setIsOpen(false);
	}

	return (
		<div className="relative z-30 lg:hidden">
			<button
				ref={triggerRef}
				type="button"
				aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
				aria-expanded={isOpen}
				aria-controls="mobile-navigation"
				onClick={() => setIsOpen((open) => !open)}
				className="relative z-30 grid size-14 place-items-center rounded-[22px] border border-[color-mix(in_srgb,var(--line)_72%,transparent)] bg-[color-mix(in_srgb,var(--paper)_86%,var(--page)_14%)] text-[var(--gold)] shadow-[0_18px_56px_rgba(7,24,47,0.16)] transition hover:bg-[color-mix(in_srgb,var(--paper)_76%,var(--gold)_24%)] active:scale-[0.97]"
			>
				{isOpen ? <X className="size-6" weight="bold" /> : <List className="size-7" weight="bold" />}
			</button>

			<AnimatePresence>
				{isOpen ? (
					<motion.div
						className="fixed inset-0 z-20 lg:hidden"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduceMotion ? 0 : 0.2 }}
					>
						<button
							type="button"
							aria-label="Закрыть меню"
							onClick={closeMenu}
							className="absolute inset-0 bg-[rgba(3,15,31,0.68)]"
						/>

						<motion.nav
							ref={menuRef}
							id="mobile-navigation"
							aria-label="Мобильная навигация"
							initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.985 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.985 }}
							transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
							className="page-shell absolute inset-x-0 top-[5.5rem] max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[28px] border border-[color-mix(in_srgb,var(--line)_74%,transparent)] bg-[var(--paper)] p-3 shadow-[0_30px_90px_rgba(3,15,31,0.42)]"
						>
							{items.map((item, index) => (
								<a
									key={item.href}
									ref={index === 0 ? firstLinkRef : undefined}
									href={item.href}
									onClick={closeMenu}
									className="group flex min-h-14 items-center justify-between border-b border-[var(--line)] px-4 text-base font-black text-[var(--ink)] transition last:border-b-0 hover:text-[var(--gold)]"
								>
									{item.label}
									<ArrowRight className="size-4 text-[var(--gold)] transition group-hover:translate-x-1" weight="bold" />
								</a>
							))}

							<a
								href="#contacts"
								onClick={closeMenu}
								className="mt-3 flex min-h-14 items-center justify-center gap-2 rounded-[20px] bg-[var(--gold)] px-5 text-sm font-black text-[#07182f] transition hover:bg-[color-mix(in_srgb,var(--gold)_86%,white_14%)] active:scale-[0.98]"
							>
								Оставить заявку
								<ArrowRight className="size-4" weight="bold" />
							</a>
						</motion.nav>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
