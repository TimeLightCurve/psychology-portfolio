"use client"

import ArrowIcon from "@/components/icons/ArrowIcon"
import Image from "next/image"
import Link from "next/link"
import { usePublicSingleton } from "@/lib/use-public-content"

const clinicDays = [
	{ label: "کلینیک مرکزی", value: "شنبه و چهارشنبه" },
	{ label: "کلینیک پاسداران", value: "سه شنبه" },
]

const qualifications = [
	"کارشناسی روانشناسی بالینی، دانشگاه تهران",
	"کارشناسی ارشد روانشناسی سلامت، دانشگاه علوم پزشکی ایران",
	"دوره تخصصی ارزیابی و مداخله در نورودایورسیتی",
]

const memberships = [
	"نظام روانشناسی و مشاوره جمهوری اسلامی ایران",
	"انجمن روانشناسان ایران",
	"عضویت حرفه ای در شبکه درمانگران کودک و نوجوان",
]

const approachPoints = [
	"ارزیابی دقیق و انسانی با تمرکز بر تجربه زیسته مراجع",
	"همراهی شفاف، بدون قضاوت و متناسب با نیاز هر فرد",
	"توجه به هویت، سبک ارتباطی و نقاط قوت مراجع",
]

function SectionDisclosure({
	title,
	items,
	defaultOpen = false,
}: {
	title: string
	items: string[]
	defaultOpen?: boolean
}) {
	return (
		<details
			open={defaultOpen}
			className="group border-b border-[#a9b7b0] py-6 first:border-t"
		>
			<summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.55rem] font-light tracking-[-0.04em] text-[#365650] sm:text-[1.95rem] [&::-webkit-details-marker]:hidden">
				<span>{title}</span>
				<span className="text-2xl leading-none transition group-open:rotate-45">+</span>
			</summary>
			<div className="mt-6 space-y-3 text-base leading-8 text-[#556d68] sm:text-lg">
				{items.map((item) => (
					<p key={item}>{item}</p>
				))}
			</div>
		</details>
	)
}

export default function AboutPage() {
	const { item: about } = usePublicSingleton<{ title: string; subtitle: string; content: string; image: string }>("about")
	return (
		<main className="min-h-screen bg-[#f8f5ed] text-[#35564d] font-nian">
			<section className="mx-auto max-w-345 px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
				<div className="grid gap-12 lg:grid-cols-[minmax(360px,540px)_1fr] lg:items-start lg:gap-16">
					<aside className="self-start lg:sticky lg:top-28">
						<div className="overflow-hidden rounded-t-full bg-[#e9efe7] shadow-[0_25px_70px_rgba(20,40,33,0.10)]">
							<Image
								 src={about?.image || "/about-me.jpg"}
								alt="پرتره دکتر"
								width={1200}
								height={1600}
								priority
								className="h-136 w-full object-cover object-center sm:h-176 lg:h-208"
							/>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4 px-1 text-sm sm:text-base">
							<div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
								<span className="font-medium text-[#365650]">دکتر ...</span>
								<span className="text-[#72857f]">she/her</span>
							</div>
							<div className="flex flex-wrap justify-end gap-2">
								<span className="rounded-full bg-[#f1eee5] px-3 py-1 text-[#445b56] shadow-sm">کارلتون</span>
								<span className="rounded-full bg-[#f1eee5] px-3 py-1 text-[#445b56] shadow-sm">سنت کیلدا</span>
							</div>
						</div>
					</aside>

					<div className="min-w-0">
						<Link
							href="/"
							className="inline-flex items-center gap-3 rounded-full border border-[#8ea59c] px-5 py-3 text-sm font-medium text-[#4b645e] transition hover:bg-[#edf3ee]"
						>
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#365650] text-white">
								<ArrowIcon className="rotate-180" />
							</span>
							<span>بازگشت به صفحه اصلی</span>
						</Link>

						<div className="mt-8 max-w-4xl flex flex-col gap-1">
							<p className="text-sm uppercase tracking-[0.32em] text-[#7a8d86]">About me</p>
							<h1 className="mt-4 font-nian text-[clamp(3.4rem,6vw,6.7rem)] font-light leading-[0.95] tracking-[-0.06em] text-[#365650]">
								{about?.title || "شقایق زارعی"}
							</h1>
							<p className="mt-2 text-[1.2rem] leading-8 text-[#72857f] sm:text-[1.55rem] my-4">
								{about?.subtitle || "روانشناس بالینی"}
							</p>
							<div className="mt-4 text-[1.2rem] leading-8 text-[#304d48] sm:text-[1.55rem]">
								<p className="whitespace-pre-line">{about?.content || "روانشناس بالینی با تمرکز بر ارزیابی، درمان و همراهی مراجعان در مسیر شناخت بهتر خود."}</p>
							</div>
							<p className="mt-10 max-w-3xl text-[1rem] leading-8 text-[#304d48] sm:text-[1.2rem] sm:leading-9">
								در جلسات درمانی من، اولویت با ایجاد فضایی امن، محترمانه و روشن برای شنیدن، فهمیدن و بازسازی تعادل روانی شماست. تمرکز من بر درمان فردی، خودشناسی عمیق و همراهی حرفه ای در مسیر تغییر پایدار است
							</p>

							<div className="mt-12 space-y-8 max-w-3xl text-[1.1rem] leading-9 text-[#304d48] sm:text-[1.25rem] sm:leading-10">
								<p>
									من در کار بالینی خود تلاش می‌کنم فضایی امن، شفاف و انسانی ایجاد کنم تا مراجع بتواند با آرامش درباره تجربه‌هایش صحبت کند و به درک دقیق‌تری از نیازهایش برسد.
								</p>
								<p>
									رویکرد من مبتنی بر احترام به تفاوت‌های فردی، توجه به هویت و سبک ارتباطی هر مراجع و استفاده از ارزیابی‌های دقیق برای رسیدن به مسیر درمانی مناسب است.
								</p>
								<p>
									همکاری با کودکان، نوجوانان و بزرگسالان را دوست دارم و به‌ویژه در همراهی افراد نورودایورجنت، خانواده‌ها و مراجعانی که نیاز به فهمی ظریف‌تر از تجربه خود دارند، تمرکز می‌کنم.
								</p>
							</div>

							<div className="mt-12 rounded-4xl  px-6 py-5 sm:px-7 sm:py-6">
								<div className="flex flex-col gap-5 ">
									{clinicDays.map((clinic) => (
										<div key={clinic.label} className=" flex items-center  gap-8">
											<p className="text-[1.05rem]  text-[#365650] sm:text-[2.2rem] font-black">{clinic.label}</p>
											<p className="mt-1 text-[#6c807a] text-2xl">{clinic.value}</p>
										</div>
									))}
								</div>
								<Link
									href="/#contact"
									className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#d8efe4] px-5 py-3 text-sm font-medium text-[#35564d] transition hover:bg-[#cce6da] sm:text-base"
								>
									<span>ارتباط برای رزرو وقت</span>
									<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#365650] text-white">
										<ArrowIcon className="rotate-180" />
									</span>
								</Link>
							</div>

							<div className="mt-16 border-t border-[#aab9b1]">
								<SectionDisclosure title="تحصیلات" items={qualifications} defaultOpen />
								<SectionDisclosure title="رویکرد درمانی" items={approachPoints} />
								<SectionDisclosure title="عضویت ها و وابستگی های حرفه ای" items={memberships} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
