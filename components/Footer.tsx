"use client"

import InstagramIcon from "./icons/InstagramIcon"
import LinkedInIcon from "./icons/LinkedInIcon"
import { usePublicContent } from "@/lib/use-public-content"


export default function Footer() {
	const { items: socialLinks } = usePublicContent<{ id: string; label: string; url: string }>("socialLinks")
	const instagram = socialLinks.find(item => item.label.toLowerCase().includes("instagram") || item.label.includes("اینستاگرام"))?.url ?? "#"
	const linkedin = socialLinks.find(item => item.label.toLowerCase().includes("linkedin") || item.label.includes("لینکدین"))?.url ?? "#"
	return (
		<footer className="bg-[#335750] text-[#f7f3eb] font-nian">
			<div className="px-4 pt-10 sm:px-6 lg:px-10">
				<div className="mx-auto max-w-430">
					<div className="flex flex-col gap-8 border-b border-white/12 pb-8 lg:flex-row lg:items-start lg:justify-between">
						<div className="flex flex-col gap-4 lg:gap-6">
							<div className="flex items-center gap-4 text-[#f7f3eb]">
								<span className="font-nian text-[2.4rem] leading-none">ما را دنبال کنید</span>
								<a href={instagram} aria-label="اینستاگرام" className="transition hover:text-[#d7efe2]">
									<InstagramIcon />
								</a>
								<a href={linkedin} aria-label="لینکدین" className="transition hover:text-[#d7efe2]">
									<LinkedInIcon />
								</a>
							</div>
						</div>

						<p className="text-lg text-white/92 lg:text-xl">© ۲۰۲۶ تمامی حقوق برای این وب سایت محفوظ است.</p>

						<div className="flex items-start gap-3 text-lg text-white/92 lg:items-end lg:text-xl">
							<a href="#" className="transition hover:text-[#d7efe2]">حریم خصوصی</a>
							<a href="#" className="transition hover:text-[#d7efe2]">منابع و مطالب مفید</a>
						</div>
					</div>

					<div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
						<p className="font-nian font-extralight text-sm leading-[1.45] tracking-[-0.03em] text-[#f7f3eb] sm:text-base xl:text-lg">
							من با احترام به ارزش های انسانی، تنوع تجربه های زیسته و کرامت هر فرد، فضایی امن برای
							گفت و گو و درمان فراهم می کنم تا مسیر رشد، آگاهی و بهبود روانی با اعتماد بیشتری دنبال شود.
						</p>
					</div>
				</div>
			</div>

			<div className="bg-[#cbede0] px-4 py-8 text-center text-[#284741] sm:px-6 lg:px-10">
				<p className="mx-auto max-w-6xl text-xl leading-10 sm:text-2xl sm:leading-[2.8rem]">
					<span className="font-semibold">اگر در بحران هستید:</span>
					لطفا با اورژانس اجتماعی، اورژانس ۱۱۵ یا یک فرد مورد اعتماد به صورت فوری تماس بگیرید.
				</p>
			</div>
		</footer>
	)
}
