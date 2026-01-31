import useMeasure from "react-use-measure";
import * as d3 from "d3";
import { formatDate } from "date-fns";

type MatchData = {
    date: string;
    opponent: string;
    competition: string;
    moneylineOdds: string;
    impliedWinProbabilityPerc: number;
    actualResult: string;
};

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
    {
        date: "2025-11-9",
        opponent: "Liverpool (H)",
        competition: "Premier League",
        moneylineOdds: "-107 to 9/10 (Fractional)",
        impliedWinProbabilityPerc: 52.2,
        actualResult: "Win (3-0)",
    },
    {
        date: "2025-11-5",
        opponent: "Dortmund (H)",
        competition: "Champions League",
        moneylineOdds: "-333 (Estimate)",
        impliedWinProbabilityPerc: 77,
        actualResult: "Win (4-1)",
    },
    {
        date: "2025-11-2",
        opponent: "Bournemouth (H)",
        competition: "Premier League",
        moneylineOdds: "-500 (Estimate)",
        impliedWinProbabilityPerc: 83.3,
        actualResult: "Win (3-1)",
    },
    {
        date: "2025-10-29",
        opponent: "Swansea (A)",
        competition: "League Cup",
        moneylineOdds: "-400 (Estimate)",
        impliedWinProbabilityPerc: 80,
        actualResult: "Win (3-1)",
    },
    {
        date: "2025-10-26",
        opponent: "Aston Villa (A)",
        competition: "Premier League",
        moneylineOdds: "-133 (Estimate)",
        impliedWinProbabilityPerc: 57.1,
        actualResult: "Loss (0-1)",
    },
    {
        date: "2025-10-21",
        opponent: "Villarreal (A)",
        competition: "Champions League",
        moneylineOdds: "-200 (Estimate)",
        impliedWinProbabilityPerc: 66.7,
        actualResult: "Win (2-0)",
    },
    {
        date: "2025-10-18",
        opponent: "Everton (H)",
        competition: "Premier League",
        moneylineOdds: "-450 (Estimate)",
        impliedWinProbabilityPerc: 81.8,
        actualResult: "Win (2-0)",
    },
].reverse();

const MARGIN = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 10,
};

export function Chart({ data }: { readonly data: MatchData[] }) {
    const [ref, { width, height }] = useMeasure();

    const xScale = d3
        .scaleBand<Date>()
        .domain(data.map((d) => new Date(d.date)))
        .range([MARGIN.left, width - MARGIN.right]);

    const yScale = d3
        .scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.impliedWinProbabilityPerc))])
        .range([height - MARGIN.bottom, MARGIN.top]);

    const area = d3
        .area<(typeof data)[number]>()
        .x((d) => xScale(new Date(d.date)) ?? 0)
        .y0(height - MARGIN.bottom)
        .y1((d) => yScale(d.impliedWinProbabilityPerc));

    const areaPathData = area(data);
    const line = d3
        .line<(typeof data)[number]>()
        .x((d) => xScale(new Date(d.date)) ?? 0)
        .y((d) => yScale(d.impliedWinProbabilityPerc));

    const d = line(data);

    if (!areaPathData || !d) {
        return null;
    }

    return (
        <div ref={ref} className="h-80 w-full">
            <div className="h-full w-full p-2 sm:p-8">
                <svg
                    role="img"
                    aria-label="chart"
                    viewBox={`0 0 ${width} ${height}`}
                    className="h-full w-full"
                >
                    <g aria-label="y-axis">
                        {yScale.ticks(4).map((tick) => (
                            <line
                                key={`grid-line-${tick}`}
                                x1={MARGIN.left}
                                y1={yScale(tick) - MARGIN.bottom}
                                x2={width - MARGIN.right}
                                y2={yScale(tick) - MARGIN.bottom}
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="1.1"
                                className="fill-gray-300"
                            />
                        ))}
                    </g>
                    <g aria-label="x-axis">
                        {data.map((d) => (
                            <>
                                <line
                                    key={`grid-line-${d.date}`}
                                    x1={xScale(new Date(d.date)) ?? 0}
                                    y1={height - 2 * MARGIN.bottom}
                                    x2={xScale(new Date(d.date)) ?? 0}
                                    y2={height - MARGIN.bottom}
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="fill-gray-300"
                                />

                                <text
                                    key={d.date}
                                    x={
                                        (xScale(new Date(d.date)) ?? 0) +
                                        xScale.bandwidth() / 2
                                    }
                                    y={height - MARGIN.bottom + 16}
                                    fontSize="12"
                                    textAnchor="middle"
                                >
                                    {formatDate(d.date, "dd MMM")}
                                </text>
                            </>
                        ))}
                    </g>

                    <path
                        d={d}
                        fill="none"
                        stroke="var(--color-blue-600)"
                        strokeWidth={2}
                    />

                    <path
                        d={areaPathData}
                        fill="url(#gradient-color)"
                        fillOpacity={0.3}
                        vectorEffect="non-scaling-stroke"
                    />

                    <defs>
                        <linearGradient
                            id="gradient-color"
                            x1="183"
                            y1="51.3741"
                            x2="183"
                            y2="211.205"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="var(--color-blue-500)"></stop>
                            <stop
                                offset="1"
                                stop-color="var(--color-blue-500)"
                                stop-opacity="0"
                            ></stop>
                        </linearGradient>
                        <linearGradient
                            id="gradient-grayscale"
                            x1="183"
                            y1="51.3741"
                            x2="183"
                            y2="211.205"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="var(--color-gray-200)"></stop>
                            <stop
                                offset="1"
                                stop-color="var(--color-gray-200)"
                                stop-opacity="0"
                            ></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
