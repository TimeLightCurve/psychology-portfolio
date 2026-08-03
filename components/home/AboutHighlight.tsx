"use client"

import Button from "../ui/Button"
import { usePublicSingleton } from "@/lib/use-public-content"


export default function AboutHighlight() {
	const { item: about } = usePublicSingleton<{ highlightTitle: string; highlightContent: string }>("about")

	return (
		<section id="about" className="font-nian min-h-screen w-full flex bg-[#f8f5ed] px-4 py-10 text-[#35554f] sm:px-6 lg:px-28 lg:py-12">
			<div
				className="flex min-h-[calc(100vh-5rem)] w-full flex-col bg-[#f8f5ed]"
			// style={{ maxWidth: '1380px' }}
			>
				<div className=" flex flex-col w-full  pt-24 lg:items-start lg:pt-36 lg:gap-20">
					<div className="w-full flex h-fit ">
						<h2 className="font-nian font-bold text-[2rem] leading-[0.94] tracking-[-0.04em] text-[#2e4c47] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[6.8rem]">
							{about?.highlightTitle || "هدف من این است که بر سلامت روان و کیفیت زندگی شما اثر ماندگار و واقعی بگذارم."}
						</h2>
					</div>

					<div className="self-end justify-self-end lg:mt-12" style={{ maxWidth: "850px" }}>
						<div className="mb-6 h-px w-full bg-[#4d6a63]" />
						<p className="text-xl leading-10 text-[#48645d] sm:text-2xl lg:text-3xl sm:leading-[2.8rem]">
							{about?.highlightContent || "در جلسات درمانی من، اولویت با ایجاد فضایی امن، محترمانه و روشن برای شنیدن، فهمیدن و بازسازی تعادل روانی شماست. تمرکز من بر درمان فردی، خودشناسی عمیق و همراهی حرفه ای در مسیر تغییر پایدار است."}
						</p>
						<Button href="/about" >
							<span>درباره من</span>
						</Button>
					</div>
				</div>

			</div>
		</section>
	)
}
