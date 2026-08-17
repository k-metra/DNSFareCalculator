import { useState } from 'react';

export type DropdownProps = {
     options: string[];
     value: string;
     onChange: (value: string) => void;
     label: string;
}

export default function Dropdown({ DropdownProps }: { DropdownProps: DropdownProps }) {
    const [open, setOpen] = useState(false);
    const { options, value, onChange, label } = DropdownProps;

    const selectedOption = options.find((option) => option === value);

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`relative w-full h-14 px-4 border border-border rounded-md bg-background text-white text-left transition-colors
                        ${open ? "border-blue-500" : "hover:border-gray-400"}
                    `}
            >
                <span
                    className={`
                        absolute left-3 px-1
                        bg-background
                        text-sm
                        transition-all
                        ${value || open
                            ? "-top-2 text-blue-500"
                            : "top-1/2 -translate-y-1/2 text-gray-400"
                        }`}
                >{label}</span>
                
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                    ▼
                </span>
            </button>
        </div>
    )
}