import { Link } from "react-router";
import Buttons from "../Buttons";
import Title from "../Title";
import ToolTip from "../ToolTip";
import HomeInfo from "../HomeInfo";

function Home() {
    return (
        <div className="m-auto p-4">
            <Title
                title="Play Connect 4"
                style="text-7xl font-extrabold text-[#014210]"
            />
            <div className="flex items-center justify-center gap-20 mt-20">
                <Link to="/create-room">
                    <ToolTip
                        text="Click to create a new game room and get a unique room code."
                        direction="left"
                    >
                        <Buttons
                            type="submit"
                            text="Create Room"
                            style="text-2xl text-[#010e42] border-[#010e42] hover:bg-[#010e42] w-full"
                        />
                    </ToolTip>
                </Link>
                <Link to="/join-room">
                    <ToolTip
                        text="Enter a room code and join your friend's game."
                        direction="right"
                    >
                        <Buttons
                            type="submit"
                            text="Join Room"
                            style="text-2xl text-[#010e42] border-[#010e42] hover:bg-[#010e42] w-full"
                        />
                    </ToolTip>
                </Link>
            </div>
            <HomeInfo />
        </div>
    );
}

export default Home;
