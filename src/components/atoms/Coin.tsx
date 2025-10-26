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
    const isEmpty = !coinColour || coinColour === "empty";

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
            {!isEmpty && (
                <motion.div
                    key={`${coinColour}-${shouldAnimate ? "drop" : "static"}-${
                        isWinning ? "win" : ""
                    }`}
                    initial={shouldAnimate ? { y: -600, opacity: 1 } : false}
                    animate={combinedAnimation}
                    transition={combinedTransition}
                    className="size-full rounded-full flex items-center justify-center"
                    style={{
                        backgroundImage: isWinning
                            ? `linear-gradient(
                                45deg,
                                ${coinColour} 0%,
                                ${coinColour} 35%,
                                #fff 50%,
                                ${coinColour} 65%,
                                ${coinColour} 100%
                            )`
                            : `radial-gradient(circle at 25% 25%, white, ${coinColour} 90%)`,
                        backgroundSize: isWinning ? "300% 100%" : undefined,
                        animation: isWinning ? "shine 3s infinite linear" : undefined,
                    }}
                />
            )}
        </div>
    );
}

export default Coin;
