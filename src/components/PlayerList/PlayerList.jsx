import PlayerListItem from "../PlayerListItem";
import * as React from "react";

const PlayerList = ({items = [],handleDelete}) => {
    const playerList = items.map(player => {
            return (
                <li key={player.id}>
                    <PlayerListItem player={player} handleDelete={handleDelete}/>
                </li>
            )
        }
    )
    return (
            <ul>
                {playerList}
            </ul>
    )
}
export default PlayerList;