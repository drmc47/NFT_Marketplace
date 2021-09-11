import axios from "axios";

//
export function deleteNFT(ids) {
    console.log("esto me llega como ids",ids)
  return  function () {
    try {
      ids.map(id=> axios.delete('http://localhost:8001/admin/'+id))
     } catch (error) {
      console.log(error);
    }
  };
};
