"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import ArrowIcon from "../icons/ArrowIcon"
import { cn } from "@/lib/utils/utils"

type ButtonProps = {
	href?: string
	onClick?: () => void
	children: ReactNode
	className?: string
	mainClassName?: string
}

export default function Button({ onClick, href, children, className, mainClassName }: ButtonProps) {
	const [isHovered, setIsHovered] = useState(false)
	const sharedProps = {
		onPointerEnter: () => setIsHovered(true),
		onPointerLeave: () => setIsHovered(false),
		className: cn(`relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full pr-3 pl-6 py-3 text-base font-medium transition-colors duration-100 delay-250 ${isHovered ? "bg-[#2e4c47]" : "bg-[#d8efe4]"}`, mainClassName),
	}

	const content = (
		<>
			<motion.div
				className={`absolute left-0 top-0 z-0 h-full w-full rounded-full bg-[#2e4c47] transition-all duration-700 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
			/>
			<div className={cn(`z-10 flex h-full w-full flex-row-reverse items-center gap-3  font-nian transition-colors duration-700 ${isHovered ? "text-white" : "text-[#35564d]"}`, className)}>
				{children}
				<span className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 delay-150 ${isHovered ? "bg-[#d8efe4] text-[#2e4c47]" : "bg-[#35564d] text-[#d8efe4]"}`}>
					<motion.div
						className="relative flex items-center justify-center"
						animate={isHovered ? { x: 25 } : { x: -8 }}
						transition={{ duration: 0.5 }}
					>
						<ArrowIcon className="h-5 w-5" />
					</motion.div>
					<motion.div
						className="relative flex items-center justify-center"
						animate={isHovered ? { x: 8 } : { x: -25 }}
						transition={{ duration: 0.5 }}
					>
						<ArrowIcon className="h-5 w-5" />
					</motion.div>
				</span>
			</div>
		</>
	)

	if (href) {
		if (href.startsWith("#")) {
			return (
				<a href={href} {...sharedProps}>
					{content}
				</a>
			)
		}

		return (
			<Link href={href} {...sharedProps}>
				{content}
			</Link>
		)
	}
	return (
		<button
			type="button"
			onClick={onClick}
			{...sharedProps}
		>
			{content}
		</button>
	)
}
