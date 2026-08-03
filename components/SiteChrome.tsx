"use client"

import { usePathname } from "next/navigation"
import CtaSection from "./CtaSection"
import Footer from "./Footer"
import Navbar from "./Navbar"
import AppointmentModal from "./appointment/AppointmentModal"

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const bare = pathname === "/login" || pathname.startsWith("/admin")
  if (bare) return children
  return <><Navbar />{children}<CtaSection /><Footer /><AppointmentModal /></>
}
