import { BrowserRouter, Route, Routes } from "react-router";
import Connect4 from "./components/pages/Connect4";
import CreateRoom from "./components/pages/CreateRoom";
import JoinRoom from "./components/pages/JoinRoom";
import Home from "./components/pages/Home";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/join-room" element={<JoinRoom />} />

					<Route path="/create-room" element={<CreateRoom />} />
					<Route path="/room/:roomCode" element={<Connect4 />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
