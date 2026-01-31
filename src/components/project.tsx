export function Project({
    idx,
    title,
    description,
    href,
    year,
}: {
    readonly idx: number;
    readonly title: string;
    readonly description: string;
    readonly href: string;
    readonly year: number;
}) {
    const listNumber = idx + 1;
    return (
        <a
            href={href}
            target="_blank"
            className="flex items-center rounded-full px-2 py-3 hover:bg-gray-100 lg:px-4"
        >
            <span className="fon-medium whitespace-nowrap lg:text-lg">
                {listNumber}. {title} —{" "}
                <span className="hidden text-gray-500 lg:inline-block">
                    {description}
                </span>
            </span>

            <span className="flex grow items-center before:mx-2 before:grow before:border-b before:border-dotted before:border-gray-600 before:content-['']">
                <span className="whitespace-nowrap">{year}</span>
            </span>
        </a>
    );
}
