import loginUser from "../services/auth/loginUser";

export default function localLogin(payload) {
    return async function (dispatch) {
    const response = await loginUser(payload);
<<<<<<< HEAD
    if (response) {
      const user = response;
      window.sessionStorage.setItem("userLogged", JSON.stringify(user))
      dispatch({
=======
    console.log(response,"responseeee")
      if (response) {
        dispatch({
>>>>>>> 4a04d769c1cbebd99cb458474012ae7c84d6e47f
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
