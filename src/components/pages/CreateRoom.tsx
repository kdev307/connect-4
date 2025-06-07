import { useState } from "react";
import Title from "../Title";
import Buttons from "../Buttons";
import { Link, useNavigate } from "react-router";
import { createRoom } from "../../firebase/service";

function CreateRoom() {
	const [name, setName] = useState<string>("");
    const navigate = useNavigate();



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) {
			alert("Please enter a name.");
			return;
		}

		try {
			const roomCode = await createRoom(name.trim());
			sessionStorage.setItem("playerName", name.trim());
			navigate(`/room/${roomCode}`);
		} catch (error) {
			console.error(error);
			alert("Error creating room.");
		}
	};
	return (
		<div className="mx-auto p-6 max-w-md mt-40 shadow-lg rounded-2xl">
			<Title title="Create Room" style="text-4xl font-bold text-[#560000] mb-10" />
			<form className="mx-auto flex flex-col gap-10" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">

				<label htmlFor="name" className="text-[1.8rem] font-semibold text-[#333] text-left">
					Your Name:
                    </label>
				<input
					type="text"
					className="w-full p-4 text-xl box-border border rounded-full border-[#222] text-[#000] placeholder:text-[#666] placeholder:text-xl placeholder-opacity-50 bg-[#fff]"
					name="name"
					id="name"
					placeholder="Enter your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                <Buttons
                    type="submit"
					text="Create Room"
					onClick={handleSubmit}
					style="text-2xl text-[#010e42] border-[#010e42] hover:bg-[#010e42]"
				/>
			</form>
            <Link to="/">
				<Buttons
                    type="button"
					text="Go Back"
					// onClick={handleSubmit}
					style="mt-4 text-2xl text-[#62422e] border-[#62422e] hover:bg-[#62422e] w-full"
				/>
            </Link>
		</div>
        
	);
}

export default CreateRoom;
