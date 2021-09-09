import axios from "axios";
import { SIGNUP_SUCCESS } from "./constants";

export default function localSignup(userInfo) {
  return async function (dispatch) {
    console.log("acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    return await axios
      .post("http://localhost:8001/register", userInfo)
      .then((data) => {
        console.log("data", data.data);
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: data.data,
        });
      });
  };
  // console.log("acaaaaaaaaaaaaaaa");
  // return function (dispatch) {
  //   return axios.post("localhost:8001/register", userInfo).then((data) => {
  //     console.log(data, "dataaaa");
  //     dispatch({ type: SIGNUP_SUCCESS, payload: data.data });
  //   });
  // };
}
// cosole.log(response.data, "holaaaaaaa");
// dispatch({
//   type: "SIGNUP_SUCCESS",
//   payload: response.data,
// });

// .then(data => dispatch{
//   type: 'LOGIN_SUCCESS',
//   payload: data
//   })
// export default async function localSignup(payload) {
//   console.log("holaaaaaaaaaaa");
//   const response = await axios.post("localhost:8001/register", payload);
//   console.log(response.data, "holaaaaa");
//   if (response.error) {
//     console.log("hellooo");
//     return {
//       type: "SIGNUP_ERROR",
//     };
//   }
//   return {
//     type: "SIGNUP_SUCCESS",
//     payload,
//   };
// }

// //export default function localSignup(userInfo) {
//   return (dispatch) => axios.post('localhost:8001/register', userInfo)
// }
