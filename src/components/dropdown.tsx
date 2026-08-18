import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence} from 'motion/react';

import { type option } from '@utils/types';

export type DropdownProps = {
     options: option[];
     value?: string
     onChange: (value: string) => void;
     label: string;
     disabled?: boolean;
}

export default function Dropdown({ label, value, options, onChange, disabled = false }: DropdownProps ) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (disabled) return;
        setOpen((prev) => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setOpen(false);
                }
            
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={handleClick}
                className={`relative w-full h-14 px-4 border border-border rounded-md bg-background text-white text-left transition-colors ${!disabled && "cursor-pointer"}
                        ${open ? "border-blue-500" : "hover:border-gray-400}"}
                    `}
            >
                <span
                    className={`
                        font-main
                        absolute left-3 px-2
                        bg-background
                        text-sm
                        transition-all
                        ${value || open
                            ? "-top-2.5 text-blue-500"
                            : "top-1/2 -translate-y-1/2 text-gray-400"
                        }`}
                >{label}</span>

                <span className="font-main block truncate">
                    {(options.find((option: option) => option.value === value)?.label)}
                </span>
                
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                    ▼
                </span>

            </button>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -5}}
                            animate={{ opacity: 1, y: 0}}
                            exit={{ opacity: 0, y: -5}}
                            transition={{ duration: 0.15}}
                            className="absolute z-50 mt-1 left-0 w-full scrollbar- scrollbar-thumb-border scrollbar-track-transparent scrollbar-thin max-h-48 scroll-m-9 rounded-md border border-border bg-background shadow-lg overflow-y-auto"
                        >
                            {
                                options.map((option) => (
                                    <button
                                        key={option.label}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setOpen(false);
                                        }}
                                        className="font-main font-medium w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    >{option.label}</button>
                                ))
                            }
                        </motion.div>
                    )}
                </AnimatePresence>
        </div>
    )
}