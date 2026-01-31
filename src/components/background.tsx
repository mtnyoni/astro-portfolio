import { useMediaQuery } from "@hooks/use-media-query";

export function Background() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <svg
            className="fixed inset-0 -z-20 h-full w-full"
            viewBox={`0 0 ${isMobile ? 6 : 12} 1`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {[...Array(isMobile ? 6 : 13)].map((_, i) => (
                <line
                    key={i}
                    x1={i}
                    x2={i}
                    y1="0"
                    y2="1"
                    stroke="#E7E7E7"
                    strokeWidth={isMobile ? "0.01" : "0.005"}
                />
            ))}
        </svg>
    );
}
