import axios from 'axios'
import { FILTER_BY_CATEGORY } from './constants'

export function filterByCategories(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get('http://localhost:8001/nfts')
      const filterCat =
        payload === 'all'
          ? response.data
          : response.data.filter((i) => i.dappSlug === payload)
      console.log(payload)
      console.log(filterCat)
      return dispatch({
        type: FILTER_BY_CATEGORY,
        payload: filterCat,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
