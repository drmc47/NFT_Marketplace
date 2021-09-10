// export default async function localSignup(payload) {
//     const response = await axios.post('localhost:8001/register', payload)
//     if (response.error) {
//         return {
//             type: 'SIGNUP_ERROR'
//         }
//     }
//     return {
//       type: 'SIGNUP_SUCCESS',
//       payload
//     }
//   }

// export default function localSignup(userInfo) {
//   return (dispatch) => {
//     return axios.post('localhost:8001/register', userInfo).then((data) =>
//       dispatch({
//         type: 'SIGNUP_SUCCESS',
//         payload: data,
//       })
//     )
//   }
// }

import axios from 'axios'
import { SIGNUP_SUCCESS } from './constants'

export default function localSignup(payload) {
  return async function (dispatch) {
    console.log('si', payload)
    return await axios
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
