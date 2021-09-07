import axios from 'axios'
import { GET_NFT_BY_NAME } from './constants'

export function getNFTByName(name) {
  return function (dispatch) {
    return axios
      .get('http://localhost:8001/search?query=' + name)
      .then((NFTByName) => {
        dispatch({
          type: GET_NFT_BY_NAME,
          payload: NFTByName.data,
        })
      })
  }
}
