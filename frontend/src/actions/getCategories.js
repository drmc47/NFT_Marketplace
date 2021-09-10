import axios from "axios";
import { GET_CATEGORIES } from "./constants";

export function getCategories() {
  return async function (dispatch) {
    try {
      let categories = await axios.get("http://localhost:8001/categories");
      console.log(categories);
      return dispatch({
        type: GET_CATEGORIES,
        payload: categories,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

