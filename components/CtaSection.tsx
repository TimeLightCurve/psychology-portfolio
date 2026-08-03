import Button from "./ui/Button"


export default function CtaSection() {
	return (
		<section id="contact" className="relative min-h-screen overflow-hidden bg-[#2f6b61] text-white">
			<video
				autoPlay
				loop
				muted
				playsInline
				className="absolute inset-0 h-full w-full object-cover opacity-55"
			>
				<source src="/cta-video-transcode.mp4" type="video/mp4" />
			</video>

			<div className="absolute inset-0 bg-[#17443d]/68" />
			{/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,255,245,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(17,53,47,0.42),transparent_42%)]" />
			<div className="absolute -left-[8%] top-[18%] h-[62vh] w-[28vw] rounded-full bg-[#5f9b8f]/20 blur-3xl" />
			<div className="absolute right-[-6%] top-[-8%] h-[42vh] w-[34vw] rounded-[40%] bg-[#7eb7aa]/14 blur-2xl" />
			<div className="absolute bottom-[-10%] right-[20%] h-[28vh] w-[34vw] rounded-[48%] bg-[#2a5a52]/28 blur-2xl" /> */}

			<div className="relative z-10 flex min-h-screen flex-col px-4 py-8 sm:px-6 lg:px-10">
				<div className="flex flex-1 flex-col items-center justify-center text-center">
					<div className="mx-auto w-full max-w-280">
						<h2 className="font-nian text-[3.7rem] leading-[0.94] tracking-[-0.05em] text-[#f7f4ee] sm:text-[2.8rem] md:text-[4rem] lg:text-[5.4rem] xl:text-[6.2rem]">
							برای شروع مسیر درمان
							و مراقبت از سلامت روان
							خود آماده اید؟
						</h2>

						<p className="mx-auto font-nian mt-8 max-w-4xl text-xl leading-10 text-white/88 sm:text-lg sm:leading-[2.4rem]">
							اگر احساس می کنید زمان گفت و گو، دریافت حمایت تخصصی و شروع یک مسیر روشن تر فرا رسیده است،
							برای هماهنگی جلسه و دریافت اطلاعات بیشتر با من در ارتباط باشید.
						</p>

						<Button href="#contact">
							<span className=" text-lg">رزرو جلسه مشاوره</span>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}