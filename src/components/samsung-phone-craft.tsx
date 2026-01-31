import { cn } from "@utils/utils";
import {
    BatteryIcon,
    ChartNoAxesColumnIncreasingIcon,
    CornerUpLeftIcon,
    PauseIcon,
    PlusCircleIcon,
    ScreenShareIcon,
    ShuffleIcon,
    SkipBackIcon,
    SkipForwardIcon,
    VideoIcon,
    WifiIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Progress } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";

function SamsungPhone() {
    const [open, setOpen] = useState(false);

    return (
        <section className="relative my-[1dvh] h-[85dvh] max-w-sm rounded-3xl border-10 border-gray-900 bg-white sm:mx-auto">
            <header className="mt-1 flex h-8 items-center justify-between gap-2 px-2 text-gray-700">
                <div className="flex items-center gap-2">
                    <div className="font-bold">18:42</div>
                    <NotificationPanel open={open} setOpen={setOpen} />
                    {open ? (
                        <>
                            <VideoIcon className="w-4" />
                            <ScreenShareIcon className="w-3.5" />
                        </>
                    ) : (
                        <div className="size-1.5 rounded-full bg-green-500" />
                    )}
                </div>
                <div
                    aria-label="camera"
                    className="absolute left-1/2 flex justify-center"
                >
                    <div className="grid size-4 place-items-center rounded-full bg-black">
                        <div className="size-2 rounded-full bg-gray-900" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <WifiIcon className="size-4" />
                    <ChartNoAxesColumnIncreasingIcon className="size-4" />
                    <BatteryIcon className="size-4" />
                </div>
            </header>
        </section>
    );
}

function NotificationPanel({
    open,
    setOpen,
}: {
    readonly open: boolean;
    readonly setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [selected, setSelected] = useState<"soccer" | "spotify">("soccer");
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!panelRef.current) return;

            if (open && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open, setOpen]);

    return (
        <div ref={panelRef}>
            {!open && (
                <div className="relative flex items-center">
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="z-20 inline-flex cursor-pointer items-center justify-between gap-1 rounded-full bg-slate-200 px-1.5 py-0.5"
                    >
                        <RealBetisIcon className="size-3" />
                        <span className="text-sm font-medium">1 - 5</span>
                        <BarcelonaIcon className="size-3" />
                    </button>
                </div>
            )}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transformOrigin: "top left",
                        }}
                        exit={{ opacity: 0, y: -10, scale: 0.4 }}
                        className="absolute top-9 isolate z-20 -ml-13.5 w-[calc(100%-0.6rem)] sm:w-89"
                    >
                        <GoogleSoccerScores
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <SpotifyNotification
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SpotifyNotification({
    selected,
    setSelected,
}: {
    selected: "spotify" | "soccer";
    setSelected: React.Dispatch<React.SetStateAction<"spotify" | "soccer">>;
}) {
    return (
        <motion.button
            layout
            drag="y"
            dragSnapToOrigin
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
            dragElastic={0.5}
            onDrag={(_, info) => {
                if (selected === "spotify" && info.point.y > 450) {
                    setSelected("soccer");
                } else if (selected === "soccer" && info.point.y < -450) {
                    setSelected("spotify");
                }
            }}
            className={cn(
                "absolute inset-x-0 top-0 h-40 w-full space-y-1 rounded-4xl border border-gray-300 bg-white px-8 py-2 text-left shadow-lg",
                selected === "spotify" ? "z-20" : "z-0 mt-4 bg-gray-100",
            )}
        >
            <div className="flex items-center gap-2">
                <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                >
                    <title>Spotify</title>
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <div className="text-sm">Phone speaker</div>
            </div>
            <div className="-space-y-1">
                <div className="font-semibold">Faded</div>
                <div className="text-sm">Alan Walker</div>
            </div>
            <div className="mt-2 space-y-0.5">
                <Progress.Root
                    className="relative h-2 w-full rounded-full bg-gray-900"
                    style={{
                        // Fix overflow clipping in Safari
                        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
                        transform: "translateZ(0)",
                    }}
                    value={50}
                >
                    <Progress.Indicator className="h-2 w-1/2 rounded-[inherit] bg-zinc-500" />
                    <div
                        aria-label="nob"
                        className="absolute top-1/2 size-4 rounded-full border border-white bg-black"
                        style={{
                            left: `50%`,
                            transform: `translate(-50%, -50%)`,
                        }}
                    />
                </Progress.Root>
                <div className="flex items-center justify-between">
                    <div className="text-xs">01:16</div>
                    <div className="text-xs">03:32</div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-8">
                <ShuffleIcon className="size-4" />
                <SkipBackIcon className="size-4" />{" "}
                <PauseIcon className="size-4" />
                <SkipForwardIcon className="size-4" />
                <PlusCircleIcon className="size-4" />
            </div>
        </motion.button>
    );
}

function GoogleSoccerScores({
    selected,
    setSelected,
}: {
    selected: "spotify" | "soccer";
    setSelected: React.Dispatch<React.SetStateAction<"spotify" | "soccer">>;
}) {
    return (
        <motion.button
            layout
            drag="y"
            dragSnapToOrigin
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
            dragElastic={0.5}
            onDrag={(_, info) => {
                if (selected === "soccer" && info.point.y > 450) {
                    setSelected("spotify");
                } else if (selected === "spotify" && info.point.y < -450) {
                    setSelected("soccer");
                }
            }}
            className={cn(
                "absolute inset-x-0 top-0 h-40 w-full rounded-4xl border border-gray-300 bg-white py-2 shadow-lg",
                selected === "soccer" ? "z-20" : "z-0 mt-4 bg-gray-100",
            )}
        >
            <div className="text-center text-sm">Google</div>
            <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center">
                    <div className="flex flex-col items-center justify-center px-6">
                        <RealBetisIcon className="size-6" />
                        <div>RBB</div>
                    </div>
                    <div className="text-2xl font-black">1</div>
                </div>
                <span>59'</span>
                <div className="flex items-center">
                    <div className="text-2xl font-black">5</div>
                    <div className="flex flex-col items-center justify-center px-6">
                        <BarcelonaIcon className="size-6" />
                        <div>BAR</div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm">
                <div>Possession: RBB(30%), BAR(70%)</div>
                <div>Shots: RBB(10), BAR(20)</div>
            </div>
        </motion.button>
    );
}

export function BarcelonaIcon({ className }: { readonly className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="170.81"
            height="169.87"
            viewBox="0 0 170.81 169.87"
            className={className}
        >
            <title>FC Barcelona logo - Brandlogos.net</title>
            <path
                d="M585.07,518.47c.2,1.84.09,1.78.22,2.86,2.23,41-26.84,60.34-62,61.78C517.93,588,512,592.37,512,592.37s-5.94-4.33-11.32-9.25c-35.14-1.43-64.22-20.79-62-61.78.13-1.08,0-1,.21-2.86-2-2.09-5.35-5.51-7.11-7.23,12.6-12.84,27.31-42.24,6.9-68.88,1.34-2.12,2.31-2.82,4.31-5.61A41.43,41.43,0,0,0,456.2,439c11.7,0,19.69-1.13,29.52-7.54,7.77,5.3,16.19,8.61,26.28,8.61s18.52-3.31,26.28-8.61c9.82,6.41,17.82,7.54,29.52,7.54A41.43,41.43,0,0,0,581,436.75c2,2.79,3,3.49,4.31,5.61-20.41,26.64-5.7,56,6.9,68.88-1.76,1.72-5.09,5.14-7.11,7.23m12.33-7.18-2.54-2.59c-10.82-11-26.13-38.64-6.61-64.14l1.53-2-1.34-2.12a25.52,25.52,0,0,0-2.31-3.08c-.62-.75-1.25-1.51-2.11-2.7l-1.61-2.25-2.65.9a37.67,37.67,0,0,1-12,2.06c-11.16,0-18.47-1.08-27.47-6.92l-2.11-1.38-2.07,1.42c-8,5.42-15.63,8-24.15,8s-16.2-2.53-24.16-8l-2.07-1.42-2.1,1.38c-9,5.84-16.32,6.92-27.47,6.92a37.64,37.64,0,0,1-12-2.06l-2.65-.9L440,434.65c-.86,1.2-1.49,2-2.1,2.7a26.19,26.19,0,0,0-2.32,3.09l-1.35,2.13,1.54,2c19.53,25.5,4.22,53.12-6.6,64.14l-2.54,2.59,2.58,2.55c1.4,1.34,3.87,3.87,5.9,6,0,.13,0,.24,0,.34a7.23,7.23,0,0,1-.06.76l0,.23c-1,18.4,3.88,33.53,14.51,45,11.26,12.16,28.86,19.43,49.67,20.55,5.16,4.62,10.39,8.43,10.63,8.6l2.22,1.64,2.21-1.64c.24-.17,5.44-4,10.6-8.6,20.81-1.13,38.41-8.4,49.67-20.55,10.63-11.48,15.5-26.61,14.51-45l0-.23a6,6,0,0,1-.06-.76c0-.1,0-.21,0-.34,2-2.1,4.5-4.62,5.9-6Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#010305" }}
            />
            <path
                d="M512,592.37a146.17,146.17,0,0,1-11.32-9.26c-35.13-1.43-64.22-20.79-62-61.78.13-1.08,0-1,.21-2.86-2-2.08-5.35-5.51-7.11-7.22,12.6-12.85,27.32-42.24,6.9-68.88,1.33-2.13,2.3-2.83,4.31-5.62A41.3,41.3,0,0,0,456.2,439c11.71,0,19.7-1.14,29.53-7.53,7.76,5.29,16.19,8.61,26.27,8.61s18.52-3.32,26.29-8.61c9.82,6.39,17.81,7.53,29.51,7.53A41.36,41.36,0,0,0,581,436.75c2,2.79,3,3.49,4.3,5.62-20.4,26.64-5.7,56,6.9,68.88-1.77,1.71-5.1,5.14-7.11,7.22.19,1.85.07,1.79.21,2.86,2.22,41-26.84,60.34-62,61.78C517.94,588,512,592.37,512,592.37"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#edc23d" }}
            />
            <path
                d="M463.87,519.43h-18.5c-.09,1.17-.18,1.25-.31,2.41-1.07,20.7,6.32,34.85,18.8,43.63Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#003b7f" }}
            />
            <path
                d="M463.86,565.47a59.65,59.65,0,0,0,19.41,8.65V519.43H463.86Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#a20748" }}
            />
            <path
                d="M483.26,574.12a94.47,94.47,0,0,0,19.41,2.8V519.43H483.26Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#003b7f" }}
            />
            <path
                d="M522.07,519.43H502.66v57.48l.67,0c6.45,0,12.3.07,17.35,0l1.39-.06Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#a20748" }}
            />
            <path
                d="M522.07,576.88a92.74,92.74,0,0,0,19.41-3V519.43H522.07Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#003b7f" }}
            />
            <path
                d="M541.46,573.92a58.48,58.48,0,0,0,19.41-9v-45.5H541.46Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#a20748" }}
            />
            <path
                d="M578.63,519.43H560.86V565c12-8.82,19.12-22.81,18.08-43.1-.14-1.17-.22-1.24-.32-2.41"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#003b7f" }}
            />
            <path
                d="M445.88,520c0,.35-.08.58-.11.83s-.09.57-.14,1.07c-.81,15.43,3.11,27.92,11.62,37.09,9.81,10.57,25.73,16.58,46.09,17.42h.6c3.5,0,6.8,0,9.91,0,2.62,0,4.85,0,6.81,0,20.34-.83,36.28-6.85,46.08-17.42,8.52-9.17,12.43-21.66,11.62-37.12,0-.48-.09-.78-.14-1s-.08-.49-.12-.83Zm68,57.55q-4.67,0-9.92,0h-.6c-20.68-.83-36.9-7-46.9-17.76-8.72-9.39-12.73-22.15-11.92-37.91.06-.57.11-.88.16-1.16s.11-.64.15-1.27l0-.51H579.14l.05.51c0,.62.09.92.14,1.27s.1.58.14,1.13c.83,15.79-3.17,28.55-11.9,37.94-10,10.79-26.2,16.93-46.86,17.76-2,0-4.23,0-6.85,0"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#010305" }}
            />
            <path
                d="M493.33,547.41a18.6,18.6,0,1,1,18.59,18.26,18.44,18.44,0,0,1-18.59-18.26"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#edc23d" }}
            />
            <path
                d="M493.92,547.41a18,18,0,1,1,18,17.69A17.85,17.85,0,0,1,493.92,547.41Z"
                transform="translate(-426.6 -427.07)"
                style={{
                    fill: "none",
                    stroke: "#010305",
                    strokeMiterlimit: 3.864000082015991,
                    strokeWidth: "0.11100000143051147px",
                }}
            />
            <path
                d="M529.41,549c-1-3.57-4.6-7.52-8-9.4-4.24-2.32-8.89-3.6-10.93-.42a5.55,5.55,0,0,0,1.48,7.6c4-2.73,7.26-.08,8.19,2.12a5.71,5.71,0,0,1,.49,2c2.38-.82,6.25-.29,7.44,3.36a16.66,16.66,0,0,0,1.36-5.25m-18-1.34a6.58,6.58,0,0,1-1.84-9,5.51,5.51,0,0,1,1.32-1.41,4.73,4.73,0,0,1-.48-7,17.75,17.75,0,0,0-8.22,2.85c-.77,3.24-1.75,6.2-1.7,9.58.06,4.56,2,8.27,6.05,8.79,1.9.23,4.65-1.75,4.86-3.77m.49-11c2.91-1.18,6.93.36,10,2a20.08,20.08,0,0,1,7.57,7.66,17.41,17.41,0,0,0-17.37-16.19,3.76,3.76,0,0,0-.19,6.49m-11.12,24.06c3.67,0,9.3-.87,12.52-2.77,4.17-2.44,7.41-5.05,5.87-8.67-.77-1.82-3.36-3.93-6.71-1.6-.22,2.7-3.61,5.08-6,4.77a7.4,7.4,0,0,1-3.13-1.09,7.56,7.56,0,0,1-6.71,3.6h-.43a17.62,17.62,0,0,0,4.63,5.77M520.51,552c-.58,2.89-3.72,5-6.69,6.78s-8,2.72-11.68,2.88a17.74,17.74,0,0,0,25.17-6c-.51-4.26-4.64-4.76-6.8-3.69m-18.07-1.33c-3.37-3-3.38-9.13-2.47-13.19.25-1.14.57-2.24.9-3.51a17.09,17.09,0,0,0-6.5,13.39,16.78,16.78,0,0,0,1.28,6.46,5.76,5.76,0,0,0,.92.06,6.51,6.51,0,0,0,5.87-3.21m9.49-21.59a18.27,18.27,0,1,1-18.59,18.27,18.44,18.44,0,0,1,18.59-18.27"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#010305" }}
            />
            <path
                d="M529.89,505.26h4.27c1.16,0,1.7-.43,1.7-1.36,0-.69-.23-1.39-1.87-1.39h-4.1Zm0,7.24h4.29c1.46,0,2.22-.67,2.22-2s-.7-1.94-2.22-1.94h-4.29Zm4.17,3.56h-7.88V499h8c3.48,0,5.57,1.72,5.57,4.59a3.85,3.85,0,0,1-1.6,3.21,4,4,0,0,1,2.17,3.67c0,3.48-2.33,5.56-6.22,5.56"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#010305" }}
            />
            <path
                d="M510.63,516.31c-4.61,0-7.6-3.44-7.6-8.77,0-5.16,3.17-8.78,7.72-8.78a6.63,6.63,0,0,1,6.37,3.8l.1.18-3.51,1.59-.1-.17a3,3,0,0,0-2.9-1.7c-2.34,0-3.79,2-3.79,5.08s1.53,5.07,3.81,5.07c1.4,0,2.25-.55,3.13-2l.1-.16,3.19,1.85-.08.17a6.69,6.69,0,0,1-6.45,3.86"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#010305" }}
            />
            <polygon
                points="60.78 88.98 56.99 88.98 56.99 71.96 69.51 71.96 69.51 75.61 60.78 75.61 60.78 78.34 65.88 78.34 65.88 81.96 60.78 81.96 60.78 88.98"
                style={{ fill: "#010305" }}
            />
            <path
                d="M449.8,495.54c6.41-14.41,8.78-32.93-2-51a48.77,48.77,0,0,0,8.38.76c11,0,19.68-1,29.43-6.39a50.27,50.27,0,0,0,52.74,0c9.75,5.41,18.41,6.39,29.43,6.39a45.42,45.42,0,0,0,8.41-.8c-10.8,18.13-8.41,36.65-2,51.06Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#fff" }}
            />
            <path
                d="M511.43,446.35v49.19h6.65V446a49.78,49.78,0,0,1-6.11.36h-.55"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#fedc07" }}
            />
            <path
                d="M518.09,495.54h6.65V444.71a48.46,48.46,0,0,1-6.65,1.28Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#e21239" }}
            />
            <path
                d="M524.74,495.54h6.65V442.43a51.42,51.42,0,0,1-6.65,2.28Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#fedc07" }}
            />
            <path
                d="M531.39,495.54H538V439.08a56.57,56.57,0,0,1-6.65,3.35Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#e21239" }}
            />
            <path
                d="M538,439.08v56.46h6.65v-53.7a50.8,50.8,0,0,1-6.32-2.94c-.1.07-.22.12-.33.18"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#fedc07" }}
            />
            <path
                d="M544.69,495.54h6.65v-51.7a44.48,44.48,0,0,1-6.65-2Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#e21239" }}
            />
            <path
                d="M551.34,495.54H558V444.87a55,55,0,0,1-6.65-1Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#fedc07" }}
            />
            <path
                d="M558,495.46h6.66V445.16c-2.3,0-4.51-.16-6.66-.36Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#e21239" }}
            />
            <path
                d="M575.7,444.56a44.69,44.69,0,0,1-7.9.73c-1.06,0-2.12,0-3.15,0v50.29h9.54c-6.29-14.18-8.67-32.34,1.51-50.18Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#fedc07" }}
            />
            <path
                d="M473.53,478.86v16.68H492V478.86h19.72V460.68H492v-18.5a55.11,55.11,0,0,1-6.42-3.3,47.3,47.3,0,0,1-12.1,4.76v17H454.18a52.37,52.37,0,0,1,.51,18.18Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#e21239" }}
            />
            <path
                d="M573.35,495h-61V446.9a51.14,51.14,0,0,0,26.06-7.37c9.62,5.27,18.09,6.3,29.41,6.3a45.91,45.91,0,0,0,7.33-.6c-10.84,19.07-7.1,37.42-1.77,49.76M448.89,445.25a48.67,48.67,0,0,0,7.31.57c11.32,0,19.8-1,29.41-6.3a51.06,51.06,0,0,0,25.59,7.37V495H450.65c5.31-12.34,9.06-30.69-1.77-49.74m128.42-1.54-1.21.23a45.23,45.23,0,0,1-8.3.8c-11.25,0-19.62-1-29.14-6.32l-.29-.16-.28.17a49.71,49.71,0,0,1-52.18,0l-.27-.17-.29.16c-9.53,5.28-17.9,6.32-29.15,6.32a48.62,48.62,0,0,1-8.28-.75l-1.18-.22.6,1c11.54,19.4,7.42,38.17,1.94,50.52l-.34.77H575l-.35-.77c-5.47-12.34-9.58-31.13,2-50.56Z"
                transform="translate(-426.6 -427.07)"
                style={{ fill: "#010305" }}
            />
        </svg>
    );
}

export function RealBetisIcon({ className }: { readonly className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="178.66"
            height="146.67"
            viewBox="0 0 178.66 146.67"
            className={className}
        >
            <title>Real Betis logo - Brandlogos.net</title>
            <path
                d="M535.16,496.65a33.23,33.23,0,0,0-46.32,0H422.67L512,585.34l89.33-88.69Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#de9500" }}
            />
            <path
                d="M512,490.35a30.18,30.18,0,1,1-30.18,30.19A30.22,30.22,0,0,1,512,490.35"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#fff" }}
            />
            <path
                d="M498.06,514.68h2.5V510.9h-2.5v-4.56h7.31v12.47h-7.31v-4.13m0,16.43h2.5v-3.78h-2.5v-4h7.31v12.13h-7.31Zm20.47,4.31h-8.86V523.28h1.72v1.29h2.49v-1.29h3.53c1,0,1.11,1.74,1.11,1.74v10.39Zm0-19.15v.57s-.22,1.95-1.49,2h-3.14v-1.63H511.4v1.63h-1.72V506.34h8.86v9.92Zm10.9,15.19c-.22.65-1.39,3.93-2.64,3.93a.51.51,0,0,0-.15,0H522.4V524.83h0a5.67,5.67,0,0,0-.4-1.55h4.4a4.75,4.75,0,0,1,3.24,4.73h-2.83v3.44Zm.2-16.86h0s-1.55,4.2-2.9,4.2h-4.9a4.9,4.9,0,0,0,.58-2V506.34h4.1a5,5,0,0,1,3.12,4.81h-2.83v3.44h2.83Zm6.63-3.44h-2.56s-.53-6.8-5.62-9h-5.47V502c0-5.48-4-6.61-6.95-6.61a6.64,6.64,0,0,0-4.29,1.23v4s.07-1.39,3.86-1.39c4.22,0,3.39,3,3.39,3h-8.95v-2.41c0-4.09-2.07-5.16-4.49-5.16h-1.7v4.39h1a.82.82,0,0,1,.86.87v2.32H491.61v4.21h3v4.56h-3v3.79h3v4.13h-3v4.47h3v4h-3v3.78h3v4.31h-3v3.79h13.55v1.07a.57.57,0,0,1-.65.64h-1.37v4.39h2.74a4,4,0,0,0,3.7-4V539.2h9c0,2-1,3-3.8,3s-3.52-1.33-3.52-1.33v4c.82.91,4.18,1.17,4.18,1.17,6.83,0,7-5.71,7-6.78h6.09s4.32-1.82,4.89-7.75h2.86V528h-2.67c0-.25-.14-5.76-3-7.34,0,0,2.8-1.58,2.82-6.07h2.9Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#00954c" }}
            />
            <polygon
                points="20.12 61.09 20.12 73.58 32.7 86.08 32.7 61.09 20.12 61.09"
                style={{ fill: "#00954c" }}
            />
            <polygon
                points="20.12 73.58 20.12 61.09 7.54 61.09 7.54 61.09 20.12 73.58"
                style={{ fill: "#fff" }}
            />
            <path
                d="M478.71,520.54a33.13,33.13,0,0,1,1.83-10.87v-9.91H468v37.48l12.58,12.49V531.42A33.14,33.14,0,0,1,478.71,520.54Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#00954c" }}
            />
            <polygon
                points="45.29 61.09 32.7 61.09 32.7 86.08 45.29 98.57 45.29 61.09"
                style={{ fill: "#fff" }}
            />
            <path
                d="M493.12,547.94v14.28l12.58,12.49V553.23A33.11,33.11,0,0,1,493.12,547.94Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#00954c" }}
            />
            <path
                d="M480.54,531.42v18.31l12.58,12.49V547.94A33.44,33.44,0,0,1,480.54,531.42Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#fff" }}
            />
            <path
                d="M486,499.76h-5.47v9.91A33.29,33.29,0,0,1,486,499.76Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#fff" }}
            />
            <path
                d="M518.29,553.22v21.49l12.58-12.49V547.94A33.12,33.12,0,0,1,518.29,553.22Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#00954c" }}
            />
            <path
                d="M512,553.82a33.34,33.34,0,0,1-6.29-.6v21.49L512,581l6.29-6.25V553.22A33.36,33.36,0,0,1,512,553.82Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#fff" }}
            />
            <path
                d="M543.46,499.76v9.91a33.25,33.25,0,0,1,0,21.75v18.31L556,537.23V499.76Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#00954c" }}
            />
            <path
                d="M530.88,547.94v14.28l12.58-12.49V531.42A33.45,33.45,0,0,1,530.88,547.94Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#fff" }}
            />
            <path
                d="M538,499.76a33.29,33.29,0,0,1,5.47,9.91v-9.91Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#fff" }}
            />
            <polygon
                points="145.96 86.08 158.54 73.58 158.54 61.09 145.96 61.09 145.96 86.08"
                style={{ fill: "#00954c" }}
            />
            <polygon
                points="145.96 61.09 133.38 61.09 133.38 98.57 145.96 86.08 145.96 61.09"
                style={{ fill: "#fff" }}
            />
            <polygon
                points="171.13 61.09 158.54 61.09 158.54 73.58 171.13 61.09"
                style={{ fill: "#fff" }}
            />
            <path
                d="M508,471.12a3.92,3.92,0,0,1,1.92-3.37v-8.82a39,39,0,0,0-18.52,5.28,11.14,11.14,0,0,0,3.69,5.62,3.87,3.87,0,0,1,1.58-.34,3.93,3.93,0,0,1,1.71,7.46l0,.05a3.1,3.1,0,0,0,5.72-.39,2.64,2.64,0,0,0,.09-.35,1.31,1.31,0,1,1,1.35-.16,3.1,3.1,0,0,0,5.67-.46,3,3,0,0,0,.13-.62,3.93,3.93,0,0,1-3.38-3.89"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#d7013e" }}
            />
            <path
                d="M496.7,477.34a3.93,3.93,0,0,1-3.93-3.93c0-.07,0-.13,0-.2a16.08,16.08,0,0,1-4.85-6.47,17.42,17.42,0,0,0-6.21,10.2,3.88,3.88,0,0,1,1.1-.16,3.92,3.92,0,0,1,2.9,6.56A3.1,3.1,0,0,0,491,481.1a2.89,2.89,0,0,0,0-.36,1.31,1.31,0,1,1,1.23-.59,3.09,3.09,0,0,0,5.16-2.87,4,4,0,0,1-.64.06"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#d7013e" }}
            />
            <path
                d="M516,471.12a3.92,3.92,0,0,0-1.92-3.37v-8.82a39,39,0,0,1,18.52,5.28,11.14,11.14,0,0,1-3.69,5.62,3.87,3.87,0,0,0-1.58-.34,3.93,3.93,0,0,0-1.71,7.46l0,.05a3.1,3.1,0,0,1-5.72-.39,2.64,2.64,0,0,1-.09-.35,1.31,1.31,0,1,0-1.35-.16,3.1,3.1,0,0,1-5.67-.46,3,3,0,0,1-.13-.62,3.93,3.93,0,0,0,3.38-3.89"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#d7013e" }}
            />
            <path
                d="M527.3,477.34a3.93,3.93,0,0,0,3.93-3.93c0-.07,0-.13,0-.2a16.08,16.08,0,0,0,4.85-6.47,17.42,17.42,0,0,1,6.21,10.2,3.88,3.88,0,0,0-1.1-.16,3.92,3.92,0,0,0-2.9,6.56A3.1,3.1,0,0,1,533,481.1a2.89,2.89,0,0,1,0-.36,1.31,1.31,0,1,0-1.23-.59,3.09,3.09,0,0,1-5.16-2.87,4,4,0,0,0,.64.06"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#d7013e" }}
            />
            <path
                d="M550.94,469.54a13.8,13.8,0,0,0-4.56-10.06,18.1,18.1,0,0,0-12.08-4.75c-3.62-5-10.73-8.67-19.15-9.42a3.2,3.2,0,0,0-2.27-3v-.6h1.57v-1.79h-1.57v-1.21h-1.76v1.21h-1.57v1.79h1.57v.6a3.2,3.2,0,0,0-2.27,3c-8.42.75-15.53,4.39-19.15,9.42a18.1,18.1,0,0,0-12.08,4.75,13.8,13.8,0,0,0-4.56,10.06c0,4.05,2.11,7.89,5.9,10.89,0,.09,0,.18,0,.27a3.93,3.93,0,0,0,5.17,3.73,4.24,4.24,0,0,0,3.86,2.29l-.47.33a1.61,1.61,0,0,0-.35,2.21,1.5,1.5,0,0,0,1.31.73,2.07,2.07,0,0,0,.52-.07l2,2.75.4-.29a34.83,34.83,0,0,1,41.18,0l.4.29,2-2.75a2.07,2.07,0,0,0,.52.07,1.5,1.5,0,0,0,1.31-.73,1.61,1.61,0,0,0-.35-2.21l-.47-.33a4.24,4.24,0,0,0,3.86-2.29,3.93,3.93,0,0,0,5.17-3.73c0-.09,0-.18,0-.27C548.82,477.44,550.94,473.6,550.94,469.54ZM494.36,481a3.09,3.09,0,0,1-2.13-.86,1.3,1.3,0,0,0,.21-.72,1.32,1.32,0,1,0-1.44,1.3,3,3,0,0,1,0,.36,3.1,3.1,0,0,1-5.25,2.24,3.92,3.92,0,0,0-2.9-6.56,3.85,3.85,0,0,0-1.1.16,4,4,0,0,0-.48.17c-2.69-2.19-4.18-4.85-4.18-7.56a9.79,9.79,0,0,1,3.28-7.11,13.57,13.57,0,0,1,7.21-3.44,11.9,11.9,0,0,0-.47,3.28,12.28,12.28,0,0,0,.85,4.46,16.07,16.07,0,0,0,4.85,6.47c0,.07,0,.13,0,.2a3.93,3.93,0,0,0,3.93,3.93,4,4,0,0,0,.64-.06,3.19,3.19,0,0,1,.07.63A3.11,3.11,0,0,1,494.36,481Zm17-5.39a3.09,3.09,0,0,1-5.67.46,1.32,1.32,0,1,0-1.35.16,2.8,2.8,0,0,1-.09.35,3.11,3.11,0,0,1-5.72.39l0-.05a3.93,3.93,0,0,0-1.71-7.46,3.88,3.88,0,0,0-1.59.34,11.14,11.14,0,0,1-3.69-5.62,8,8,0,0,1-.24-1.93c0-6.62,8.4-12.27,18.76-12.94v18.41a3.92,3.92,0,0,0,1.46,7.26A3,3,0,0,1,511.32,475.62ZM525.51,477a3.1,3.1,0,0,1-5.72-.39,2.8,2.8,0,0,1-.09-.35,1.31,1.31,0,1,0-1.35-.16,3.08,3.08,0,0,1-5.8-1.08,3.92,3.92,0,0,0,1.46-7.26V449.34c10.36.67,18.76,6.32,18.76,12.94a8,8,0,0,1-.24,1.93,11.14,11.14,0,0,1-3.69,5.62,3.88,3.88,0,0,0-1.59-.34,3.93,3.93,0,0,0-1.71,7.46Zm17.19.11a3.9,3.9,0,0,0-.48-.17,3.85,3.85,0,0,0-1.1-.16,3.92,3.92,0,0,0-2.9,6.56A3.1,3.1,0,0,1,533,481.1a3,3,0,0,1,0-.36,1.32,1.32,0,1,0-1.23-.59,3.09,3.09,0,0,1-5.23-2.24,3.19,3.19,0,0,1,.07-.63,4,4,0,0,0,.64.06,3.93,3.93,0,0,0,3.93-3.93c0-.07,0-.13,0-.2a16.06,16.06,0,0,0,4.85-6.47,12.28,12.28,0,0,0,.85-4.46,11.9,11.9,0,0,0-.47-3.28,13.57,13.57,0,0,1,7.21,3.44,9.79,9.79,0,0,1,3.28,7.11C546.88,472.26,545.39,474.92,542.7,477.11Z"
                transform="translate(-422.67 -438.66)"
                style={{ fill: "#de9500" }}
            />
        </svg>
    );
}

export { SamsungPhone };
