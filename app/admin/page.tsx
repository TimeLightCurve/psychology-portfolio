import { resources } from "@/lib/content"
import Link from "next/link"

export default function AdminPage() {
  return <section><p className="text-sm text-[#71857e]">داشبورد محتوا</p><h1 className="mt-2 text-4xl font-bold">مدیریت وب‌سایت</h1><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Object.entries(resources).map(([key, item]) => <Link key={key} href={`/admin/${key}`} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><h2 className="text-2xl font-semibold">{item.label}</h2><p className="mt-2 text-sm text-[#71857e]">مشاهده، افزودن و ویرایش محتوا</p></Link>)}</div></section>
}
