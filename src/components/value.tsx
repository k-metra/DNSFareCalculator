type ValueProps = {
    value?: string
    label: string
}

export default function Value( {value = "N/A", label }: ValueProps) {

    return (
        <div className="w-full relative rounded-md border border-border bg-black/25 h-19 flex items-center justify-start p-4">
            <h4 className="text-[13px] font-semibold text-secondary absolute top-2">{label}</h4>

            <span className="font-semibold text-white text-lg font-main block truncate mt-3">{value}</span>
        </div>
    )
}