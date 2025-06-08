import { ReactNode, useState } from "react";

interface AccordionProps {
    title: string;
    children: ReactNode;
}

function Accordion({ title, children }: AccordionProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="w-full">
            <div className="border-b border-[#560000]">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex justify-between items-center py-4 group cursor-pointer"
                >
                    <h2
                        className={`text-2xl sm:text-3xl font-bold text-[#560000] tracking-tight transition-colors ${
                            open
                                ? "text-[#560000]"
                                : "group-hover:text-[#560000]/80"
                        }`}
                    >
                        {title}
                    </h2>
                    <svg
                        className={`w-7 h-7 text-[#560000] transform transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    open ? "max-h-2xl mt-6" : "max-h-0 mt-0"
                }`}
            >
                {open && <div className="text-[#450000]">{children}</div>}
            </div>
        </div>
    );
}

export default Accordion;
