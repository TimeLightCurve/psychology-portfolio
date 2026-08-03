"use client"

import ArrowIcon from "@/components/icons/ArrowIcon"
import Image from "next/image"
import Link from "next/link"
import { usePublicContent, usePublicSingleton } from "@/lib/use-public-content"

function InputField({ label, type = "text" }: { label: string; type?: string }) {
	return (
		<label className="block">
			<span className="mb-3 block text-[1rem] text-[#667b75] sm:text-[1.1rem]">{label}</span>
			<input
				type={type}
				className="w-full border-0 border-b border-[#8ba29a] bg-transparent px-0 pb-3 text-[#35564d] outline-none placeholder:text-[#9aa8a3] focus:border-[#35564d] focus:ring-0"
			/>
		</label>
	)
}

type Clinic = { id: string; title: string; address: string; phone: string; email: string; image: string; mapUrl: string }

export default function ContactPage() {
	const { item: contact } = usePublicSingleton<{ title: string; intro: string; email: string; phone: string; fax: string; formTitle: string; formIntro: string; locationsTitle: string }>("contact")
	const { items: clinicCards } = usePublicContent<Clinic>("clinics")
	return (
		<main dir="rtl" className="min-h-screen bg-[#f8f5ed] font-nian text-[#35564d]">
			<section className="mx-auto w-full px-4 pb-20 pt-28 sm:px-6 lg:px-24 lg:pt-32">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] lg:items-start lg:gap-16">
					<div>
						<h1 className="max-w-3xl text-right font-nian text-[clamp(3.6rem,7vw,7.2rem)] font-light leading-[0.92] tracking-[-0.06em] text-[#365650]">
							{contact?.title || "تماس با ما"}
						</h1>

						<div className="mt-24 max-w-3xl border-t border-[#8ba29a] pt-8 sm:mt-32 lg:mt-40">
							<p className="max-w-2xl text-right text-[1.15rem] leading-9 text-[#4f6761] sm:text-[1.35rem] sm:leading-10">
								{contact?.intro || "برای ثبت درخواست، رزرو نوبت یا دریافت اطلاعات بیشتر، فرم را تکمیل کنید یا با ما تماس بگیرید."}
							</p>

							<div className="mt-14 space-y-2 text-right text-[1.2rem] leading-9 text-[#4f6761] sm:text-[1.35rem]">
								<p><span className="font-semibold text-[#35564d]">ایمیل:</span> {contact?.email || "talk@qpsychology.com.au"}</p>
								<p><span className="font-semibold text-[#35564d]">تلفن:</span> {contact?.phone || "(03) 7023 4780"}</p>
								<p><span className="font-semibold text-[#35564d]">فکس:</span> {contact?.fax || "(03) 9492 5211"}</p>
							</div>

							<div className="mt-14 border-t border-[#8ba29a] pt-8">
								<p className="text-right text-[1.2rem] font-semibold text-[#35564d] sm:text-[1.35rem]">کلینیک‌های ما:</p>
								<div className="mt-5 flex flex-wrap justify-start gap-5 text-[1.2rem] text-[#4f6761] sm:text-[1.35rem]">
									{clinicCards.map((clinic) => (
										<span key={clinic.title} className="inline-flex items-center gap-2">
											{clinic.title}
											<span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#8ba29a] text-xs">↓</span>
										</span>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="bg-[#f6e9bf] px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
						<h2 className="text-right text-[2rem] font-light tracking-[-0.04em] text-[#365650] sm:text-[2.5rem]">{contact?.formTitle || "ارسال پیام آنلاین"}</h2>
						<p className="mt-6 max-w-lg text-right text-[1.05rem] leading-8 text-[#526a65] sm:text-[1.2rem] sm:leading-9">
							{contact?.formIntro || "هر زمان خواستید می‌توانید با ما در ارتباط باشید. خوشحال می‌شویم همراه شما باشیم."}
						</p>

						<form className="mt-20 space-y-10">
							<div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
								<InputField label="نام *" />
								<InputField label="نام خانوادگی *" />
								<InputField label="ایمیل *" type="email" />
								<InputField label="تلفن *" type="tel" />
							</div>

							<label className="block">
								<span className="mb-3 block text-right text-[1rem] text-[#667b75] sm:text-[1.1rem]">پیام شما...</span>
								<textarea
									rows={5}
									className="w-full border-0 border-b border-[#8ba29a] bg-transparent px-0 pb-3 text-right text-[#35564d] outline-none placeholder:text-[#9aa8a3] focus:border-[#35564d] focus:ring-0"
								/>
							</label>

							<div className="flex flex-wrap items-center justify-between gap-4 pt-4">
								<button
									type="submit"
									className="inline-flex items-center gap-3 rounded-full border border-[#8ba29a] bg-transparent px-6 py-3 text-[1.05rem] text-[#35564d] transition hover:bg-white/50"
								>
									<span>ارسال درخواست</span>
									<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#35564d] text-white">
										<ArrowIcon className="rotate-180" />
									</span>
								</button>
								<p className="text-[0.95rem] text-[#667b75]">* همه فیلدها الزامی هستند</p>
							</div>
						</form>
					</div>
				</div>

				<div className="mt-24 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
					<div className="relative overflow-hidden rounded-[2.25rem] bg-[#eadfbe] shadow-[0_16px_40px_rgba(25,49,45,0.08)]">
						<Image src={clinicCards[0]?.image || "/clinic-1.png"} alt="تصویر کلینیک" width={1200} height={900} className="h-112 w-full object-cover" />
					</div>
					<div className="pt-6 lg:pt-20">
						<h2 className="text-right font-nian text-[clamp(3rem,5vw,5.5rem)] font-light leading-[0.96] tracking-[-0.05em] text-[#365650]">
							{contact?.locationsTitle || "کلینیکی نزدیک خود پیدا کنید"}
						</h2>
						<div className="mt-8 h-px bg-[#8ba29a]" />

						<div className="mt-14 space-y-16">
							{clinicCards.map((clinic) => (
								<div key={clinic.title} className="border-b border-[#8ba29a] pb-10">
									<div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
										<div>
											<h3 className="text-right text-[3rem] font-light leading-none tracking-[-0.05em] text-[#365650] sm:text-[4rem]">{clinic.title}</h3>
											<p className="mt-6 max-w-md text-right text-[1.15rem] leading-9 text-[#516861] sm:text-[1.3rem]">
												{clinic.address}
											</p>
											<div className="mt-6 flex flex-wrap justify-end gap-4">
												<Link href="/contact" className="inline-flex items-center gap-3 rounded-full border border-[#35564d] px-5 py-3 text-base text-[#35564d] transition hover:bg-[#edf3ef]">
													<span>دریافت مسیر</span>
													<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#35564d] text-white">
														<ArrowIcon className="rotate-180" />
													</span>
												</Link>
												<Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-[#cbede0] px-5 py-3 text-base text-[#35564d] transition hover:bg-[#bfe6d6]">
													<span>مشاهده کلینیک</span>
													<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#35564d] text-white">
														<ArrowIcon className="rotate-180" />
													</span>
												</Link>
											</div>
										</div>
										<div className="text-right text-[#516861] lg:text-left">
											<p><span className="font-semibold text-[#35564d]">ایمیل:</span> {clinic.email}</p>
											<p className="mt-2"><span className="font-semibold text-[#35564d]">تلفن:</span> {clinic.phone}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
