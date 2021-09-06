import axios from "axios";
import {POST_NTF} from "./constants";
//comit
export const postNFT = (nft) => {
  console.log("ëntreeee")
  return async function (dispatch) {
    try {
      let response = await axios.post("http://localhost:8001/nft",nft);
      console.log(response.data,"este es rsponde");
      return dispatch({
        type: POST_NTF,
        payload: response.data,
      });
    } catch (error) {
      console.log(error,"soy errorrrrr");
    }
  };
};

