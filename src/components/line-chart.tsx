import * as d3 from "d3"
import { formatDate, parseISO } from "date-fns"
import { useEffect, useId, useRef, useState } from "react"
import useMeasure from "react-use-measure"

type MatchData = {
	date: string
	opponent: string
	competition: string
	moneylineOdds: string
	impliedWinProbabilityPerc: number
	actualResult: string
}

export const manCityMatchHistory: MatchData[] = [
	{
		date: "2025-12-06",
		opponent: "Sunderland (H)",
		competition: "Premier League",
		moneylineOdds: "-375 to -435",
		impliedWinProbabilityPerc: 80,
		actualResult: "Win (3-0)",
	},
	{
		date: "2025-12-02",
		opponent: "Fulham (A)",
		competition: "Premier League",
		moneylineOdds: "3/5 (Fractional, approx. -166)",
		impliedWinProbabilityPerc: 62,
		actualResult: "Win (5-4)",
	},
	{
		date: "2025-11-29",
		opponent: "Leeds (H)",
		competition: "Premier League",
		moneylineOdds: "-398 to -435",
		impliedWinProbabilityPerc: 80,
		actualResult: "Win (3-2)",
	},
	{
		date: "2025-11-25",
		opponent: "Leverkusen (H)",
		competition: "Champions League",
		moneylineOdds: "-450",
		impliedWinProbabilityPerc: 81.8,
		actualResult: "Loss (0-2)",
	},
	{
		date: "2025-11-22",
		opponent: "Newcastle (A)",
		competition: "Premier League",
		moneylineOdds: "+102 (or 19/20)",
		impliedWinProbabilityPerc: 50,
		actualResult: "Loss (1-2)",
	},
].reverse()

const MARGIN = { top: 40, right: 24, bottom: 60, left: 44 }
const INITIAL_SIZE = { width: 640, height: 320 }

export function MyChart({ data }: { readonly data: MatchData[] }) {
	const [ref, bounds] = useMeasure()
	const [tooltipRef, tooltipBounds] = useMeasure()
	const [pointer, setPointer] = useState<{ x: number; y: number } | null>(
		null
	)
	const id = useId()
	const figureRef = useRef<HTMLElement>(null)
	const [hovered, setHovered] = useState<number | null>(null)
	const [pinned, setPinned] = useState<number | null>(null)
	const [focused, setFocused] = useState<number | null>(null)
	const tooltipId = `${id}-tooltip`
	const updatePointer = (
		element: HTMLButtonElement,
		clientX: number,
		clientY: number
	) => {
		const rect = element.parentElement?.getBoundingClientRect()
		if (rect) setPointer({ x: clientX - rect.left, y: clientY - rect.top })
	}

	const dismiss = () => {
		setHovered(null)
		setPinned(null)
		setFocused(null)
	}

	useEffect(() => {
		const handleOutsidePress = (event: PointerEvent) => {
			if (!figureRef.current?.contains(event.target as Node)) {
				setHovered(null)
				setPinned(null)
				setFocused(null)
			}
		}
		document.addEventListener("pointerdown", handleOutsidePress)
		return () =>
			document.removeEventListener("pointerdown", handleOutsidePress)
	}, [])

	const gradientId = `${id}-gradient`
	const captionId = `${id}-caption`
	const matches = [...data]
		.sort((a, b) => a.date.localeCompare(b.date))
		.slice(-5)

	const width = bounds.width > 0 ? bounds.width : INITIAL_SIZE.width
	const height = bounds.height > 0 ? bounds.height : INITIAL_SIZE.height
	const bottom = height - MARGIN.bottom
	const xScale = d3
		.scalePoint<string>()
		.domain(matches.map((match) => match.date))
		.range([MARGIN.left, width - MARGIN.right])
	const yScale = d3.scaleLinear().domain([0, 100]).range([bottom, MARGIN.top])
	const x = (match: MatchData) => xScale(match.date) ?? MARGIN.left
	const y = (match: MatchData) => yScale(match.impliedWinProbabilityPerc)
	const line = d3.line<MatchData>().x(x).y(y).curve(d3.curveMonotoneX)(
		matches
	)

	const area = d3
		.area<MatchData>()
		.x(x)
		.y0(bottom)
		.y1(y)
		.curve(d3.curveMonotoneX)(matches)

	const activeIndex = hovered ?? focused ?? pinned
	const activeMatch = activeIndex === null ? undefined : matches[activeIndex]
	const anchor = pointer ?? {
		x: activeMatch ? x(activeMatch) : 0,
		y: activeMatch ? y(activeMatch) : 0,
	}
	const tooltipWidth = tooltipBounds.width || Math.min(224, width - 16)
	const tooltipHeight = tooltipBounds.height || 150
	const offset = 14
	const tooltipLeft = Math.max(
		8,
		Math.min(
			anchor.x + offset + tooltipWidth <= width - 8
				? anchor.x + offset
				: anchor.x - tooltipWidth - offset,
			width - tooltipWidth - 8
		)
	)
	const tooltipTop = Math.max(
		8,
		Math.min(
			anchor.y + offset + tooltipHeight <= height - 8
				? anchor.y + offset
				: anchor.y - tooltipHeight - offset,
			height - tooltipHeight - 8
		)
	)

	return (
		<figure
			ref={figureRef}
			className="space-y-4"
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					dismiss()
					event.stopPropagation()
				}
			}}
		>
			<div
				ref={ref}
				className="relative h-80 w-full"
				onPointerLeave={() => setHovered(null)}
			>
				{matches.length ? (
					<svg
						role="img"
						aria-label="Manchester City pre-match win probability"
						aria-describedby={captionId}
						viewBox={`0 0 ${width} ${height}`}
						className="size-full"
					>
						<text
							x={MARGIN.left}
							y={16}
							className="fill-body-copy text-xs"
						>
							Implied win probability (%)
						</text>
						<g aria-label="Y axis: probability from 0 to 100 percent">
							{[0, 25, 50, 75, 100].map((tick) => (
								<g key={tick}>
									<line
										x1={MARGIN.left}
										x2={width - MARGIN.right}
										y1={yScale(tick)}
										y2={yScale(tick)}
										className="stroke-preview-border"
										strokeDasharray="3 4"
									/>
									<text
										x={MARGIN.left - 10}
										y={yScale(tick)}
										dy="0.35em"
										textAnchor="end"
										className="fill-metadata text-micro"
									>
										{tick}%
									</text>
								</g>
							))}
						</g>
						<path
							d={area ?? undefined}
							fill={`url(#${gradientId})`}
						/>
						<path
							d={line ?? undefined}
							fill="none"
							className="stroke-primary"
							strokeWidth={2.5}
							strokeLinecap="round"
							strokeLinejoin="round"
							vectorEffect="non-scaling-stroke"
						/>
						{activeMatch && (
							<line
								x1={x(activeMatch)}
								x2={x(activeMatch)}
								y1={MARGIN.top}
								y2={bottom}
								className="stroke-primary"
								strokeDasharray="4 4"
								strokeOpacity={0.45}
								aria-hidden="true"
							/>
						)}
						{matches.map((match) => (
							<circle
								key={match.date}
								cx={x(match)}
								cy={y(match)}
								r={activeMatch?.date === match.date ? 5 : 3.5}
								className="stroke-primary fill-white"
								strokeWidth={2}
							></circle>
						))}
						<g aria-label="X axis: match date, oldest to newest">
							{matches.map((match) => (
								<text
									key={match.date}
									x={x(match)}
									y={bottom + 18}
									textAnchor="middle"
									className="fill-body-copy text-micro"
								>
									<tspan x={x(match)}>
										{formatDate(parseISO(match.date), "dd")}
									</tspan>
									<tspan x={x(match)} dy={13}>
										{formatDate(
											parseISO(match.date),
											"MMM"
										)}
									</tspan>
								</text>
							))}
							<text
								x={(MARGIN.left + width - MARGIN.right) / 2}
								y={height - 5}
								textAnchor="middle"
								className="fill-body-copy text-xs"
							>
								Match date
							</text>
						</g>
						<defs>
							<linearGradient
								id={gradientId}
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									stopColor="var(--primary)"
									stopOpacity={0.25}
								/>
								<stop
									offset="1"
									stopColor="var(--primary)"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
					</svg>
				) : (
					<p className="text-body-copy text-sm">
						No match data available.
					</p>
				)}
				{matches.map((match, index) => {
					const left =
						index === 0
							? MARGIN.left - 20
							: (x(matches[index - 1]) + x(match)) / 2
					const right =
						index === matches.length - 1
							? width - 4
							: (x(match) + x(matches[index + 1])) / 2
					return (
						<button
							key={match.date}
							type="button"
							className="focus-visible:outline-primary absolute z-10 cursor-crosshair rounded-md bg-transparent focus-visible:outline-2 focus-visible:outline-offset-0"
							style={{
								left: `${(left / width) * 100}%`,
								width: `${((right - left) / width) * 100}%`,
								top: MARGIN.top,
								height: bottom - MARGIN.top,
							}}
							aria-label={`${formatDate(parseISO(match.date), "dd MMM yyyy")}, ${match.opponent}, win probability ${match.impliedWinProbabilityPerc}%, result ${match.actualResult}`}
							aria-pressed={pinned === index}
							aria-describedby={
								activeIndex === index ? tooltipId : undefined
							}
							onPointerEnter={(event) => {
								if (event.pointerType !== "touch") {
									updatePointer(
										event.currentTarget,
										event.clientX,
										event.clientY
									)
									setHovered(index)
								}
							}}
							onPointerMove={(event) => {
								if (event.pointerType !== "touch") {
									updatePointer(
										event.currentTarget,
										event.clientX,
										event.clientY
									)
									setHovered(index)
								}
							}}
							onClick={(event) => {
								if (event.detail > 0)
									updatePointer(
										event.currentTarget,
										event.clientX,
										event.clientY
									)
								setFocused(null)
								setHovered(null)
								setPinned((current) =>
									current === index ? null : index
								)
							}}
							onFocus={(event) => {
								if (
									event.currentTarget.matches(
										":focus-visible"
									)
								) {
									setPointer(null)
									setFocused(index)
								}
							}}
							onBlur={() => setFocused(null)}
							onKeyDown={(event) => {
								if (
									event.key === "ArrowRight" ||
									event.key === "ArrowLeft"
								) {
									event.preventDefault()
									const next =
										event.key === "ArrowRight"
											? event.currentTarget
													.nextElementSibling
											: event.currentTarget
													.previousElementSibling
									if (next instanceof HTMLButtonElement)
										next.focus()
								}
							}}
						/>
					)
				})}
				{activeMatch && (
					<div
						id={tooltipId}
						role="tooltip"
						ref={tooltipRef}
						className="border-preview-border text-body-copy pointer-events-none absolute z-20 w-56 rounded-xl border bg-white p-3 text-xs shadow-lg"
						style={{
							left: tooltipLeft,
							top: tooltipTop,
							maxWidth: Math.max(0, width - 16),
						}}
					>
						<p className="text-micro text-metadata">
							{formatDate(
								parseISO(activeMatch.date),
								"dd MMM yyyy"
							)}{" "}
							· {activeMatch.competition}
						</p>
						<p className="mt-1 font-medium text-mist-700">
							Manchester City vs {activeMatch.opponent}
						</p>
						<dl className="mt-3 space-y-1">
							<div className="flex justify-between gap-3">
								<dt>Win probability</dt>
								<dd className="font-semibold text-mist-700">
									{activeMatch.impliedWinProbabilityPerc}%
								</dd>
							</div>
							<div className="flex justify-between gap-3">
								<dt>Result</dt>
								<dd>{activeMatch.actualResult}</dd>
							</div>
						</dl>
					</div>
				)}
			</div>
			<figcaption
				id={captionId}
				className="text-body-copy text-xs leading-relaxed"
			>
				{matches.length > 0 && (
					<>
						Manchester City’s implied win probability before each
						match ({formatDate(parseISO(matches[0].date), "d MMM")}–
						{formatDate(
							parseISO(matches[matches.length - 1].date),
							"d MMM yyyy"
						)}
						).
					</>
				)}
			</figcaption>
		</figure>
	)
}
