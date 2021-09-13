export function removeLS() {
    window.localStorage.removeItem("user");
    return {
       type: "CONECT_LS",
    };
 }
 
 