function Loader() {
    const colors = [
        "#FF4C4C", // red
        "#FFD93D", // yellow
        "#4CFF4C", // green
        "#4CC3FF", // blue
        "#FF8C4C", // orange
        "#C14CFF", // purple
        "#FF4CEB", // pink
        "#4CFFD5", // cyan
    ];
    const discCount = colors.length; // number of bouncing discs

    return (
        <div className="flex justify-center items-end gap-6 h-fit">
            {colors.slice(0, discCount).map((color, idx) => (
                <div
                    key={idx}
                    className="size-12 rounded-full animate-bounceDisc"
                    style={{
                        backgroundColor: color,
                        animationDelay: `${idx * 0.2}s`,
                    }}
                ></div>
            ))}

            <style>{`
        @keyframes bounceDisc {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-bounceDisc {
          animation: bounceDisc 0.6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}

export default Loader;
