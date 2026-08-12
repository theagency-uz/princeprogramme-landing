import Image from "next/image";
import {
	ArrowRight,
	Bank,
	BookOpen,
	ChartLineUp,
	CheckCircle,
	Compass,
	EnvelopeSimple,
	GraduationCap,
	HouseLine,
	InstagramLogo,
	Phone,
	ShieldCheck,
	TelegramLogo,
	UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { ApplicationForm } from "@/components/ApplicationForm";
import {
	AcademicPulseAnimation,
	BenefitGlyphAnimation,
	CampusArchAnimation,
	ClipReveal,
	ContactSignatureAnimation,
	HeroCinematicStage,
	HeroHeadlineWords,
	LineDrawing,
	NumberTicker,
	PageScrollProgress,
	ParallaxFrame,
	PathwayWeaveAnimation,
	ProgramArcAnimation,
	TiltSurface,
	WhyCompassAnimation,
	WhyScrollScrub,
} from "@/components/MotionVocabulary";
import { FloatIn, Reveal } from "@/components/Reveal";
import { ScrollVoyage } from "@/components/ScrollVoyage";
import { CollegesShowcase } from "@/components/CollegesShowcase";
import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";

const navItems = [
	{ href: "#program", label: "О программе" },
	{ href: "#colleges", label: "Колледжи" },
	{ href: "#pathways", label: "Направления" },
	{ href: "#why", label: "Почему мы" },
	{ href: "#contacts", label: "Контакты" },
];

const stats = [
	{ value: "2013", label: "год основания программы" },
	{ value: "18", label: "недель интенсивного обучения" },
	{ value: "80+", label: "университетов для дальнейшего поступления" },
	{ value: "16", label: "университетов Russell Group" },
];

const heroStats = [
	{ value: "100+", label: "направлений" },
	{ value: "80+", label: "университетов" },
	{ value: "18", label: "недель" },
];

const countries = ["Узбекистан", "Казахстан", "Кыргызстан", "Таджикистан", "Туркменистан"];

type StudentTestimonial = {
	name: string;
	achievement: string;
	quote: string;
	video: string;
};

const studentTestimonials: StudentTestimonial[] = [
	{
		name: "Абдуллох",
		achievement: "Диплом с отличием",
		quote: "\"Hattoki maktabni bitirmasdan, Buyuk Britaniyaning oliy ta'limiga birinchi qadam qo'yishga yordam bergan Prince Programme'ga rahmat!\"",
		video: "/videos/IMG_3685.mp4",
	},
	{
		name: "Ясмина",
		achievement: "£21'000 грант",
		quote: '"Я живу с Host family, и у нас с ней очень дружные и крепкие отношения. По выходным мы ходим на шоппинг."',
		video: "/videos/IMG_3686.mp4",
	},
];

const pathways = [
	{
		title: "Business pathway",
		description: "Фундамент для будущих специалистов в бизнесе, финансах, экономике и управлении.",
		modules: ["Экономика", "Бухгалтерский учет и финансы", "Основы бизнеса", "IELTS и учебные навыки", "Углубленная математика"],
	},
	{
		title: "Science pathway",
		description: "Академическая база для естественных наук, инженерных направлений и медицинских траекторий.",
		modules: ["Биология", "Физика", "Химия", "Углубленная математика", "IELTS и учебные навыки"],
	},
];

const whyItems = [
	{
		icon: GraduationCap,
		title: "Международно признанная Foundation-программа",
		body: "Единый академический стандарт во всех колледжах, соответствующий уровню A-Level и усиленной подготовкой к IELTS.",
	},
	{
		icon: Compass,
		title: "Право выбора",
		body: "Студенты могут подать заявки через UCAS и выбирать университет после программы при выполнении вступительных требований.",
	},
	{
		icon: UsersThree,
		title: "Индивидуальная поддержка",
		body: "Личный ментор, школьный формат заботы и приложение для родителей помогают студенту адаптироваться за рубежом.",
	},
	{
		icon: ShieldCheck,
		title: "Безопасная среда",
		body: "Подходит студентам от 15 лет и тем, кто впервые учится в англоязычной международной среде.",
	},
	{
		icon: ChartLineUp,
		title: "Всё необходимое включено",
		body: "Программа включает академическую подготовку, проживание, питание и сопровождение, чтобы путь в Великобританию был понятным.",
	},
];

const benefitGlyphVariants = ["gate", "branch", "mentor", "shield", "value"] as const;
const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function Home() {
	return (
		<main className="relative overflow-hidden">
			<div className="paper-grain" aria-hidden="true" />
			<PageScrollProgress />
			<ScrollVoyage />
			<Header />
			<Hero />
			<HeroStatsSection />
			<ProgramSection />
			<CountriesSection />
			<CollegesSection />
			<PathwaysSection />
			<WhySection />
			<StudentTestimonialsSection />
			<ContactSection />
		</main>
	);
}

function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-40">
			<div className="page-shell pt-4">
				<nav aria-label="Основная навигация" className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
					<Link href="#" aria-label="Prince Programme - на главную" className="">
						<Image
							src={assetPath("/images/prince-logo-white.webp")}
							alt=""
							width={554}
							height={450}
							sizes="84px"
							className="h-[60px] w-auto object-contain"
						/>
					</Link>

					<div className="hidden h-14 items-center justify-center rounded-[22px] bg-[color-mix(in_srgb,var(--paper)_86%,var(--page)_14%)] px-2 shadow-[0_18px_56px_rgba(7,24,47,0.1)] lg:flex">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="group relative overflow-hidden rounded-[16px] px-4 py-2.5 text-sm font-black text-[color-mix(in_srgb,var(--ink)_72%,transparent)] transition hover:bg-[color-mix(in_srgb,var(--gold)_13%,transparent)] hover:text-[var(--ink)]"
							>
								<span className="pointer-events-none absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[var(--gold)] transition duration-300 group-hover:scale-x-100" />
								{item.label}
							</a>
						))}
					</div>

					<div className="flex items-center justify-end">
						<MobileMenu items={navItems} />
						<a
							href="#contacts"
							className="group relative hidden h-14 items-center justify-center gap-2 overflow-hidden rounded-[22px] bg-[var(--gold)] px-5 text-sm font-black text-[#07182f] shadow-[0_22px_70px_rgba(147,117,29,0.2)] transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--gold)_86%,white_14%)] active:translate-y-0 lg:inline-flex"
						>
							<span className="pointer-events-none absolute inset-y-[-30%] -left-12 w-8 -rotate-12 bg-white/42 blur-sm transition duration-500 group-hover:translate-x-48" />
							<span className="relative whitespace-nowrap">Оставить заявку</span>
							<ArrowRight className="relative size-4 transition group-hover:translate-x-1" weight="bold" />
						</a>
					</div>
				</nav>
			</div>
		</header>
	);
}

function Hero() {
	return (
		<section className="page-shell grid min-h-[100dvh] items-center gap-10 pt-24 pb-8 lg:grid-cols-[0.88fr_1.12fr] lg:pt-24">
			<div className="relative z-10 max-w-2xl">
				<FloatIn>
					<LineDrawing className="pointer-events-none absolute -bottom-14 left-0 hidden w-[560px] text-[var(--gold)] opacity-30 md:block" />
					<p className="font-display pb-1 text-2xl italic leading-[1.15] text-[var(--gold-deep)] md:text-3xl">Follow Your Star</p>
					<HeroHeadlineWords
						text="Foundation в Великобритании"
						className="mobile-hero-heading font-display mt-5 max-w-[11ch] text-5xl font-semibold leading-[0.95] tracking-normal text-[var(--ink)] md:text-7xl lg:text-8xl"
					/>
					<p className="mt-6 max-w-xl text-xl leading-8 text-[var(--muted)]">
						Подготовьтесь к поступлению в престижные университеты Великобритании и других стран всего за 18 недель по стандартам
						A-level — ещё до окончания школы
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<a
							href="#contacts"
							className="group inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[var(--brand-navy)] px-8 text-base font-black text-[var(--gold)] shadow-[0_16px_42px_rgba(7,24,47,0.18)] transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--brand-navy)_88%,var(--gold)_12%)] active:translate-y-0"
							style={{ color: "var(--gold)" }}
						>
							Получить консультацию
							<ArrowRight className="size-4 transition group-hover:translate-x-1" weight="bold" />
						</a>
						<a
							href="#program"
							className="inline-flex h-[3.25rem] items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--paper)_78%,transparent)] px-8 text-base font-black text-[var(--ink)] shadow-[0_14px_38px_rgba(7,24,47,0.08)] transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--gold)_14%,var(--paper)_86%)] active:translate-y-0"
						>
							Узнать программу
						</a>
					</div>
				</FloatIn>
			</div>

			<ParallaxFrame className="relative" y={42} scale={0.045}>
				<HeroCinematicStage className="relative aspect-[1.03/1] overflow-hidden rounded-[30px] bg-[var(--paper)] shadow-[0_34px_110px_rgba(7,24,47,0.18)] lg:aspect-[1.05/1]">
					<Image
						src={assetPath("/images/hero-campus.png")}
						alt="Студенты Prince Programme на территории британского кампуса"
						fill
						priority
						sizes="(min-width: 1024px) 54vw, 92vw"
						className="object-cover"
					/>
					<div className="absolute inset-0 z-10 bg-gradient-to-tr from-[rgba(7,24,47,0.32)] via-transparent to-[rgba(201,166,70,0.12)]" />
				</HeroCinematicStage>
			</ParallaxFrame>
		</section>
	);
}

function HeroStatsSection() {
	return (
		<section className="relative z-10 -mt-5 pb-10 pt-0 md:-mt-7 md:pb-14">
			<div className="page-shell">
				<Reveal className="relative overflow-hidden rounded-[36px] bg-[var(--brand-navy)] px-6 py-7 text-[var(--brand-ivory)] shadow-[0_28px_90px_rgba(7,24,47,0.24)] md:px-9 md:py-9">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(201,166,70,0.24),transparent_31%),linear-gradient(115deg,transparent_28%,rgba(255,255,255,0.06)_100%)]" />
					<div className="relative grid divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
						{heroStats.map((stat, index) => {
							const value = Number.parseInt(stat.value, 10);
							const suffix = stat.value.replace(String(value), "");

							return (
								<div
									key={stat.label}
									className={index === 0 ? "pb-6 sm:pb-0 sm:pr-8" : index === 1 ? "py-6 sm:px-8 sm:py-0" : "pt-6 sm:pl-8 sm:pt-0"}
								>
									<div className="font-display text-6xl font-semibold leading-none tracking-tight md:text-7xl xl:text-8xl">
										<NumberTicker value={value} suffix={suffix} />
									</div>
									<p className="mt-3 text-sm font-black text-[color-mix(in_srgb,var(--brand-ivory)_76%,transparent)] md:text-base">
										{stat.label}
									</p>
								</div>
							);
						})}
					</div>
				</Reveal>
			</div>
		</section>
	);
}

function ProgramSection() {
	return (
		<section id="program" className="py-12 md:py-16">
			<div className="page-shell">
				<ClipReveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
					<div>
						<p className="text-sm font-black text-[var(--gold-deep)]">С 2013 года</p>
						<h2 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
							Академический мост между Центральной Азией и Великобританией
						</h2>
					</div>
					{/* <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
						PRINCE PROGRAMME разработана и проводится PDVL Global. Программа началась с City College Plymouth и расширяется по
						Великобритании через Edinburgh College, City of Glasgow College и New College Durham.
					</p> */}
				</ClipReveal>

				<div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
					<Reveal className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--paper)_94%,var(--gold)_6%),color-mix(in_srgb,var(--page)_80%,var(--paper)_20%))] p-6 shadow-[0_28px_90px_rgba(7,24,47,0.1)] md:p-8">
						<ProgramArcAnimation className="pointer-events-none absolute -right-16 top-2 h-52 w-[580px] text-[var(--gold)] opacity-40" />
						<div className="relative z-10 grid gap-5 md:grid-cols-4">
							{stats.map((stat, index) => {
								const value = Number.parseInt(stat.value, 10);
								const suffix = stat.value.replace(String(value), "");
								return (
									<div
										key={stat.label}
										className="flex h-full flex-col rounded-3xl bg-[color-mix(in_srgb,var(--page)_66%,var(--paper)_34%)] p-5 shadow-[0_14px_36px_rgba(7,24,47,0.06)]"
									>
										<div className="font-display text-4xl font-semibold leading-none tracking-normal text-[var(--ink)] md:text-5xl">
											<NumberTicker value={value} suffix={suffix} />
										</div>
										<p className="mt-3 text-sm font-semibold leading-6 text-[var(--muted)]">{stat.label}</p>
										<div className="mt-auto pt-5">
											<div className="h-1 rounded-full bg-[var(--gold)]" style={{ width: `${58 + index * 10}%` }} />
										</div>
									</div>
								);
							})}
						</div>
						<div className="relative z-10 mt-8 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
							<div className="relative overflow-hidden rounded-2xl bg-[var(--ink)] p-6 text-[var(--page)]">
								<AcademicPulseAnimation className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 text-[var(--gold)] opacity-55" />
								<div className="relative z-10">
									<BookOpen className="size-8 text-[var(--gold)]" weight="duotone" />
									<h3 className="mt-5 text-xl font-black">БЕЗОПАСНАЯ СРЕДА</h3>
									<p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--page)_72%,transparent)]">
										Обучение проходит в тщательно отобранных безопасных городах Великобритании
									</p>
								</div>
							</div>
							<p className="text-base leading-8 text-[var(--muted)]">
								Содержание соответствует стандартам A-Level: академический английский, подготовка к IELTS, учебные навыки, занятия в
								малых группах и практический формат, который помогает студенту адаптироваться к университетской среде.
							</p>
						</div>
					</Reveal>

					<ParallaxFrame
						className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[var(--paper)] shadow-[0_28px_90px_rgba(7,24,47,0.12)]"
						y={54}
						scale={0.035}
					>
						<Image
							src={assetPath("/images/advisory-session.png")}
							alt="Ментор Prince Programme помогает студенту выбрать академический путь"
							fill
							sizes="(min-width: 1024px) 38vw, 92vw"
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,24,47,0.96)_0%,rgba(7,24,47,0.82)_32%,rgba(7,24,47,0.3)_58%,transparent_78%)]" />
						<CampusArchAnimation className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-70" />
						<div className="absolute bottom-0 p-6 text-[#f7f3ea] md:p-8">
							<h3 className="max-w-sm text-2xl font-black">Наставничество и забота с первого дня</h3>
							<p className="mt-3 max-w-md text-sm leading-6 text-[#f7f3ea]/76">
								Программа предусматривает особую поддержку для студентов, впервые начинающих самостоятельную учёбу и жизнь за
								рубежом.
							</p>
						</div>
					</ParallaxFrame>
				</div>
			</div>
		</section>
	);
}

function CountriesSection() {
	return (
		<section id="countries" aria-label="Пять стран Центральной Азии" className="relative z-30 py-12 md:py-16">
			<div className="page-shell">
				<Reveal className="overflow-hidden rounded-[36px] bg-[var(--brand-navy)] text-[var(--brand-ivory)] shadow-[0_30px_90px_rgba(7,24,47,0.2)]">
					<div className="grid lg:grid-cols-[0.86fr_1.14fr]">
						<div className="relative flex min-h-[520px] flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:min-h-[620px] lg:px-12 xl:px-14">
							<div
								className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(215,185,87,0.12),transparent_36%)]"
								aria-hidden="true"
							/>

							<div className="relative">
								<h2 className="font-display max-w-[570px] text-[2.35rem] font-semibold leading-[1.04] tracking-normal sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem]">
									Prince Programme в Центральной Азии
								</h2>

								<div className="mt-7 h-0.5 w-14 bg-[var(--gold)] sm:mt-8" aria-hidden="true" />

								<p className="mt-7 max-w-md text-base leading-7 text-[color-mix(in_srgb,var(--brand-ivory)_82%,transparent)] sm:text-lg sm:leading-8">
									Открываем студентам путь к образованию в Великобритании.
								</p>

								<ul className="mt-9 grid max-w-lg grid-cols-2 gap-x-5 gap-y-3 text-sm font-bold text-[color-mix(in_srgb,var(--brand-ivory)_88%,transparent)] sm:text-base">
									{countries.map((country) => (
										<li
											key={country}
											className="border-l-2 border-[color-mix(in_srgb,var(--gold)_72%,transparent)] pl-3 leading-6"
										>
											{country}
										</li>
									))}
								</ul>

								<div className="mt-10 flex max-w-lg items-center gap-4 border-t border-[color-mix(in_srgb,var(--gold)_34%,transparent)] pt-6">
									<div className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--gold)] text-[var(--gold)]">
										<Bank className="size-6" weight="duotone" />
									</div>
									<p className="text-xs font-semibold leading-5 text-[color-mix(in_srgb,var(--brand-ivory)_76%,transparent)] sm:text-sm sm:leading-6">
										Официальный представитель Prince Foundation Programme в Центральной Азии
									</p>
								</div>
							</div>
						</div>

						<figure className="relative min-h-[390px] overflow-hidden bg-[var(--brand-navy)] sm:min-h-[520px] lg:min-h-[620px]">
							<Image
								src={assetPath("/images/central-asia-map-v2.webp")}
								alt="Карта Центральной Азии с представительствами Prince Programme в Казахстане, Узбекистане, Кыргызстане, Таджикистане и Туркменистане"
								fill
								sizes="(min-width: 1024px) 58vw, 100vw"
								className="object-contain p-3 sm:p-5 lg:p-0"
							/>
							<div
								className="pointer-events-none absolute inset-y-0 left-0 hidden w-[14%] bg-[linear-gradient(90deg,var(--brand-navy)_0%,rgba(7,24,47,0.72)_42%,transparent_100%)] lg:block"
								aria-hidden="true"
							/>
							<div
								className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-[linear-gradient(180deg,var(--brand-navy)_0%,transparent_100%)] lg:hidden"
								aria-hidden="true"
							/>
							<div
								className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_36%,rgba(7,24,47,0.18)_100%)]"
								aria-hidden="true"
							/>
						</figure>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

function CollegesSection() {
	return (
		<section id="colleges" className="py-12 md:py-16">
			<div className="page-shell">
				<ClipReveal className="max-w-5xl">
					<h2 className="font-display max-w-5xl text-balance text-4xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl lg:text-7xl">
						Представлены в Центральной Азии. Учим в колледжах Великобритании
					</h2>
					<p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
						Программа связывает семьи из пяти стран региона с государственными колледжами Великобритании, признанными на международном
						уровне.
					</p>
				</ClipReveal>

				<Reveal
					className="mt-10 overflow-hidden rounded-[36px] bg-[var(--ink)] p-3 text-[var(--page)] shadow-[0_38px_110px_rgba(7,24,47,0.22)] md:p-5"
					delay={0.08}
				>
					<CollegesShowcase />
				</Reveal>
			</div>
		</section>
	);
}

function PathwaysSection() {
	return (
		<section id="pathways" className="relative py-12 md:py-16">
			<div className="page-shell">
				<ClipReveal className="max-w-3xl">
					<h2 className="font-display text-4xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
						Направления обучения
					</h2>
					<p className="mt-5 text-lg leading-8 text-[var(--muted)]">
						Business и Science pathways дают студентам академическую базу, английский для университета и дисциплину обучения в
						международной среде.
					</p>
				</ClipReveal>

				<div className="mt-8 grid gap-8">
					{pathways.map((pathway, index) => (
						<Reveal key={pathway.title} delay={index * 0.08}>
							<TiltSurface
								className={[
									"relative grid gap-8 overflow-hidden rounded-[36px] p-6 shadow-[0_30px_90px_rgba(7,24,47,0.09)] md:p-9 lg:grid-cols-[0.42fr_0.58fr]",
									index === 0
										? "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--paper)_90%,var(--gold)_10%),color-mix(in_srgb,var(--page)_82%,var(--paper)_18%))]"
										: "bg-[linear-gradient(135deg,var(--ink),color-mix(in_srgb,var(--ink)_82%,var(--ink-soft)_18%))] text-[var(--page)]",
								].join(" ")}
							>
								<div className="pointer-events-none absolute -right-10 -top-16 font-display text-[11rem] font-semibold leading-none text-[color-mix(in_srgb,var(--gold)_16%,transparent)] md:text-[15rem]">
									{String(index + 1).padStart(2, "0")}
								</div>
								<PathwayWeaveAnimation
									tone={index === 0 ? "light" : "dark"}
									className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-full w-full opacity-70"
								/>

								<div className="relative z-10">
									<div className="mb-8 h-1 w-20 rounded-full bg-[var(--gold)]" />
									<div className="flex items-start gap-5">
										<div className="grid size-14 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--gold)_18%,transparent)]">
											<GraduationCap
												className={index === 0 ? "size-7 text-[var(--gold-deep)]" : "size-7 text-[var(--gold)]"}
												weight="duotone"
											/>
										</div>
										<div>
											<h3 className="font-display text-4xl font-semibold leading-none tracking-normal md:text-5xl">
												{pathway.title}
											</h3>
											<p
												className={[
													"mt-5 max-w-md text-base leading-7",
													index === 0 ? "text-[var(--muted)]" : "text-[color-mix(in_srgb,var(--page)_72%,transparent)]",
												].join(" ")}
											>
												{pathway.description}
											</p>
										</div>
									</div>
								</div>

								<div className="relative z-10 grid gap-3 sm:grid-cols-2">
									{pathway.modules.map((module) => (
										<div
											key={module}
											className={[
												"group min-h-16 rounded-2xl px-5 py-4 shadow-[0_14px_42px_rgba(7,24,47,0.07)] transition hover:-translate-y-0.5",
												index === 0
													? "bg-[color-mix(in_srgb,var(--paper)_72%,var(--page)_28%)] text-[var(--ink)]"
													: "bg-white/[0.07] text-[var(--page)]",
											].join(" ")}
										>
											<span className="block text-base font-black leading-6">{module}</span>
										</div>
									))}
								</div>
							</TiltSurface>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

function WhySection() {
	return (
		<section id="why" className="py-12 md:py-16">
			<div className="page-shell">
				<ClipReveal className="max-w-4xl">
					<h2 className="font-display text-4xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
						Почему Prince Programme?
					</h2>
					<p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
						Мы сохраняем главное из Foundation: академическую строгость, выбор университета, личную поддержку и понятный путь для
						родителей.
					</p>
				</ClipReveal>

				<div className="mt-8 grid auto-rows-[minmax(210px,auto)] gap-5 lg:grid-cols-6">
					<WhyScrollScrub className="relative overflow-hidden rounded-[36px] bg-[var(--ink)] p-6 text-[var(--page)] shadow-[0_34px_100px_rgba(7,24,47,0.2)] lg:col-span-3 lg:row-span-2 md:p-8">
						<WhyCompassAnimation className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 text-[var(--gold)] opacity-60 md:h-80 md:w-80" />
						<div className="relative z-10">
							<CheckCircle className="size-10 text-[var(--gold)]" weight="duotone" />
							<h3 className="mobile-feature-heading font-display mt-8 max-w-lg text-4xl font-semibold leading-tight">
								100+ направлений поступления в топ-университеты Великобритании и мира
							</h3>
							<p className="mt-5 max-w-xl text-base leading-7 text-[color-mix(in_srgb,var(--page)_72%,transparent)]">
								Программа открывает несколько академических маршрутов и не привязывает студента к одному университету после
								Foundation.
							</p>
						</div>
					</WhyScrollScrub>

					{whyItems.map((item, index) => {
						const Icon = item.icon;
						const isWide = index === 2;
						return (
							<Reveal
								key={item.title}
								delay={index * 0.04}
								className={[
									"relative overflow-hidden rounded-[32px] p-6 shadow-[0_18px_52px_rgba(7,24,47,0.07)] md:p-7",
									index === 1 ? "bg-[color-mix(in_srgb,var(--gold)_16%,var(--paper)_84%)]" : "bg-[var(--paper)]",
									isWide ? "lg:col-span-3" : "lg:col-span-3",
								].join(" ")}
							>
								<BenefitGlyphAnimation
									variant={benefitGlyphVariants[index]}
									className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-[var(--ink)] opacity-55"
								/>
								<div className="relative z-10">
									<Icon className="size-8 text-[var(--gold-deep)]" weight="duotone" />
									<h3 className="mt-5 text-xl font-black leading-7 text-[var(--ink)]">{item.title}</h3>
									<p className="mt-4 text-sm leading-6 text-[var(--muted)]">{item.body}</p>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function StudentTestimonialsSection() {
	const testimonialGridClass = studentTestimonials.length >= 3 ? "lg:grid-cols-3 lg:max-w-5xl" : "md:grid-cols-2 md:max-w-3xl";

	return (
		<section id="testimonials" className="py-12 md:py-16">
			<div className="page-shell">
				<ClipReveal className="mx-auto max-w-4xl text-center">
					<h2 className="font-display text-4xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
						Что говорят наши студенты
					</h2>
					<p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
						Реальные впечатления участников Prince Programme — об учёбе, жизни в Великобритании и поддержке на каждом этапе.
					</p>
				</ClipReveal>

				<div className={["mx-auto mt-9 grid items-stretch gap-5", testimonialGridClass].join(" ")}>
					{studentTestimonials.map((testimonial, index) => {
						return (
							<Reveal
								key={testimonial.name}
								delay={index * 0.06}
								className="mx-auto h-full w-full max-w-[360px] overflow-hidden rounded-[32px] border border-[color-mix(in_srgb,var(--ink)_10%,transparent)] bg-[var(--paper)] shadow-[0_24px_76px_rgba(7,24,47,0.1)] md:max-w-none"
							>
								<article className="flex h-full flex-col">
									<div className="overflow-hidden bg-[var(--ink)]">
										<video
											controls
											playsInline
											preload="metadata"
											aria-label={`Видеоотзыв студента ${testimonial.name}`}
											className="aspect-[9/16] w-full object-cover"
										>
											<source src={assetPath(testimonial.video)} type="video/mp4" />
										</video>
									</div>

									<div className="flex flex-1 flex-col p-6 md:p-7">
										<h3 className="font-display text-3xl font-semibold leading-tight text-[var(--ink)]">{testimonial.name}</h3>
										<p className="mt-2 text-sm font-bold italic leading-6 text-[var(--gold-deep)]">{testimonial.achievement}</p>
										<blockquote className="mt-5 text-base font-semibold leading-7 text-[var(--muted)]">
											{testimonial.quote}
										</blockquote>
									</div>
								</article>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function ContactSection() {
	return (
		<section id="contacts" className="pt-12 md:pt-16">
			<div className="page-shell">
				<Reveal className="relative min-w-0 overflow-hidden rounded-[36px] bg-[var(--paper)] shadow-[0_34px_110px_rgba(7,24,47,0.16)]">
					<div className="absolute inset-0 hidden lg:block">
						<Image
							src={assetPath("/images/cta-study-hall.png")}
							alt="Студент Prince Programme готовится к обучению вечером в британском колледже"
							fill
							sizes="100vw"
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-[var(--paper)] via-[color-mix(in_srgb,var(--paper)_82%,transparent)] to-transparent" />
					</div>

					<div className="relative grid min-w-0 gap-8 p-4 sm:p-6 md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
						<div className="relative min-w-0 flex flex-col justify-between gap-10 overflow-hidden">
							<ContactSignatureAnimation className="pointer-events-none absolute -left-16 top-28 hidden w-[560px] text-[var(--gold)] opacity-20 md:block" />
							<div className="relative z-10">
								<h2 className="font-display max-w-xl text-[2rem] font-semibold leading-tight tracking-normal text-[var(--ink)] sm:text-4xl md:text-6xl">
									Готовы к новым возможностям?
								</h2>
								<p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
									Мы здесь, чтобы помочь вам их открыть. Оставьте контакты, и команда Prince Programme свяжется с вами.
								</p>
							</div>

							<div className="relative z-10 grid min-w-0 gap-3">
								<ContactLine icon={HouseLine} label="Офис" value="г. Ташкент, Мирзо-Улугбекский р., Катта Дархон, 25" />
								<ContactLine icon={Phone} label="Телефон" value="+998 97 124 8881" />
								<ContactLine icon={EnvelopeSimple} label="Почта" value="info@princeconsult.com" />
								<ContactLine icon={InstagramLogo} label="Инстаграм" value="@princeprogramme" />
								<ContactLine
									icon={TelegramLogo}
									label="Telegram"
									value="@princeprogramme_ca"
									href="https://t.me/princeprogramme_ca"
								/>
							</div>
						</div>

						<div className="min-w-0 rounded-[32px] bg-[var(--glass)] p-4 shadow-[0_24px_70px_rgba(7,24,47,0.1)] backdrop-blur-xl sm:p-5 md:p-7">
							<h3 className="text-2xl font-black text-[var(--ink)]">Оставьте свои контакты</h3>
							<p className="mt-2 text-sm leading-6 text-[var(--muted)]">Мы с вами свяжемся</p>
							<div className="mt-6">
								<ApplicationForm />
							</div>
						</div>
					</div>
				</Reveal>
			</div>

			<footer className="mt-12 w-full border-t border-[var(--line)] bg-white md:mt-16">
				<div className="page-shell flex flex-col items-center gap-6 py-8 text-center md:flex-row md:justify-between md:py-9 md:text-left">
					<Link href="#" aria-label="Prince Programme - на главную" className="shrink-0 transition hover:opacity-80">
						<Image
							src={assetPath("/images/prince-logo.webp")}
							alt="Prince Programme"
							width={554}
							height={450}
							sizes="120px"
							className="h-auto w-[120px] object-contain"
						/>
					</Link>

					<div className="text-sm font-semibold text-[#6f776f] md:text-right">
						<p>© 2025 Prince Programme. Все права защищены.</p>
						<a
							href="mailto:info@princeconsult.com"
							className="mt-2 inline-block font-black text-[#07182f] transition hover:text-[var(--gold-deep)]"
						>
							info@princeconsult.com
						</a>
					</div>
				</div>
			</footer>
		</section>
	);
}

function ContactLine({ icon: Icon, label, value, href }: { icon: typeof HouseLine; label: string; value: string; href?: string }) {
	const content = (
		<>
			<Icon className="mt-1 size-5 shrink-0 text-[var(--gold-deep)]" weight="duotone" />
			<div className="min-w-0">
				<p className="text-xs font-black text-[var(--muted)]">{label}</p>
				<p className="mt-1 text-sm font-black leading-6 text-[var(--ink)] [overflow-wrap:anywhere]">{value}</p>
			</div>
		</>
	);

	if (href) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noreferrer"
				className="flex min-w-0 gap-3 rounded-2xl bg-[color-mix(in_srgb,var(--page)_70%,var(--paper)_30%)] p-4 shadow-[0_12px_36px_rgba(7,24,47,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(7,24,47,0.1)] active:translate-y-0"
			>
				{content}
			</a>
		);
	}

	return (
		<div className="flex min-w-0 gap-3 rounded-2xl bg-[color-mix(in_srgb,var(--page)_70%,var(--paper)_30%)] p-4 shadow-[0_12px_36px_rgba(7,24,47,0.055)]">
			{content}
		</div>
	);
}
