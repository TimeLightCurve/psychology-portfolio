"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true); setError("")
    const data = new FormData(event.currentTarget)
    const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false })
    setPending(false)
    if (result?.error) return setError("ایمیل یا رمز عبور صحیح نیست.")
    router.push("/admin"); router.refresh()
  }

  return <form onSubmit={submit} className="mt-8 space-y-5">
    <label className="block text-sm">ایمیل<input name="email" type="email" required dir="ltr" className="mt-2 w-full rounded-2xl border border-[#b9c9c2] bg-white px-4 py-3 outline-none focus:border-[#35564d]" /></label>
    <label className="block text-sm">رمز عبور<input name="password" type="password" required minLength={8} dir="ltr" className="mt-2 w-full rounded-2xl border border-[#b9c9c2] bg-white px-4 py-3 outline-none focus:border-[#35564d]" /></label>
    {error && <p className="text-sm text-red-700">{error}</p>}
    <button disabled={pending} className="w-full rounded-2xl bg-[#35564d] px-5 py-3 text-white disabled:opacity-60">{pending ? "در حال ورود…" : "ورود به پنل"}</button>
  </form>
}
