import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { getCleanUser } from "../actions/getClean";
import { useDispatch } from "react-redux";
import { ListItemSecondaryAction } from "@material-ui/core";




const PrivateRoute = ({ component: Component, ...rest }) => {
  const usuario = useSelector(state=>state.role)
  console.log(usuario,"usuarioo desde privateroute")
  const dispatch = useDispatch();
//   useEffect(() => {
//   //   return () => {
//   //     dispatch(getCleanUser())
//   // }
// }, [dispatch])
  
    
    let auth=null
   
    if (usuario==='admin'){
        auth=true
    }
  
    
  return (
    <Route {...rest}>{auth ? <Component /> : <Redirect to="/error" />}</Route> 
  );
};

export default PrivateRoute;