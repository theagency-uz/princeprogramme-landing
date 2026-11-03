"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useId, useRef, useState } from "react";
import { trackPopupLead } from "@/lib/meta-pixel";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";
import { applicationSchema, type ApplicationFormValues } from "@/lib/application-schema";

const interests = ["Студента", "Родителя", "Учителя", "Другие"];

export function ApplicationForm({ trackLead = false }: { trackLead?: boolean }) {
	const formId = useId();
	const fieldId = (name: string) => `${formId}-${name}`;
	const submittingRef = useRef(false);
	const [serverState, setServerState] = useState<"idle" | "success" | "error">("idle");

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ApplicationFormValues>({
		resolver: zodResolver(applicationSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			interest: "",
			comment: "",
		},
	});

	async function onSubmit(values: ApplicationFormValues) {
		if (submittingRef.current) return;
		submittingRef.current = true;
		setServerState("idle");

		const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
		const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || `${basePath}/api/telegram`;

		try {
			const response = await fetch(formEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const result = await response.json();
			if (!response.ok || result?.ok !== true) {
				throw new Error("Application request failed");
			}

			setServerState("success");
			reset();
			if (trackLead) trackPopupLead();
		} catch {
			setServerState("error");
		} finally {
			submittingRef.current = false;
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid min-w-0 gap-4" noValidate>
			<div className="grid min-w-0 gap-2">
				<label htmlFor={fieldId("name")} className="text-sm font-semibold text-[var(--ink)]">
					Ваше имя
				</label>
				<input
					id={fieldId("name")}
					{...register("name")}
					autoComplete="name"
					className="h-12 w-full min-w-0 max-w-full rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
				/>
				<FieldError message={errors.name?.message} />
			</div>

			<div className="grid min-w-0 gap-4 md:grid-cols-2">
				<div className="grid min-w-0 gap-2">
					<label htmlFor={fieldId("phone")} className="text-sm font-semibold text-[var(--ink)]">
						Телефон
					</label>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<PhoneInput
								country="uz"
								value={field.value}
								onChange={(value) => field.onChange(value ? `+${value}` : "")}
								onBlur={field.onBlur}
								preferredCountries={["uz", "kz", "kg", "tj", "tm", "gb"]}
								preserveOrder={["preferredCountries"]}
								countryCodeEditable={false}
								enableSearch
								disableSearchIcon
								localization={ru}
								searchPlaceholder="Найти страну"
								searchNotFound="Страна не найдена"
								placeholder="Номер телефона"
								containerClass={`prince-phone-input${errors.phone ? " prince-phone-input--error" : ""}`}
								inputProps={{
									id: fieldId("phone"),
									name: field.name,
									ref: field.ref,
									autoComplete: "tel",
									"aria-invalid": Boolean(errors.phone),
									"aria-describedby": fieldId("phone-error"),
								}}
							/>
						)}
					/>
					<FieldError id={fieldId("phone-error")} message={errors.phone?.message} />
				</div>

				<div className="grid min-w-0 gap-2">
					<label htmlFor={fieldId("email")} className="text-sm font-semibold text-[var(--ink)]">
						Email <span className="font-normal text-[var(--muted)]">(необязательно)</span>
					</label>
					<input
						id={fieldId("email")}
						{...register("email")}
						autoComplete="email"
						className="h-12 w-full min-w-0 max-w-full rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
					/>
					<FieldError message={errors.email?.message} />
				</div>
			</div>

			<div className="grid min-w-0 gap-2">
				<label htmlFor={fieldId("interest")} className="text-sm font-semibold text-[var(--ink)]">
					Консультация для:
				</label>
				<select
					id={fieldId("interest")}
					{...register("interest")}
					className="h-12 w-full min-w-0 max-w-full rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
				>
					<option value="">Выберите, для кого нужна консультация</option>
					{interests.map((interest) => (
						<option key={interest} value={interest}>
							{interest}
						</option>
					))}
				</select>
				<FieldError message={errors.interest?.message} />
			</div>

			<div className="grid min-w-0 gap-2">
				<label htmlFor={fieldId("comment")} className="text-sm font-semibold text-[var(--ink)]">
					Комментарии
				</label>
				<textarea
					id={fieldId("comment")}
					{...register("comment")}
					rows={4}
					className="w-full min-w-0 max-w-full resize-none rounded-xl border-0 bg-[color-mix(in_srgb,var(--page)_76%,var(--paper)_24%)] px-4 py-3 text-[var(--ink)] shadow-[inset_0_-2px_0_color-mix(in_srgb,var(--gold)_18%,transparent)] outline-none transition focus:bg-[var(--paper)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--gold)_22%,transparent)]"
				/>
				<FieldError message={errors.comment?.message} />
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-navy)] px-7 text-sm font-bold text-[var(--brand-ivory)] shadow-[0_18px_50px_rgba(7,24,47,0.18)] transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--brand-navy)_88%,var(--gold)_12%)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
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

function FieldError({ message, id }: { message?: string; id?: string }) {
	if (!message) {
		return (
			<span id={id} className="min-h-5 text-xs text-[var(--muted)]">
				{" "}
			</span>
		);
	}

	return (
		<span id={id} className="min-h-5 text-xs font-semibold text-red-700">
			{message}
		</span>
	);
}
