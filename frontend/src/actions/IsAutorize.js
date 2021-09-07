import axios from 'axios'
import { IS_AUTHENTICATED } from './constants'

export default function IsAutorize() {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8001/google/callback`)
      .then((response) => {
        dispatch({ type: IS_AUTHENTICATED, payload: response.data })
      })
  }
}
