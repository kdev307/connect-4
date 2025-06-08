import Accordion from "./Accordion";

function HomeInfo() {
    return (
        <div className="w-full max-w-7xl mx-auto mt-14 px-6 flex flex-col gap-20">
            <Accordion title="How to Play">
                <dl className="space-y-6 text-xl sm:text-2xl font-medium leading-relaxed">
                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Create or Join a Room:
                        </dt>
                        <dd className="ml-4">
                            Start a new match by creating a room or enter a code
                            to join your friend.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Share the Code:
                        </dt>
                        <dd className="ml-4">
                            After creating a room, send your unique room code to
                            the other player.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Start Playing:
                        </dt>
                        <dd className="ml-4">
                            Players take turns dropping discs into the columns
                            of the board.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Connect Four to Win:
                        </dt>
                        <dd className="ml-4">
                            Align four of your discs — vertically, horizontally,
                            or diagonally — to win!
                        </dd>
                    </div>
                </dl>
            </Accordion>
            <Accordion title="Note">
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-[#450000]">
                    Mobile users for a better viewing experience, switch your
                    browser view to desktop mode. .
                </p>
            </Accordion>
        </div>
    );
}

export default HomeInfo;
