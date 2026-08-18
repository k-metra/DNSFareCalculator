type ValueProps = {
    value?: string
    label: string
}

export default function Value( {value = "N/A", label }: ValueProps) {

    return (
        <div className="relative flex w-full min-h-20 items-center justify-start rounded-md border border-border bg-black/25 p-4">
            <h4 className="text-[13px] font-semibold text-secondary absolute top-2">{label}</h4>

            <span className="mt-3 block truncate font-main text-base font-semibold text-white sm:text-lg">{value}</span>
        </div>
    )
}