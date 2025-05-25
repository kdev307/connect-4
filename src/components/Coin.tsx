import { motion } from "framer-motion";
interface CoinProps {
	coinColour: string | number | null;
	coinSize: string;
	shouldAnimate?: boolean;
}

const springDrop = {
	type: "spring",
	stiffness: 80,
	damping: 15,
};

function Coin({ coinColour, coinSize, shouldAnimate }: CoinProps) {
	return (
		<div
			className={`${coinSize} rounded-full border-2 border-black flex items-center justify-center bg-white `}
		>
			<motion.div
				key={`${coinColour}-${shouldAnimate ? "drop" : "static"}`}
				initial={shouldAnimate ? { y: -650, opacity:   1 } : false}
				animate={shouldAnimate ? { y: 0, opacity: 1 } : false}
				transition={shouldAnimate ? springDrop : undefined}
				className={`size-8/10 rounded-full ${
					coinColour === "gold"
						? "bg-[#ffd700] bg-gradient-to-b from-white/100 to-black/5"
						: coinColour === "silver"
						? "bg-[#c0c0c0] bg-gradient-to-b from-white/100 to-black/5"
						: "bg-white"
                        
				}  `}
			/>
		</div>
	);
}

export default Coin;

// import { motion } from "framer-motion";

// interface CoinProps {
// 	coinColour: string | number | null;
// 	coinSize: string;
// 	shouldAnimate?: boolean;
// }

// const springDrop = {
// 	type: "spring",
// 	stiffness: 70,
// 	damping: 12,
// };

// function Coin({ coinColour, coinSize, shouldAnimate }: CoinProps) {
// 	return (
// 		<motion.div
// 			key={`${coinColour}-${shouldAnimate ? "drop" : "static"}`}
// 			initial={shouldAnimate ? { y: -1000, opacity: 0 } : false}
// 			animate={shouldAnimate ? { y: 0, opacity: 1 } : false}
// 			transition={shouldAnimate ? springDrop : undefined}
// 			className={`
// 				${coinSize} rounded-full cursor
// 				${coinColour === "gold" ? "bg-[#ffd700]" :
// 				coinColour === "silver" ? "bg-[#c0c0c0]" : "bg-white"}
// 				border-2 border-black
// 				bg-gradient-to-b from-white/80 to-black/20 shadow-lg
// 			`}
// 		/>
// 	);
// }

// export default Coin;
