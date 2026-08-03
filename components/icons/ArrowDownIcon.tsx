import { cn } from "@/lib/utils/utils"

export default function ArrowDownIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("h-8 w-8",className)}>
			<path
				d="M12 5v14"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path
				d="m6.5 13.5 5.5 5.5 5.5-5.5"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
