import loginUser from "../services/auth/loginUser";

export default function localLogin(payload) {
  console.log("entre a localLogin")
  return async function (dispatch) {
    const response = await loginUser(payload);
    if (response) {
      const user = response;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
    } else {
      dispatch({
        type: "LOGIN_ERROR",
      });
    }
  };
}
