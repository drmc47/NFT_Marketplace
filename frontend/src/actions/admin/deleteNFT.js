import axios from "axios";


export function deleteNFT(id) {
  return async function () {
    try {
      const category = await axios.delete('http://localhost:8001/categorie/'+id);
    } catch (error) {
      console.log(error);
    }
  };
};