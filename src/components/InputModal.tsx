import { useState } from "react";

interface InputModalProps {
	onToggleInputModal: () => void;
}

function InputModal({ onToggleInputModal }: InputModalProps) {
	const [formData, setFormData] = useState({
		numPlayers: 2,
		rows: 6,
		columns: 7,
		connectCount: 4,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: Number(value),
		}));
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm backdrop-brightness-50"
			onClick={onToggleInputModal}
		>
			<div
				className="relative w-fit flex flex-col bg-white rounded-xl p-10 border-2 border-[#422801]"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onToggleInputModal}
					className="self-end text-3xl font-semibold px-2 py-0 rounded-full bg-[#fff] text-[#422801] border-2 border-[#422801] hover:bg-[#422801] hover:text-[#fff]"
				>
					X
				</button>
				<h2 className="text-5xl text-[#01423a] font-semibold p-2 my-4 text-center">
					Customize the Game
				</h2>
				<form className="flex flex-col gap-10">
					<div className="flex flex-col gap-5">
						<label className="text-[1.8rem] font-semibold text-[#333] text-left">
							Number of Players
						</label>
						<input
							type="number"
							name="players"
							value={formData.numPlayers}
							onChange={handleChange}
							className={`w-full p-4 text-xl box-border border rounded-md border-[#222] text-[#000] placeholder:text-[#666] placeholder:text-xl placeholder-opacity-50 bg-[#fff]`}
							required
						/>
					</div>
					<div className="flex gap-x-6 my-6">
						<div className="flex flex-col w-full gap-5">
							<label className="text-[1.8rem] font-semibold text-[#333] mb-2">
								Grid Rows
							</label>
							<input
								type="number"
								name="rows"
								value={formData.rows}
								onChange={handleChange}
								className="w-full p-4 text-xl border rounded-md border-[#222] text-[#000] placeholder:text-[#666] placeholder-opacity-50 bg-white"
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-5">
							<label className="text-[1.8rem] font-semibold text-[#333] mb-2">
								Grid Columns
							</label>
							<input
								type="number"
								name="columns"
								value={formData.columns}
								onChange={handleChange}
								className="w-full p-4 text-xl border rounded-md border-[#222] text-[#000] placeholder:text-[#666] placeholder-opacity-50 bg-white"
								required
							/>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<label className="text-[1.8rem] font-semibold text-[#333] mb-2">
							Minimum Connections
						</label>
						<input
							type="number"
							name="Minimum Connections"
							value={formData.connectCount}
							onChange={handleChange}
							className={`w-full p-4 text-xl box-border border rounded-md border-[#222] text-[#000] placeholder:text-[#666] placeholder:text-xl placeholder-opacity-50 bg-[#fff]`}
						/>
					</div>
					<button className="text-3xl font-semibold py-4 px-8 rounded-full bg-[#fff] text-[#373636] border-2 border-[#373636] hover:bg-[#373636] hover:text-[#fff]">
						Start Customized Game
					</button>
				</form>
			</div>
		</div>
	);
}

export default InputModal;
