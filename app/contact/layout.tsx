import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "تماس با شقایق زارعی | روانشناس",
	description: "راه‌های تماس، دریافت اطلاعات و ثبت درخواست نوبت با شقایق زارعی روانشناس.",
	alternates: {
		canonical: "/contact",
	},
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children
}