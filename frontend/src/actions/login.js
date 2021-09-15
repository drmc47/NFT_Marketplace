import loginUser from '../services/auth/loginUser'

export default function localLogin(payload) {
  return async function (dispatch) {
    const response = await loginUser(payload)
    if (response) {
      window.sessionStorage.setItem('userLogged', JSON.stringify(response))
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response,
      })
    } else {
      dispatch({
        type: 'LOGIN_ERROR',
      })
    }
  }
}
