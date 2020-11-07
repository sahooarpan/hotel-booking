import { SET_ROOM,RESET_ROOM} from './types'
import Cookie from 'js-cookie'
export const setRoom=(payload)=>dispatch=>{
    dispatch({
        type:SET_ROOM,
        payload
    })
    Cookie.set("room",JSON.stringify(payload))


}


export const resetRoom=()=>dispatch=>{
    Cookie.remove("room")

    dispatch({
        type:RESET_ROOM
    })
    

}
