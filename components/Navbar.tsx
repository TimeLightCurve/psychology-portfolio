"use client"

import Link from "next/link"
import ArrowIcon from "./icons/ArrowIcon"
import { usePublicContent } from "@/lib/use-public-content"


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
						className="inline-flex items-center gap-3 rounded-full bg-[#d8efe4] px-4 py-2 text-sm font-medium text-[#35564d] transition hover:bg-[#cce6da] sm:px-5"
					>
						<span>ارتباط با دکتر</span>
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#35564d] text-white">
							<ArrowIcon className="rotate-180" />
						</span>
					</Link>
					<button
						type="button"
						aria-label="جستجو"
						className="flex h-10 w-10 items-center justify-center rounded-full text-[#35564d] transition hover:bg-[#edf3ef]"
					>
						<SearchIcon />
					</button>
				</div>
			</div>
		</header>
	)
}
