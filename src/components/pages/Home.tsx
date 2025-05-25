import { Link } from "react-router";
import Buttons from "../Buttons";
import Title from "../Title";

function Home() {
	return (
		<div className="m-auto p-4">
			<Title
				title="Play Connect 4"
				style="text-7xl font-extrabold text-[#014210]"
			/>
			<div className="flex items-center justify-center gap-20 mt-20">
				<Link to="/create-room">
					<Buttons
						type="submit"
						text="Create Room"
						style="text-2xl text-[#010e42] border-[#010e42] hover:bg-[#010e42]"
					/>
				</Link>
				<Link to="/join-room">
					<Buttons
						type="submit"
						text="Join Room"
						style="text-2xl text-[#010e42] border-[#010e42] hover:bg-[#010e42]"
					/>
				</Link>
			</div>
		</div>
	);
}

export default Home;
