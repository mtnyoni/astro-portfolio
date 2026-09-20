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
			className="mb-7 font-sans font-normal text-[clamp(2.25rem,5vw,2rem)] leading-[1.1] tracking-[-0.055em] text-[#303839]"
		>
			<div>I build software that feels</div>
			<div className="relative inline-grid overflow-hidden align-bottom text-[#11b8d0]">
				<div
					aria-hidden="true"
					className="invisible col-start-1 row-start-1 whitespace-nowrap"
				>
					intentional.
				</div>
				<AnimatePresence initial={false} mode="popLayout">
					<motion.div
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
					</motion.div>
				</AnimatePresence>
			</div>
		</h1>
	)
}
