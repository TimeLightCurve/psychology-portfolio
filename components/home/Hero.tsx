'use client'

import { motion } from "motion/react"
import ArrowDownIcon from "../icons/ArrowDownIcon"
import { ThreeCanvas } from "../ThreeCanvas"
import Button from "../ui/Button"
import Image from "next/image"

export default function Hero() {
	return (
		<section id="top" className="relative min-h-screen overflow-hidden bg-[#1d2b26] text-white font-nian">
			<Image
				src="/0415.jpg"
				alt="فضای کاری دکتر روانشناس"
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,17,15,0.32)_0%,rgba(13,18,17,0.5)_38%,rgba(12,17,16,0.58)_100%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%)]" />
			{/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,255,214,0.16),transparent_42%),linear-gradient(180deg,#0b1513_0%,#07110f_100%)]" /> */}

			<div className="relative z-10 flex min-h-screen flex-col px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-28 lg:pt-48">
				<div
					className="mx-auto grid w-full flex-1 grid-cols-1 items-start gap-10 lg:gap-16"
				// style={{ maxWidth: "1380px" }}
				>
					<div className="w-full">
						<h1
							className="font-nian font-bold text-[4rem] leading-[0.94] tracking-[-0.04em] text-[#fffdf8] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[8.8rem]"
						>
							دکتر روانشناس
							<br />
							همراه مسیر درمان شما
						</h1>
					</div>

					<div className="self-end justify-self-end lg:mb-10" style={{ maxWidth: "850px" }}>
						<div className="mb-6 h-px w-full bg-white/35" />
						<p className="text-lg leading-9 text-white/92 sm:text-xl lg:text-3xl text-pretty">
							من با رویکردی علمی، انسانی و فردمحور در کنار شما هستم تا فضایی امن برای گفت و گو،
							خودشناسی و درمان فراهم شود. این صفحه معرفی خدمات، تجربه حرفه ای، حوزه های تخصصی
							و راه های ارتباط با من برای رزرو جلسه مشاوره است.
						</p>
						<Button href="#contact">
							<span className=" text-lg">رزرو جلسه مشاوره</span>
						</Button>
					</div>
				</div>

				<div
					className="mx-auto flex w-full items-end justify-between gap-6 pt-10 text-white/92"
				// style={{ maxWidth: "1380px" }}
				>
					<a href="#about" className="inline-flex items-center gap-3 text-lg font-medium transition hover:text-white">
						<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8efe4] text-[#35564d] overflow-hidden">
							<motion.div
								className=""
								animate={{ y: [-12, 38] }}
								transition={{ duration: 1.2, repeat: Infinity }}
							>
								<ArrowDownIcon className="h-6 w-6" />
							</motion.div>
						</span>
						<span>برای مشاهده ادامه صفحه اسکرول کنید</span>
					</a>
				</div>
			</div>
			

		</section>
	)
}