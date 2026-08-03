import { auth } from "@/auth"
import LoginForm from "@/components/admin/LoginForm"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  if (await auth()) redirect("/admin")
  return <main className="flex min-h-screen items-center justify-center bg-[#f8f5ed] px-4 text-[#35564d]">
    <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-[0_24px_80px_rgba(35,65,55,.12)] sm:p-10">
      <p className="text-sm tracking-[.25em] text-[#789087]">مدیریت وب‌سایت</p>
      <h1 className="mt-3 text-4xl font-semibold">خوش آمدید</h1>
      <p className="mt-3 text-[#6b7f78]">برای مدیریت محتوای سایت وارد شوید.</p>
      <LoginForm />
    </section>
  </main>
}
