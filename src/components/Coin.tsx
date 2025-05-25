// import { motion } from "framer-motion";

// interface CoinProps {
// 	coinColour: string | number | null;
// 	coinSize: string;
// 	shouldAnimate?: boolean;
// 	isWinning?: boolean;
// }

// const springDrop = {
// 	type: "spring",
// 	stiffness: 80,
// 	damping: 15,
// };

// function Coin({ coinColour, coinSize, shouldAnimate, isWinning }: CoinProps) {
// 	const getCoinColorClass = () => {
// 		switch (coinColour) {
// 			case "gold":
// 				return "bg-[#ffd700] bg-radial-[at_25%_25%] from-white to-black/10";
// 			case "silver":
// 				return "bg-[#c0c0c0] bg-radial-[at_25%_25%] from-white to-black/10";
// 			default:
// 				return "bg-white";
// 		}
// 	};

// 	const dropAnimation = shouldAnimate ? { y: 0, opacity: 1 } : {};
// 	// const shineAnimation = isWinning ? { scale: [1, 1.1, 1], filter: ["drop-shadow(0 0 0 white)", "drop-shadow(0 0 15px white)", ""] } : {};

// 	const combinedAnimation = {
// 		...dropAnimation,
// 		// ...shineAnimation,
// 	};

// 	const combinedTransition =
// 		shouldAnimate && isWinning
// 			? { ...springDrop, repeat: Infinity, duration: 1.2 }
// 			: shouldAnimate
// 			? springDrop
// 			: isWinning
// 			? { repeat: Infinity, duration: 1.2 }
// 			: undefined;

// 	return (
// 		<div
// 			className={`${coinSize} rounded-full border-2 border-black flex items-center justify-center bg-white`}
// 		>
// 			<motion.div
// 				key={`${coinColour}-${shouldAnimate ? "drop" : "static"}-${isWinning ? "win" : ""}`}
// 				initial={shouldAnimate ? { y: -650, opacity: 1 } : false}
// 				animate={combinedAnimation}
// 				transition={combinedTransition}
// 				className={`size-full rounded-full ${getCoinColorClass()} ${isWinning && coinColour === "gold" ? "shine-gold" : isWinning && coinColour === "silver" ? "shine-silver" : ""}`}
// 			/>
// 		</div>
// 	);
// }

// export default Coin;

import { motion } from "framer-motion";

interface CoinProps {
	coinColour: string | number | null;
	coinSize: string;
	shouldAnimate?: boolean;
	isWinning?: boolean;
}

const springDrop = {
	type: "spring",
	stiffness: 80,
	damping: 15,
};

function Coin({ coinColour, coinSize, shouldAnimate, isWinning }: CoinProps) {
	const getCoinColorClass = () => {
		switch (coinColour) {
			case "gold":
				return "bg-[#ffd700] bg-radial-[at_25%_25%] from-white to-black/10";
			case "silver":
				return "bg-[#c0c0c0] bg-radial-[at_25%_25%] from-white to-black/10";
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
				initial={shouldAnimate ? { y: -650, opacity: 1 } : false}
				animate={combinedAnimation}
				transition={combinedTransition}
				className={`size-full rounded-full ${getCoinColorClass()} ${
					isWinning && coinColour === "gold"
						? "shine-gold"
						: isWinning && coinColour === "silver"
						? "shine-silver"
						: ""
				}`}
			/>
		</div>
	);
}

export default Coin;
