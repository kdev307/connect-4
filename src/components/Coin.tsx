interface CoinProps {
    coinColour: string | number | null;
    coinSize: string;
}

function Coin({ coinColour, coinSize }: CoinProps) {

    return (
        <div
            className={`${coinSize} rounded-full shadow-md cursor ${
                coinColour === "gold"
                    ? "bg-[#ffd700]"
                    : coinColour === "silver"
                    ? "bg-[#c0c0c0]"
                    : "bg-white"
            } border-2 border-black`}
        ></div>
    );
}

export default Coin;
