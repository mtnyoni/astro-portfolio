import { cn } from "@utils/utils";
import {
    type MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import { useRef } from "react";

import {
    DraftingCompassIcon,
    FolderRoot,
    Home,
    Info,
    LayoutGrid,
    MessageCircle,
    NotebookPenIcon,
    type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const dockIcons = {
    home: Home,
    aboutMe: Info,
    projects: FolderRoot,
    blog: NotebookPenIcon,
    chatMe: MessageCircle,
    craft: DraftingCompassIcon,
    apps: LayoutGrid,
};

type DockItem = {
    href: string;
    label: string;
    icon: string;
    angle: number;
};

const dockItems: DockItem[] = [
    {
        href: "/",
        label: "Home",
        icon: "home",
        angle: 180,
    },
    {
        href: "/projects",
        label: "Projects",
        icon: "apps",
        angle: 135,
    },
    {
        href: "/crafts",
        label: "Craft",
        icon: "craft",
        angle: 90,
    },
    {
        href: "/about-me",
        label: "About Me",
        icon: "aboutMe",
        angle: 45,
    },
    {
        href: "/articles",
        label: "Articles",
        icon: "blog",
        angle: 0,
    },
];

export default function NavigationDock() {
    const mouseXPosition = useMotionValue(Number.POSITIVE_INFINITY);

    return (
        <footer className="absolute bottom-6 z-50 flex h-16 w-full items-center justify-center">
            <motion.nav
                onMouseMove={(e) => mouseXPosition.set(e.pageX)}
                onMouseLeave={() =>
                    mouseXPosition.set(Number.POSITIVE_INFINITY)
                }
                className="border-border bg-glass shadow-white/0.4 fixed mx-auto hidden h-16 items-end justify-evenly gap-4 rounded-full border px-4 pb-3 shadow-inner backdrop-blur-xs sm:flex"
            >
                {dockItems.map(({ label, icon, href }) => (
                    <DockItem
                        href={href}
                        key={label}
                        label={label}
                        icon={icon}
                        mouseXPosition={mouseXPosition}
                    />
                ))}
            </motion.nav>
        </footer>
    );
}

type DockItemProps = {
    href: string;
    mouseXPosition: MotionValue<number>;
    label: string;
    icon: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export function DockItem({
    href,
    mouseXPosition,
    label,
    icon,
    className,
}: Readonly<DockItemProps>) {
    const ref = useRef<HTMLDivElement>(null);

    const distanceFromMouseXToElementCenter = useTransform(
        mouseXPosition,
        (mouseXValue: number) => {
            const elementBounds = ref.current?.getBoundingClientRect() ?? {
                x: 0,
                width: 0,
            };
            return mouseXValue - elementBounds.x - elementBounds.width / 2;
        },
    );

    const domain = [-150, 0, 150];
    const range = [40, 80, 40];
    const widthSynchronizer = useTransform(
        distanceFromMouseXToElementCenter,
        domain,
        range,
    );

    const width = useSpring(widthSynchronizer, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const Icon: LucideIcon = dockIcons[icon as keyof typeof dockIcons];
    return (
        <a href={href}>
            <button
                type="button"
                className={cn(
                    "group relative flex cursor-pointer flex-col items-center",
                    className,
                )}
            >
                <div className="text-medium mb-1 hidden rounded bg-gray-50 px-3 py-1 text-xs opacity-0 duration-300 group-hover:block group-hover:scale-110 group-hover:opacity-90 dark:border dark:border-white">
                    {label}
                </div>

                <motion.div
                    ref={ref}
                    style={{ width }}
                    className="bg-glass flex aspect-square w-10 items-center justify-center rounded-full border shadow-inner shadow-white/0.5 backdrop-blur-2xl duration-100 active:scale-90"
                >
                    <Icon className="size-6 transition-all duration-400 group-hover:scale-150" />
                    <span className="sr-only">{label}</span>
                </motion.div>
            </button>
        </a>
    );
}

export function MobileNavbar() {
    const [open, setOpen] = useState(false);
    const radius = 80;
    const itemSize = 48;

    const getPosition = (angle: number) => {
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.cos(rad) - itemSize / 2;
        const y = -radius * Math.sin(rad) - itemSize / 2; // negative because y goes down in CSS
        return { x, y };
    };

    return (
        <div className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2">
            <button
                onClick={() => setOpen(!open)}
                className="absolute top-1/2 left-1/2 z-50 grid size-16 -translate-x-1/2 -translate-y-1/2 transform place-items-center rounded-full border bg-white/0.5 shadow-inner shadow-white/0.5 backdrop-blur-xs sm:hidden"
            >
                <span className="text-xl">{open ? "×" : "+"}</span>
            </button>
            {dockItems.map((item, idx) => {
                const pos = getPosition(item.angle);
                const Icon: LucideIcon =
                    dockIcons[item.icon as keyof typeof dockIcons];

                return (
                    <a
                        href={item.href}
                        key={idx}
                        style={{
                            transform: `translate(${pos.x}px, ${pos.y}px) ${open ? "scale(1)" : "scale(0)"}`,
                            opacity: open ? 1 : 0,
                            transition:
                                "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transitionDelay: open ? `${idx * 30}ms` : "0ms",
                        }}
                        className="absolute top-1/2 left-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100 sm:hidden"
                        title={item.label}
                    >
                        <Icon />
                    </a>
                );
            })}
        </div>
    );
}
