import { auth, signOut } from "@/auth"
import { resources } from "@/lib/content"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user?.role !== "admin") redirect("/login")
  return <main dir="rtl" className="min-h-screen bg-[#eef3ef] font-nian text-[#29463f] lg:grid lg:grid-cols-[260px_1fr]">
    <aside className="border-l border-[#d5e0da] bg-[#294b43] p-6 text-white lg:min-h-screen">
      <Link href="/admin" className="text-2xl font-bold">پنل مدیریت</Link>
      <nav className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1">
        {Object.entries(resources).map(([key, value]) => <Link key={key} href={`/admin/${key}`} className="rounded-xl px-3 py-2.5 text-white/80 transition hover:bg-white/10 hover:text-white">{value.label}</Link>)}
      </nav>
      <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }) }} className="mt-8"><button className="rounded-xl border border-white/30 px-4 py-2 text-sm">خروج</button></form>
    </aside>
    <div className="p-5 pt-28 lg:p-10">{children}</div>
  </main>
}
