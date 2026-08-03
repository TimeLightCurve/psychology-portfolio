"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"

type Definition = { label: string; singleton?: boolean; fields: Record<string, string> }
type Item = Record<string, unknown> & { id: string }
type Row = { title: string; content: string }

function RepeaterField({ name, label, value }: { name: string; label: string; value: unknown }) {
  const initial = Array.isArray(value) ? value as Row[] : []
  const [rows, setRows] = useState<Row[]>(initial)
  const update = (index: number, key: keyof Row, next: string) => setRows(current => current.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: next } : row))
  return <fieldset className="rounded-2xl border border-[#cedbd5] p-4 md:col-span-2">
    <legend className="px-2 text-sm font-semibold">{label}</legend>
    <input type="hidden" name={name} value={JSON.stringify(rows)} />
    <div className="space-y-4">{rows.map((row, index) => <div key={index} className="rounded-xl bg-[#f5f8f6] p-4">
      <div className="flex items-center justify-between"><span className="text-sm text-[#71857e]">ردیف {index + 1}</span><button type="button" onClick={() => setRows(current => current.filter((_, rowIndex) => rowIndex !== index))} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700">حذف</button></div>
      <label className="mt-3 block text-sm">عنوان<input value={row.title} onChange={event => update(index, "title", event.target.value)} className="mt-2 w-full rounded-xl border border-[#cedbd5] bg-white px-4 py-3 outline-none focus:border-[#35564d]" /></label>
      <label className="mt-3 block text-sm">توضیحات<textarea value={row.content} onChange={event => update(index, "content", event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-[#cedbd5] bg-white px-4 py-3 outline-none focus:border-[#35564d]" /></label>
    </div>)}</div>
    <button type="button" onClick={() => setRows(current => [...current, { title: "", content: "" }])} className="mt-4 rounded-xl border border-[#35564d] px-4 py-2 text-sm text-[#35564d]">+ افزودن ردیف</button>
  </fieldset>
}

function ImageField({ name, label, value }: { name: string; label: string; value: unknown }) {
  const [src, setSrc] = useState(String(value ?? ""))
  return <label className="md:col-span-2"><span className="text-sm">{label}</span><input name={name} value={src} onChange={event => setSrc(event.target.value)} dir="ltr" className="mt-2 w-full rounded-xl border border-[#cedbd5] bg-[#fbfcfb] px-4 py-3 outline-none focus:border-[#35564d]" />
    {src && <span className="mt-3 block overflow-hidden rounded-2xl border border-[#dce5e1] bg-[#f5f8f6] p-2"><img src={src} alt="پیش‌نمایش تصویر" className="h-56 w-full rounded-xl object-cover" onError={event => { event.currentTarget.style.display = "none" }} /></span>}
  </label>
}

export default function ResourceManager({ resource, definition }: { resource: string; definition: Definition }) {
  const [items, setItems] = useState<Item[]>([])
  const [editing, setEditing] = useState<Item | null>(null)
  const [open, setOpen] = useState(Boolean(definition.singleton))
  const [busy, setBusy] = useState(true)
  const [message, setMessage] = useState("")

  const load = useCallback(async () => {
    setBusy(true)
    const response = await fetch(`/api/admin/${resource}`)
    if (response.ok) setItems(await response.json())
    setBusy(false)
  }, [resource])
  useEffect(() => {
    let active = true
    fetch(`/api/admin/${resource}`).then(response => response.ok ? response.json() : []).then(data => {
      if (active) { setItems(data); setBusy(false) }
    })
    return () => { active = false }
  }, [resource])
  const formItem = editing ?? (definition.singleton ? items[0] : null)

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("")
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    const method = formItem ? "PUT" : "POST"
    const response = await fetch(`/api/admin/${resource}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formItem ? { id: formItem.id, ...values } : values) })
    setBusy(false)
    if (!response.ok) return setMessage("ذخیره انجام نشد. دوباره تلاش کنید.")
    setMessage("تغییرات ذخیره شد."); setEditing(null); setOpen(Boolean(definition.singleton)); await load()
  }

  async function remove(id: string) {
    if (!confirm("این مورد حذف شود؟")) return
    await fetch(`/api/admin/${resource}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    await load()
  }

  return <section>
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-[#71857e]">مدیریت محتوا</p><h1 className="mt-1 text-4xl font-bold">{definition.label}</h1></div>{!definition.singleton && <button onClick={() => { setEditing(null); setOpen(true) }} className="rounded-2xl bg-[#35564d] px-5 py-3 text-white">+ افزودن مورد</button>}</div>
    {message && <p className="mt-5 rounded-xl bg-[#d9eee4] px-4 py-3 text-sm">{message}</p>}
    {open && <form onSubmit={save} className="mt-7 rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{formItem ? "ویرایش" : "مورد جدید"}</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">{Object.entries(definition.fields).map(([key, label]) => {
        if (["supportItems", "treatments"].includes(key)) return <RepeaterField key={`${formItem?.id ?? "new"}-${key}`} name={key} label={label} value={formItem?.[key]} />
        if (["image", "authorImage"].includes(key)) return <ImageField key={`${formItem?.id ?? "new"}-${key}`} name={key} label={label} value={formItem?.[key]} />
        const long = ["content", "excerpt", "address", "intro", "supportIntro", "supportItems", "infoContent", "treatments", "ctaContent", "highlightContent", "formIntro"].includes(key)
        const classes = "mt-2 w-full rounded-xl border border-[#cedbd5] bg-[#fbfcfb] px-4 py-3 outline-none focus:border-[#35564d]"
        const rawValue = formItem?.[key]
        const value = typeof rawValue === "object" ? JSON.stringify(rawValue, null, 2) : String(rawValue ?? "")
        return <label key={`${formItem?.id ?? "new"}-${key}`} className={long ? "md:col-span-2" : ""}><span className="text-sm">{label}</span>{long ? <textarea name={key} rows={["supportItems", "treatments"].includes(key) ? 9 : 5} dir={["supportItems", "treatments"].includes(key) ? "ltr" : "rtl"} defaultValue={value} className={classes} /> : <input name={key} type={key === "order" ? "number" : "text"} dir={["url", "href", "email", "image", "mapUrl", "slug", "phone", "ctaHref"].includes(key) ? "ltr" : "rtl"} defaultValue={value} className={classes} />}</label>
      })}</div>
      <div className="mt-6 flex gap-3"><button disabled={busy} className="rounded-xl bg-[#35564d] px-6 py-2.5 text-white disabled:opacity-50">ذخیره</button>{!definition.singleton && <button type="button" onClick={() => { setOpen(false); setEditing(null) }} className="rounded-xl border px-6 py-2.5">انصراف</button>}</div>
    </form>}
    {!definition.singleton && <div className="mt-7 overflow-hidden rounded-3xl bg-white shadow-sm">{busy && !items.length ? <p className="p-6">در حال بارگذاری…</p> : items.length === 0 ? <p className="p-8 text-center text-[#71857e]">هنوز موردی ثبت نشده است.</p> : <div className="divide-y divide-[#e3ebe7]">{items.map(item => <article key={item.id} className="flex flex-wrap items-center justify-between gap-4 p-5"><div className="flex items-center gap-4">{typeof item.image === "string" && item.image && <img src={item.image} alt="" className="h-16 w-20 rounded-xl object-cover" />}<div><h2 className="text-lg font-semibold">{String(item.title ?? item.label ?? item.email ?? "بدون عنوان")}</h2><p className="mt-1 max-w-2xl truncate text-sm text-[#71857e]">{String(item.excerpt ?? item.address ?? item.href ?? item.url ?? "")}</p></div></div><div className="flex gap-2"><button onClick={() => { setEditing(item); setOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }) }} className="rounded-lg border px-3 py-2 text-sm">ویرایش</button><button onClick={() => remove(item.id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700">حذف</button></div></article>)}</div>}</div>}
  </section>
}
