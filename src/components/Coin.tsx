interface CoinProps {
    coinColour: string,
    coinSize:string
}

const colorMap: Record<string, string> = {
    red: "bg-red-500",
    yellow: "bg-yellow-400",
    blue: "bg-blue-500",
    green: "bg-green-500",
    empty: "bg-white",
    // add more if needed
};

function Coin({coinColour, coinSize}: CoinProps) {
    const colour = colorMap[coinColour.toLowerCase()] ?? "bg-gray-200"
    return (
        <div className={`${coinSize} rounded-full shadow-md cursor ${colour} border-2 border-black` }></div>
        
    )
}

export default Coin