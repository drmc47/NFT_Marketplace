import axios from "axios";


export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      const category = await axios.delete('http://localhost:8001/categorie/'+id);
     //
      // return "Deleted" +category.data
      // return dispatch({
      //   type: "GET_CATEGORIES",
      //   payload: [],
      // });
    } catch (error) {
      console.log(error);
    }
  };
};

