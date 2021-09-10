import axios from 'axios'
import { SIGNUP_SUCCESS } from './constants'

export default function localSignup(payload) {
  return function (dispatch) {
    console.log('si', payload)
    return axios
      .post('http://localhost:8001/register', payload)
      .then((data) => {
        console.log('data', data.data)
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: data.data,
        })
      })
  }
}
