import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

const words = ["considered.", "intuitive.", "dependable.", "intentional."]

export default function HeroTitle() {
	const [activeWord, setActiveWord] = useState(0)
	const prefersReducedMotion = useReducedMotion()

	useEffect(() => {
		if (prefersReducedMotion) return

		const interval = window.setInterval(() => {
			setActiveWord((current) => (current + 1) % words.length)
		}, 2600)

		return () => window.clearInterval(interval)
	}, [prefersReducedMotion])

	return (
		<h1
			id="intro-heading"
			className="col-span-full mb-8 max-w-3xl font-serif text-[clamp(2.4rem,10vw,3.5rem)] leading-[0.98] font-normal tracking-[-0.055em] md:mb-10 md:text-[clamp(2.75rem,6vw,4.5rem)]"
		>
			I build software that feels{" "}
			<span className="relative inline-grid overflow-hidden align-bottom text-[#e25834]">
				<span
					aria-hidden="true"
					className="invisible col-start-1 row-start-1 whitespace-nowrap"
				>
					intentional.
				</span>
				<AnimatePresence initial={false} mode="popLayout">
					<motion.span
						key={words[activeWord]}
						initial={
							prefersReducedMotion
								? false
								: { y: "105%", opacity: 0 }
						}
						animate={{ y: "0%", opacity: 1 }}
						exit={
							prefersReducedMotion
								? { opacity: 0 }
								: { y: "-105%", opacity: 0 }
						}
						transition={{
							duration: 0.5,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="col-start-1 row-start-1 block whitespace-nowrap"
					>
						{words[activeWord]}
					</motion.span>
				</AnimatePresence>
			</span>
		</h1>
	)
}
