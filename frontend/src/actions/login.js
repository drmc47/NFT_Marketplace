import loginUser from "../services/auth/loginUser";

export default function localLogin(payload) {
    return async function (dispatch) {
    const response = await loginUser(payload);
    console.log(response,"responseeee")
      if (response) {
        dispatch({
        type: "LOGIN_SUCCESS",
        payload: response,
      });
    } else {
      dispatch({
        type: "LOGIN_ERROR",
      });
    }
  };
}
