interface CoinProps {
    coinColour: string | number | null;
    coinSize: string;
}

const colorMap: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    empty: "bg-white",
};

function Coin({ coinColour, coinSize }: CoinProps) {
    let colorKey: string;

    if (coinColour === 0) colorKey = "red";
    else if (coinColour === 1) colorKey = "blue";
    else if (typeof coinColour === "string") colorKey = coinColour.toLowerCase();
    else colorKey = "empty";

    const colour = colorMap[colorKey] ?? "bg-gray-200";

    return (
        <div className={`${coinSize} rounded-full shadow-md cursor ${colour} border-2 border-black`}></div>
    );
}

export default Coin;
