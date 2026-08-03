"use client"

import Link from "next/link"
import ArrowIcon from "./icons/ArrowIcon"
import { usePublicContent } from "@/lib/use-public-content"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"


function ChevronDownIcon() {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
			<path
				d="M5 7.5 10 12.5 15 7.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function SearchIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
			<path
				d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="m20 20-3.8-3.8"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}


function BrandMark() {
	return (
		<div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#abcabf] text-[#7da393]">
			<span className="font-nian text-[1.75rem] leading-none">ن</span>
		</div>
	)
}

export default function Navbar() {
	const { items } = usePublicContent<{ id: string; label: string; href: string; kind: string }>("navItems")
	const { items: services } = usePublicContent<{ id: string; title: string; slug: string }>("services")
	const [mobileOpen, setMobileOpen] = useState(false)
	const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
	return (
		<header className="fixed inset-x-0 top-0 z-20 px-4 pt-4 font-nian sm:px-6 sm:pt-6 lg:px-24">
			<div
				className="mx-auto flex w-full items-center justify-between gap-4 rounded-full bg-[#fcfaf4]/85 px-4 py-3 text-[#60766f] shadow-[0_10px_30px_rgba(17,24,39,0.08)] backdrop-blur md:px-6 lg:px-8"
				// style={{ maxWidth: "1380px" }}
			>
				<div className="hidden flex-1 flex-row-reverse items-center justify-center gap-10 text-[1.25rem] font-medium tracking-[0.22em] text-[#72857f] uppercase lg:flex">
					{items.map((item) => {
						if (item.kind === "services") return (
							<div key={item.id} className="group relative flex items-center gap-1 py-3">
								<a href={item.href} className="flex items-center gap-1 whitespace-nowrap transition hover:text-[#2f4d45]"><span>{item.label}</span><ChevronDownIcon /></a>
								<div className="invisible absolute right-1/2 top-full w-80 translate-x-1/2 translate-y-2 rounded-3xl border border-[#dce7e1] bg-[#fcfaf4] p-3 opacity-0 shadow-[0_18px_50px_rgba(24,49,43,.14)] transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
									{services.map(service => <Link key={service.id} href={`/services/${service.slug}`} className="block rounded-2xl px-4 py-3 text-right text-base tracking-normal text-[#526b64] transition hover:bg-[#e4f2eb] hover:text-[#294b43]">{service.title}</Link>)}
									{services.length === 0 && <span className="block px-4 py-3 text-sm tracking-normal text-[#82938e]">خدمتی ثبت نشده است</span>}
								</div>
							</div>
						)

						return (
							<a
								key={item.href}
								href={item.href}
								className="flex items-center gap-1 whitespace-nowrap transition hover:text-[#2f4d45]"
							>
								<span>{item.label}</span>
							</a>
						)
					})}
				</div>

				<div className="order-first shrink-0 lg:order-0">
					<Link href="/" aria-label="صفحه اصلی" className="block">
						<BrandMark />
					</Link>
				</div>

				<div className="flex shrink-0 items-center gap-2 sm:gap-3">
					<Link
						href="/contact"
						className="hidden items-center gap-3 rounded-full bg-[#d8efe4] px-4 py-2 text-sm font-medium text-[#35564d] transition hover:bg-[#cce6da] sm:inline-flex sm:px-5"
					>
						<span>ارتباط با دکتر</span>
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#35564d] text-white">
							<ArrowIcon className="rotate-180" />
						</span>
					</Link>
					<button
						type="button"
						aria-label="جستجو"
						className="hidden h-10 w-10 items-center justify-center rounded-full text-[#35564d] transition hover:bg-[#edf3ef] sm:flex"
					>
						<SearchIcon />
					</button>
					<button type="button" aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(value => !value)} className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-[#abcabf] text-[#35564d] lg:hidden">
						<motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }} className="h-px w-5 bg-current" />
						<motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="h-px w-5 bg-current" />
						<motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -4 : 0 }} className="h-px w-5 bg-current" />
					</button>
				</div>
			</div>
			<AnimatePresence>
				{mobileOpen && <motion.nav initial={{ opacity: 0, y: -12, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }} transition={{ duration: .3, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-3 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[2rem] border border-[#dbe6e0] bg-[#fcfaf4] p-4 text-[#49645d] shadow-[0_22px_60px_rgba(20,52,43,.16)] lg:hidden">
					{items.map(item => item.kind === "services" ? <div key={item.id} className="border-b border-[#dce5e1]">
						<button type="button" onClick={() => setMobileServicesOpen(value => !value)} className="flex w-full items-center justify-between py-4 text-lg"><span>{item.label}</span><motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }}><ChevronDownIcon /></motion.span></button>
						<AnimatePresence initial={false}>{mobileServicesOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="space-y-1 pb-4 pr-3">{services.map(service => <Link key={service.id} href={`/services/${service.slug}`} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 text-base text-[#60766f] hover:bg-[#e5f2ec]">{service.title}</Link>)}</div></motion.div>}</AnimatePresence>
					</div> : <a key={item.id} href={item.href} onClick={() => setMobileOpen(false)} className="block border-b border-[#dce5e1] py-4 text-lg last:border-0">{item.label}</a>)}
					<Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-4 flex items-center justify-between rounded-full bg-[#d8efe4] px-5 py-3 font-medium"><span>ارتباط با دکتر</span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#35564d] text-white"><ArrowIcon className="rotate-180" /></span></Link>
				</motion.nav>}
			</AnimatePresence>
		</header>
	)
}
