interface ModuleHeadingProps {
    children?: React.ReactNode;
    title: string;
    description: string;
}

export default function ModuleHeading({ children, title, description } : ModuleHeadingProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-0">
            <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary break-words">
                    {title}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                    {description}
                </p>
            </div>
            {children && (
                <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 flex-shrink-0">
                    {children}
                </div>
            )}
        </div>
    )
}