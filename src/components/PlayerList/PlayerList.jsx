import PlayerListItem from "../PlayerListItem";
import * as React from "react";

const PlayerList = ({items = [],handleDelete}) => {
    const playerList = items.map(player => {
            return (
                <div key={player.id}>
                    <PlayerListItem player={player} handleDelete={handleDelete}/>
                </div>
            )
        }
    )
    return (
            <>
                {playerList}
            </>
    )
}
export default PlayerList;