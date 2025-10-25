import React from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface ToolTipProps {
    children: React.ReactNode;
    text: string;
    direction?: Direction;
    visible?: boolean;
}

const tooltipPositions = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "top-1/2 right-full mr-2 -translate-y-1/2",
    right: "top-1/2 left-full ml-2 -translate-y-1/2",
};

function ToolTip({
    children,
    text,
    direction = "top",
    visible = false,
}: ToolTipProps) {
    return (
        <div className="relative group inline cursor-pointer">
            {children}
            <div
                className={`absolute z-50
        bg-[#346840] bg-opacity-90 text-white text-2xl font-semibold
        rounded-xl px-4 py-3
        opacity-0 group-hover:opacity-100
        pointer-events-none
        whitespace-normal
        shadow-lg
        transition-all duration-300 ease-in-out
        transform
        ${tooltipPositions[direction]}
        ${
            direction === "top" || direction === "bottom"
                ? visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                : visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
        }
            w-96
            `}
            >
                {text}
            </div>
        </div>
    );
}

export default ToolTip;
