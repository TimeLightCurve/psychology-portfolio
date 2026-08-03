'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ArrowIcon from '../icons/ArrowIcon'
import { usePublicContent } from '@/lib/use-public-content'

type Service = { id: string; title: string; description: string; image: string; slug?: string }

export function ServicesHighlight() {
	const { items: rawServices, loading } = usePublicContent<Omit<Service, "description"> & { excerpt: string }>("services")
	const services = rawServices.map(service => ({ ...service, description: service.excerpt }))
	const sectionRef = useRef<HTMLElement | null>(null)
	const [activeServiceId, setActiveServiceId] = useState<string | null>(null)
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	})

	const backgroundColor = useTransform(scrollYProgress, [0, 1], ['#f8f5ed', '#cbede0'])
	const cardY = useTransform(scrollYProgress, [0, 1], [-400, 220])
	const activeService = services.find((service) => service.id === activeServiceId) ?? services[0]
	useEffect(() => {
		if (!services.length) return
		const frame = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
		return () => cancelAnimationFrame(frame)
	}, [services.length])

	return (
		<motion.section
			ref={sectionRef}
			id="services"
			style={{ backgroundColor }}
			className={`font-nian min-h-screen px-4 py-10 text-[#35554f] sm:px-6 lg:px-28 lg:pt-24 lg:pb-6 ${loading ? 'animate-pulse' : ''}`}
		>
			{!activeService ? <div className="min-h-screen" /> : <div>
				<div className="flex min-h-[calc(100vh-5rem)] w-full flex-col  pt-16 lg:pt-0">
					<div className="pt-12 lg:pt-20">
						<h2 className="font-nian text-[3.4rem] leading-[0.93] tracking-[-0.05em] text-[#2f4d47] sm:text-[4.8rem] md:text-[6rem] lg:text-[7.6rem] xl:text-[8.7rem]">
							روانشناسی برای من
							فقط درمان نیست.
						</h2>
					</div>

					<div className="w-full max-w-3xl pb-10 lg:pb-16 lg:pt-36">
						<div className="mb-8 h-px w-full bg-[#4d6a63]" />
						<p className="text-xl leading-10 text-[#48645d] sm:text-2xl sm:leading-[2.8rem]">
							خدمات من طیفی از نیازهای روانشناختی را پوشش می دهد؛ از درمان فردی و تحلیل الگوهای
							هیجانی تا همراهی در مسیر خودشناسی، تنظیم روابط و بازسازی تعادل ذهنی. در این بخش
							می توانید با رویکرد کاری و حوزه های خدمات من بیشتر آشنا شوید.
						</p>

						{/* <a
						href="#contact"
						className="mt-10 inline-flex w-fit flex-row-reverse items-center gap-3 rounded-full bg-[#f9f7f0] px-6 py-3 text-lg font-medium text-[#35564d] transition hover:bg-white"
					>
						<span>مشاهده خدمات من</span>
						<span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#35564d] text-white">
							<ArrowIcon />
						</span>
					</a> */}
					</div>
				</div>
				<div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full grid-cols-1 gap-12 pt-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-18 lg:pt-0"
				//  style={{ maxWidth: '1380px' }}
				>
					<div className="order-2 lg:order-1 lg:pt-0">
						<div className="mb-16 flex items-start justify-between gap-6">
							{/* <h2 className="font-nian font-bold text-[2.7rem] leading-[0.98] tracking-[-0.04em] text-[#2f4d47] sm:text-[3.4rem] lg:text-[4.2rem]">
							خدماتی که ارائه می دهم
						</h2> */}
							{/* <span className="mt-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#35564d] text-white">
							<ArrowIcon />
						</span> */}
						</div>

						<div className=" ">
							{services.map((service) => {
								const isActive = service.id === activeService.id

								return (
									<a
										key={service.id}
										href={service.slug ? `/services/${service.slug}` : "#services"}
										onMouseEnter={() => setActiveServiceId(service.id)}
										onFocus={() => setActiveServiceId(service.id)}
										onClick={() => setActiveServiceId(service.id)}
										className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-7 text-right border-b ${isActive ? 'border-[#35564d]' : 'border-[#9eb7b0]'} transition-colors duration-500 ease-in-out`}
									>
										<span
											className={`relative font-nian text-[2.05rem] leading-none transition-all duration-500 ease-in-out sm:text-[2.6rem] lg:text-[3rem] ${isActive ? 'text-[#264740] right-8' : 'text-[#7c9992] right-0'
												}`}
										>
											{service.title}
										</span>
										<span
											className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${isActive
												? 'border-[#35564d] bg-[#35564d] text-white'
												: 'border-[#9eb7b0] text-[#8da8a1]'
												}`}
										>
											<ArrowIcon className='rotate-180' />
										</span>
									</a>
								)
							})}
						</div>
					</div>

					<div className="order-1 lg:order-2 flex w-full h-full  ">
						<motion.div
							style={{ y: cardY }}
							className="relative bottom-32 md:bottom-auto mx-auto w-full max-w-[18rem] md:h-120 rounded-t-none rounded-b-full bg-[#2e4b46] p-4 text-white shadow-[0_16px_40px_rgba(25,49,45,0.15)] sm:max-w-[20rem]"
						>
							<p className="mb-4 text-base leading-8 text-white/92">
								{activeService.description}
							</p>
							<div className="relative aspect-[0.86] overflow-hidden rounded-t-[9rem] rounded-b-[9rem] border-10 border-[#2e4b46] bg-[#dfe8ef]">
								<Image
									src={activeService.image}
									alt={activeService.title}
									fill
									priority
									className="object-cover transition duration-500"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</div>}
		</motion.section>
	)
}
