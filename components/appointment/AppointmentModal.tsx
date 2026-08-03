"use client"

import { usePublicSingleton } from "@/lib/use-public-content"
import { AnimatePresence, motion } from "motion/react"
import { FormEvent, useEffect, useState } from "react"

const appointmentText = /(رزرو|ارتباط\s*با\s*دکتر)/

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return <label className="block"><span className="mb-2 block text-sm text-[#667b75]">{label}</span><input name={name} type={type} required className="w-full border-0 border-b border-[#8ba29a] bg-transparent px-0 pb-3 outline-none focus:border-[#35564d]" /></label>
}

export default function AppointmentModal() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const { item: contact } = usePublicSingleton<{ formTitle: string; formIntro: string }>("contact")

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("a,button") : null
      if (!target || !appointmentText.test(target.textContent?.replace(/\s+/g, " ").trim() ?? "")) return
      event.preventDefault()
      setSent(false)
      setOpen(true)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", close)
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close) }
  }, [open])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return <AnimatePresence>
    {open && <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#183c35]/55 p-3 backdrop-blur-sm sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false) }}>
      <motion.section role="dialog" aria-modal="true" aria-labelledby="appointment-title" initial={{ opacity: 0, y: 32, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .98 }} transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }} className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-[#f6e9bf] p-6 font-nian text-[#35564d] shadow-[0_30px_100px_rgba(12,40,32,.25)] sm:p-9 lg:p-12">
        <button type="button" onClick={() => setOpen(false)} aria-label="بستن" className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[#789088] text-2xl transition hover:bg-white/40">×</button>
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-14">
          <div className="pt-12 lg:pt-0"><p className="text-sm tracking-[.2em] text-[#789088]">رزرو و ارتباط</p><h2 id="appointment-title" className="mt-4 text-[clamp(2.8rem,5vw,5.2rem)] font-light leading-[1.02]">{contact?.formTitle || "ارسال پیام آنلاین"}</h2><p className="mt-6 text-lg leading-9 text-[#5d746e]">{contact?.formIntro || "برای رزرو نوبت یا دریافت اطلاعات بیشتر، مشخصات خود را وارد کنید تا با شما در ارتباط باشیم."}</p></div>
          {sent ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-80 flex-col items-center justify-center rounded-3xl bg-white/35 p-8 text-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#35564d] text-2xl text-white">✓</span><h3 className="mt-5 text-3xl">درخواست شما ثبت شد</h3><p className="mt-3 text-[#60766f]">در اولین فرصت برای هماهنگی با شما تماس می‌گیریم.</p><button type="button" onClick={() => setOpen(false)} className="mt-7 rounded-full border border-[#789088] px-6 py-2.5">بستن</button></motion.div> : <form onSubmit={submit} className="space-y-8 rounded-3xl bg-white/20 p-5 sm:p-7">
            <div className="grid gap-8 sm:grid-cols-2"><Field label="نام *" name="firstName" /><Field label="نام خانوادگی *" name="lastName" /><Field label="ایمیل *" name="email" type="email" /><Field label="تلفن *" name="phone" type="tel" /></div>
            <label className="block"><span className="mb-2 block text-sm text-[#667b75]">پیام شما</span><textarea name="message" rows={4} className="w-full resize-none border-0 border-b border-[#8ba29a] bg-transparent px-0 pb-3 outline-none focus:border-[#35564d]" /></label>
            <div className="flex items-center justify-between gap-4"><button type="submit" className="inline-flex items-center gap-4 rounded-full border border-[#688078] px-6 py-3 transition hover:bg-white/40"><span>ارسال درخواست</span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#35564d] text-white">←</span></button><span className="text-xs text-[#71857e]">* فیلدهای الزامی</span></div>
          </form>}
        </div>
      </motion.section>
    </motion.div>}
  </AnimatePresence>
}
