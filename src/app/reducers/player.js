import {
    FILTER,
    PAGINATION,
    RECEIVE_PLAYERS,
    REQUEST_PLAYERS,
    REQUEST_DELETE_PLAYER,
    SUCCESS_DELETE_PLAYER,
    ERROR_DELETE_PLAYER,
    REQUEST_CREATE_PLAYER,
    SUCCESS_CREATE_PLAYER,
    ERROR_CREATE_PLAYER
} from "../constants/actionTypes";

const initialState ={
    pagination:{
        page:0,
        size:3
    },
    filter:{
        name:"",
        surname:""
    },
    players:[],
    isFetchingPlayers: false,
    isDeleting:false,
    isSuccessDeleted:false,
    isCreating: false,
    isSuccessCreated: false,
    createdPlayer:{}
}



export default function PlayerReducer(state=initialState,action){
    switch(action.type){
        case PAGINATION:{
            return{
                ...state,
                pagination:{
                    page: action.payload.page,
                    size: action.payload.size
                }
            }
        }
        case FILTER:{
            return{
                ...state,
                filter:{
                    name: action.payload.name,
                    surname: action.payload.surname
                }
            }
        }

        case REQUEST_PLAYERS:{
            return{
                ...state,
                isFetchingPlayers: true
            }
        }

        case RECEIVE_PLAYERS:{
            return {
                ...state,
                isFetchingPlayers: false,
                players: action.payload
            }
        }

        case REQUEST_DELETE_PLAYER:{
            return {
                ...state,
              isDeleting: true
            }
        }

        case SUCCESS_DELETE_PLAYER:{
            return {
                ...state,
                isDeleting: false,
                isSuccessDeleted: true
            }
        }

        case ERROR_DELETE_PLAYER:{
            return {
                ...state,
                isDeleting: false,
                isSuccessDeleted: false
            }
        }

        case REQUEST_CREATE_PLAYER:{
            return {
                ...state,
                isCreating: true
            }
        }

        case SUCCESS_CREATE_PLAYER:{
            return {
                ...state,
                isCreating: false,
                isSuccessCreated: true,
                createdPlayer: action.payload
            }
        }

        case ERROR_CREATE_PLAYER:{
            return {
                ...state,
                isCreating: false,
                isSuccessCreated: false
            }
        }

        default :{
            return state;
        }
    }
}