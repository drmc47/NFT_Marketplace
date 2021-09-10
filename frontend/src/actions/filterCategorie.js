import axios from "axios";

export function filterByCategories(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:8001/nfts");
      // if(payload === "all") {
      //   let filterCat = response.data
      // } else {
      //   let filterCat = response.data.filter((i) => i.categories === payload);
      // }
      const filterCat = await payload === 'all' ? response.data
        : response.data.filter((i) => i.categories === payload);
        console.log(payload);
        console.log(filterCat);
      return dispatch({
        type: "FILTER_CATEGORIE",
        payload: filterCat,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

