import { SET_ROOM,RESET_ROOM } from '../actions/types'
import Cookie from 'js-cookie'
const initialState={
    roomDetails: Cookie.getJSON('room')||null
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
      
      case SET_ROOM:
          return{
              ...state,
              roomDetails:action.payload
          }
    case RESET_ROOM:
            return{
                ...state,
                roomDetails:null
            }
               

      default:
        return state
    }
  }