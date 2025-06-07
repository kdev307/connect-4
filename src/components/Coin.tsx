import { motion } from "framer-motion";

interface CoinProps {
    coinColour: string | number | null;
    coinSize: string;
    shouldAnimate?: boolean;
    isWinning?: boolean;
}

const springDrop = {
    type: "spring",
    stiffness: 100,
    damping: 18,
    mass: 1.5,
};

function Coin({ coinColour, coinSize, shouldAnimate, isWinning }: CoinProps) {
    const getCoinColorClass = () => {
        switch (coinColour) {
            case "red":
                return "bg-[#f00] bg-radial-[at_25%_25%] from-white to-black/10";
            case "blue":
                return "bg-[#00f] bg-radial-[at_25%_25%] from-white to-black/10";
            default:
                return "bg-white";
        }
    };

    const combinedAnimation = shouldAnimate ? { y: 0, opacity: 1 } : {};

    const combinedTransition =
        shouldAnimate && isWinning
            ? { ...springDrop, repeat: Infinity, duration: 1.2 }
            : shouldAnimate
            ? springDrop
            : isWinning
            ? { repeat: Infinity, duration: 1.2 }
            : undefined;

    return (
        <div
            className={`${coinSize} rounded-full border-2 border-black flex items-center justify-center bg-white`}
        >
            <motion.div
                key={`${coinColour}-${shouldAnimate ? "drop" : "static"}-${
                    isWinning ? "win" : ""
                }`}
                initial={shouldAnimate ? { y: -600, opacity: 1 } : false}
                animate={combinedAnimation}
                transition={combinedTransition}
                className={`size-full rounded-full ${getCoinColorClass()} ${
                    isWinning && coinColour === "red"
                        ? "shine-red"
                        : isWinning && coinColour === "blue"
                        ? "shine-blue"
                        : ""
                }`}
            />
        </div>
    );
}

export default Coin;
