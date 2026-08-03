'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Button from '../ui/Button'
import { usePublicContent } from '@/lib/use-public-content'

type Clinic = { id: string; title: string; address: string; image: string }

export default function ClinicLocations() {
	const { items: clinics, loading } = usePublicContent<Clinic>("clinics")
	const [activeClinicId, setActiveClinicId] = useState<string | null>(null)
	const sectionRef = useRef<HTMLElement>(null)
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	})
	const imageY = useTransform(scrollYProgress, [0, 1], [200, -200])
	const activeClinic = clinics.find((clinic) => clinic.id === activeClinicId) ?? clinics[0]
	if (loading) return <section ref={sectionRef} id="locations" className="min-h-screen animate-pulse bg-[#f8f5ed]" />
	if (!activeClinic) return <section ref={sectionRef} id="locations" className="bg-[#f8f5ed]" />

	return (
		<section ref={sectionRef} id="locations" className="min-h-screen font-nian bg-[#f8f5ed] px-4 py-10 text-[#35554f] sm:px-6 lg:px-28 lg:py-12">
			<div
				className="mx-auto grid min-h-[calc(100vh-5rem)] w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1fr)] lg:items-stretch lg:gap-16"
			// style={{ maxWidth: '1380px' }}
			>
				<div className="relative order-2 overflow-hidden  lg:order-1 lg:min-h-full">
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={activeClinic.id}
							className="absolute inset-0"
							style={{ y: imageY }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
							transition={{ type: 'spring', stiffness: 200, damping: 70 }}
						>
							<Image
								src={activeClinic.image}
								alt={activeClinic.title}
								fill
								priority
								className="object-cover"
							/>
						</motion.div>
					</AnimatePresence>
				</div>

				<div className="order-1 flex min-h-full flex-col pt-6 lg:order-2 lg:pt-0">
					<div className=''>
						<h2 className="font-nian font-bold text-[2.6rem] leading-none tracking-[-0.04em] text-[#35554f] sm:text-[2.6rem] lg:text-[3.6rem]">
							مطب هایی که در آن ها
							مراجع می پذیرم
						</h2>
						<div className="mt-12 h-px w-full bg-[#5a756e]" />

						<div className="mt-6 divide-y divide-[#5a756e] border-b border-[#5a756e]">
							{clinics.map((clinic) => {
								const isActive = clinic.id === activeClinic.id

								return (
									<div
										key={clinic.id}
										onMouseEnter={() => setActiveClinicId(clinic.id)}
										onFocus={() => setActiveClinicId(clinic.id)}
										className="grid grid-cols-1 gap-5 py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
									>
										<div>
											<h3 className={`font-nian text-[2.2rem] leading-none transition sm:text-[2.8rem] ${isActive ? 'text-[#264740]' : 'text-[#48645d]'}`}>
												{clinic.title}
											</h3>
											<p className="mt-3 max-w-136 text-lg leading-8 text-[#4b6760] sm:text-xl">
												{clinic.address}
											</p>
										</div>

										{/* <a
											href="#contact"
											className={`inline-flex w-fit flex-row-reverse items-center gap-3 rounded-full border px-5 py-3 text-base transition ${isActive ? 'border-[#35564d] bg-[#eef5f1] text-[#35564d]' : 'border-[#7a908a] text-[#48645d] hover:bg-[#eef5f1]'}`}
										>
											<span>مشاهده مطب</span>
											<span className={`flex h-10 w-10 items-center justify-center rounded-full ${isActive ? 'bg-[#35564d] text-white' : 'bg-transparent text-current'}`}>
												<ArrowIcon />
											</span>
										</a> */}
										<Button href="#contact" mainClassName={`border border-[#7a908a] text-[#48645d] bg-white hover:bg-[#eef5f1] w-fit`}>
											<span>مشاهده مطب</span>
										</Button>
									</div>
								)
							})}
						</div>
					</div>

					<div className="pt-8">
						{/* <a
							href="#contact"
							className="inline-flex w-fit flex-row-reverse items-center gap-3 rounded-full bg-[#d7efe2] px-6 py-3 text-lg font-medium text-[#35564d] transition hover:bg-[#c9e5d8]"
						>
							<span>برای رزرو با من در ارتباط باشید</span>
							<span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#35564d] text-white">
								<ArrowIcon />
							</span>
						</a> */}
						<Button href="#contact">
							<span>برای رزرو با من در ارتباط باشید</span>
						</Button>

					</div>
				</div>
			</div>
		</section>
	)
}
