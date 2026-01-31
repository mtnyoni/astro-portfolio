import { useState } from "react";

export default function RotatingMenu() {
    const [activeSection, setActiveSection] = useState<string>("");

    const handleMouseEnter = (section: string) => {
        setActiveSection(section);
    };

    const handleMouseLeave = () => {
        setActiveSection("");
    };

    // Determine which border should be highlighted
    const getBorderClass = () => {
        switch (activeSection) {
            case "home":
                return "border-l-4 border-gray-400";
            case "projects":
                return "border-t-4 border-gray-400";
            case "craft":
                return "border-r-4 border-gray-400";
            case "aboutMe":
                return "border-b-4 border-gray-400";
            default:
                return "border-[#2e2e2e]";
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`relative flex h-84 w-full items-center justify-center rounded-full border-4 sm:w-84 ${getBorderClass()}`}
            >
                <div className="relative h-80 w-full overflow-hidden rounded-full sm:w-80">
                    <div
                        className="absolute top-1/2 left-1/2 h-80 w-80 origin-top-left rotate-45 border border-gray-500 bg-[#2e2e2e] p-[calc(20rem/6)]"
                        onMouseEnter={() => handleMouseEnter("projects")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                        >
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                            <path d="M3 12A9 3 0 0 0 21 12" />
                        </svg>
                    </div>

                    <div
                        className="absolute top-1/2 left-1/2 h-80 w-80 origin-top-left rotate-135 border border-gray-500 bg-[#2e2e2e] p-[calc(20rem/6)]"
                        onMouseEnter={() => handleMouseEnter("craft")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                        >
                            <path d="m10.852 14.772-.383.923" />
                            <path d="m10.852 9.228-.383-.923" />
                            <path d="m13.148 14.772.382.924" />
                            <path d="m13.531 8.305-.383.923" />
                            <path d="m14.772 10.852.923-.383" />
                            <path d="m14.772 13.148.923.383" />
                            <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" />
                            <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" />
                            <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" />
                            <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" />
                            <path d="M4.5 10.291A4 4 0 0 0 6 18" />
                            <path d="M6.002 5.125a3 3 0 0 0 .4 1.375" />
                            <path d="m9.228 10.852-.923-.383" />
                            <path d="m9.228 13.148-.923.383" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>

                    <div
                        className="absolute top-1/2 left-1/2 h-80 w-80 origin-top-left rotate-225 border border-gray-500 bg-[#2e2e2e] p-[calc(20rem/6)]"
                        onMouseEnter={() => handleMouseEnter("aboutMe")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                        </svg>
                    </div>

                    <div
                        className="absolute top-1/2 left-1/2 h-80 w-80 origin-top-left rotate-315 border border-gray-500 bg-[#2e2e2e] p-[calc(20rem/6)]"
                        onMouseEnter={() => handleMouseEnter("home")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                        >
                            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                    </div>

                    <div className="absolute top-1/2 left-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[hsla(0,0%,100%,0.1)] bg-[#1c1c1c]">
                        <span className="px-2 text-center text-white capitalize">
                            {activeSection === "home"
                                ? "home"
                                : activeSection === "projects"
                                  ? "projects"
                                  : activeSection === "craft"
                                    ? "craft"
                                    : activeSection === "aboutMe"
                                      ? "about me"
                                      : ""}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
