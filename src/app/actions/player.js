import {
    RECEIVE_PLAYERS,
    SUCCESS_DELETE_PLAYER,
    REQUEST_PLAYERS,
    ERROR_DELETE_PLAYER,
    REQUEST_DELETE_PLAYER,
    REQUEST_CREATE_PLAYER,
    SUCCESS_CREATE_PLAYER,
    ERROR_CREATE_PLAYER
} from "../constants/actionTypes";
import config from "../../config";
import axios from "axios";

const {PLAYER_SERVICE} = config

const playerList = [{
    "id": 1,
    "name": "Jayson",
    "surname": "Tatum",
    "yearOfBirth": 1998,
    "position": "shooter, power forward",
},
    {
        "id": 2,
        "name": "Kristaps",
        "surname": "Porzingis",
        "yearOfBirth": 1995,
        "position": "shooter, power forward",
    },
    {
        "id": 3,
        "name": "Josh",
        "surname": "Hart",
        "yearOfBirth": 1995,
        "position": "small forward",
    }]


export const MOCK_USER_LIST_RESPONSE = {
    list: playerList,
    totalPages: 1,
    totalElements: playerList.length
}

const requestPlayers = () => ({
    type: REQUEST_PLAYERS
})


const getPlayers = ({
                        name,
                        surname,
                        page,
                        size
                    }) => {

    return axios.post(`${PLAYER_SERVICE}/api/player/_list`, {
        name,
        surname,
        page,
        size
    })
}

const receivePlayers = (players) => ({
    payload: players,
    type: RECEIVE_PLAYERS
})


const fetchPlayers = ({
                          name = "",
                          surname = "",
                          page = 0,
                          size = 3
                      } = {}) => (dispatch) => {
    dispatch(requestPlayers());
    return getPlayers({
        name,
        surname,
        page,
        size
    })
        .then((res) => {
            return res;
        })
        .catch(() => {
            // TODO: Mocked '.catch()' section
            return MOCK_USER_LIST_RESPONSE;
        }).then((players) => {
            dispatch(receivePlayers(players))
        })
}


const deletePlayer = (id) => {
    return axios.delete(`${PLAYER_SERVICE}/api/player/${id}`)
}

const requestDeletePlayer = () => ({
    type: REQUEST_DELETE_PLAYER
})


const successDeletePlayer = () => ({
    type: SUCCESS_DELETE_PLAYER
})

const errorDeletePlayer = () => ({
    type: ERROR_DELETE_PLAYER
})

const fetchDeletePlayer = (id) => (dispatch) => {
    dispatch(requestDeletePlayer())
    return deletePlayer(id)
        .catch(() => {
            // TODO: Mocked '.catch()' section
            for (let i = 0; i < playerList.length; i++) {
                if (playerList[i].id === id) {
                    playerList.splice(i, 1)
                    return {
                        ok: true
                    }
                }
            }

            return {
                ok: false
            }
        })
        .then((res) => {
            if (res.ok) {
                dispatch(successDeletePlayer())
            } else {
                dispatch(errorDeletePlayer())
            }
        }).catch(() => {
            dispatch(errorDeletePlayer())
        })

}

const requestCreatePlayer = () => ({
    type: REQUEST_CREATE_PLAYER
})

const successCreatePlayer = (player) => {
    return {
        type: SUCCESS_CREATE_PLAYER,
        payload: player
    }
}

const errorCreatePlayer = () => ({
    type: ERROR_CREATE_PLAYER
})

const createPlayer = ({
                          id,
                          name,
                          surname,
                          yearOfBirth,
                          position
                      }) => {
    if (id === "new") {
        return axios.post(`${PLAYER_SERVICE}/api/player`, {
            name,
            surname,
            yearOfBirth,
            position
        })
    }
    return axios.put(`${PLAYER_SERVICE}/api/player/${id}`, {
        name,
        surname,
        yearOfBirth,
        position
    })
}

const fetchCreatePlayer = ({
                               id,
                               name,
                               surname,
                               yearOfBirth,
                               position
                           }) => (dispatch) => {

    dispatch(requestCreatePlayer())
    return createPlayer({
        id,
        name,
        surname,
        yearOfBirth,
        position
    }).catch((err) => {
        if (id !== "new") {
            for (let i = 0; i < playerList.length; i++) {
                if (playerList[i].id == id) {
                    playerList[i] = {
                        id,
                        name,
                        surname,
                        yearOfBirth,
                        position
                    }
                    return playerList[i]
                }
            }
            return {}
        }
        playerList.push({
            id: playerList.length+1,
            name,
            surname,
            yearOfBirth,
            position
        })

        return playerList[playerList.length-1];
    })
        .then((res) => {
            if (res) {
                dispatch(successCreatePlayer(res))
            } else {
                dispatch(errorCreatePlayer())
            }
        }).catch(() => {
            dispatch(errorCreatePlayer())
        })

}

const exportFunctions = {
    fetchPlayers,
    fetchDeletePlayer,
    fetchCreatePlayer,
}

export default exportFunctions;