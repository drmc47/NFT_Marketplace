import loginUser from "../services/auth/loginUser";

export default function localLogin(payload) {
  return async function (dispatch) {
    const response = await loginUser(payload);
    if (response) {
      const user = response;
      window.sessionStorage.setItem("userLogged", JSON.stringify(user))
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
