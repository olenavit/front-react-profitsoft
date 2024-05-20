import {
    FILTER,
    PAGINATION,
    RECEIVE_PLAYERS,
    SUCCESS_DELETE_PLAYER,
    REQUEST_PLAYERS,
    ERROR_DELETE_PLAYER,
    REQUEST_DELETE_PLAYER,
    REQUEST_CREATE_PLAYER,
    SUCCESS_CREATE_PLAYER,
    ERROR_CREATE_PLAYER
} from "../constants/actionTypes";
import storage, {keys} from "../../misc/storage";
import config from "../../config";
import axios from "axios";

const {PLAYER_SERVICE} = config

const playerList = [{
    "id": 1,
    "name": "Jayson",
    "surname": "Tatum",
    "year_of_birth": 1998,
    "position": "shooter, power forward",
},
    {
        "id": 2,
        "name": "Kristaps",
        "surname": "Porzingis",
        "year_of_birth": 1995,
        "position": "shooter, power forward",
    },
    {
        "id": 3,
        "name": "Josh",
        "surname": "Hart",
        "year_of_birth": 1995,
        "position": "small forward",
    }]


export const MOCK_USER_LIST_RESPONSE = {
    list: playerList,
    totalPages: 1,
    totalElements: playerList.length
}


const setPagination = (pagination) => {
    storage.setItem(keys.PAGINATION, JSON.stringify(pagination))
    return {
        type: PAGINATION,
        payload: pagination
    }
}

const setFilter = (filter) => {
    storage.setItem(keys.FILTER, JSON.stringify(filter))
    return {
        type: FILTER,
        payload: filter
    }
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
        .catch((err) => {
            // TODO: Mocked '.catch()' section
            return MOCK_USER_LIST_RESPONSE;
        }).then((players) => {
            dispatch(receivePlayers(players))
        })
}


const deletePlayer = (id) => {
    return fetch(`${PLAYER_SERVICE}/api/player/${id}`, {
        method: "DELETE"
    })
    // return axios.delete(`${PLAYER_SERVICE}/api/player/${id}`).then(res=>{
    //     console.log('axios res',res)
    //     return res
    // })
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
    return deletePlayer(id).then((res) => {
        console.log('res', res)
        if (res.ok) {
            dispatch(successDeletePlayer())
        } else {
            dispatch(errorDeletePlayer())
        }
    }).catch((err) => {
        // TODO: Mocked '.catch()' section
        console.error(err);
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
    })
        .then((res) => {
            if (res) {
                dispatch(successCreatePlayer(res))
            } else {
                dispatch(errorCreatePlayer())
            }
        }).catch((err) => {
            // TODO: Mocked '.catch()' section
            console.error(err);
            dispatch(errorCreatePlayer())
        })

}


const exportFunctions = {
    setPagination,
    setFilter,
    fetchPlayers,
    fetchDeletePlayer,
    fetchCreatePlayer
}

export default exportFunctions;