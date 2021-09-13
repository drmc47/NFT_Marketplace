import axios from "axios";
import { LOGIN_GOOGLE_OK, LOGIN_GOOGLE_ERROR } from './constants'


export default function isAutorizeByGoogle() {
    console.log("entre en isAutorizeByGoogle")
    return async (dispatch) => {
        let response = await axios.get("http://localhost:8001/auth/google")
        console.log("entre a data ") 
        dispatch({ type: LOGIN_GOOGLE_OK, payload: response.data })
        /* return await axios.get("http://localhost:8001/auth/google")
            .then((response) => {
                console.log(response.data) 
                dispatch({ type: LOGIN_GOOGLE_OK, payload: response.data })
            }) */
    }
}




