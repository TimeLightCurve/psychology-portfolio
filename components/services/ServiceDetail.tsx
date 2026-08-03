"use client"

import type { ServiceAccordionItem, ServiceDocument } from "@/lib/models/service"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

function Accordion({ items }: { items: ServiceAccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return <div className="border-t border-[#496760]">
    {items.map((item, index) => {
      const expanded = open === index
      return <div key={`${item.title}-${index}`} className="border-b border-[#496760]">
        <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : index)} className="flex w-full items-center justify-between gap-6 py-7 text-right text-2xl font-light sm:py-9 sm:text-3xl">
          <span>{item.title}</span>
          <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: .25 }} className="text-2xl text-[#7e948d]">+</motion.span>
        </button>
        <AnimatePresence initial={false}>
          {expanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: .42, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: .22 } }} className="overflow-hidden">
            <p className="max-w-3xl whitespace-pre-line pb-8 text-lg leading-9 text-[#58716b]">{item.content}</p>
          </motion.div>}
        </AnimatePresence>
      </div>
    })}
  </div>
}

function StickySection({ title, children, dot = true }: { title: string; children: React.ReactNode; dot?: boolean }) {
  return <section className="grid gap-12 border-t border-[#496760]/30 py-20 lg:grid-cols-[minmax(280px,.9fr)_minmax(0,1.15fr)] lg:gap-20 lg:py-28">
    <div className="relative">
      <div className="lg:sticky lg:top-36">
        <h2 className="max-w-xl text-[clamp(2.7rem,4.7vw,5.2rem)] font-light leading-[1.05] tracking-[-.045em]">{title}</h2>
        {/* {dot && <span className="mt-52 hidden h-2.5 w-2.5 rounded-full bg-[#f3c866] lg:block" />} */}
      </div>
    </div>
    <div>{children}</div>
  </section>
}

export default function ServiceDetail({ service }: { service: ServiceDocument }) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -580])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return <main dir="rtl" className="bg-[#f8f5ed] font-nian text-[#294d45]">
    <section ref={heroRef} className="relative min-h-[80vh] overflow-hidden bg-[#cceee2] px-4 pb-4 pt-32 sm:px-6 lg:px-24 lg:pt-44">
      <div className="relative z-10 mx-auto max-w-[1720px]">
        <h1 className="max-w-6xl text-[clamp(4rem,9.5vw,10rem)] font-light leading-[.88] tracking-[-.065em]">{service.title}</h1>
        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[minmax(0,.95fr)_minmax(420px,.7fr)] lg:gap-24">
          <div className="relative z-10 pb-8">
            <div className="mb-8 h-px bg-[#42645c]" />
            <p className="max-w-3xl whitespace-pre-line text-lg leading-9 sm:text-2xl sm:leading-[1.55]">{service.excerpt}</p>
            <Link href={service.ctaHref || "/contact"} className="mt-8 inline-flex items-center gap-4 rounded-full border border-[#31574f] px-6 py-3 text-base transition hover:bg-white/40">
              <span>{service.ctaLabel || "ارتباط برای رزرو نوبت"}</span><span className="grid h-10 w-10 place-items-center rounded-full bg-[#31574f] text-white">←</span>
            </Link>
          </div>
          <motion.div style={{ y: imageY, scale: imageScale }} className="relative mx-auto aspect-[.68] w-full max-w-[450px] overflow-hidden rounded-t-full rounded-b-full bg-[#b7dcd5] shadow-[0_30px_80px_rgba(30,77,67,.12)]">
            <Image src={service.image} alt={service.title} fill priority className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>

    <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-24">
      <StickySection title={service.supportTitle}>
        {service.supportIntro && <p className="mb-14 border-t border-[#496760] pt-12 text-xl leading-10 sm:text-2xl">{service.supportIntro}</p>}
        <Accordion items={service.supportItems || []} />
      </StickySection>

      {(service.infoTitle || service.infoContent) && <StickySection title={service.infoTitle}>
        <div className="border-t border-[#496760] pt-12"><p className="whitespace-pre-line text-xl leading-10 sm:text-2xl">{service.infoContent}</p></div>
      </StickySection>}

      <StickySection title={service.treatmentsTitle}>
        <Accordion items={service.treatments || []} />
      </StickySection>

      <StickySection title={service.ctaTitle} dot={false}>
        <div className="border-t border-[#496760] pt-12">
          <p className="whitespace-pre-line text-xl leading-10 sm:text-2xl">{service.ctaContent}</p>
          <Link href={service.ctaHref || "/contact"} className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#cceee2] px-6 py-3 text-lg transition hover:bg-[#bce5d6]">{service.ctaLabel || "رزرو نوبت"}<span>←</span></Link>
        </div>
      </StickySection>
    </div>
  </main>
}
