import axios from 'axios'
import { GET_NFT_BY_ID } from './constants'

export default function getNftDetail(id) {
  return function (dispatch) {
    return axios.get('http://localhost:8001/nft/' + id).then((nftById) => {
      dispatch({
        type: GET_NFT_BY_ID,
        payload: nftById.data,
      })
    })
  }
}
