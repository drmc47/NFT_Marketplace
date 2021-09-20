import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postOrderShoppingCart } from "../../actions/postOrderShoppingCart";
import {getLS} from '../../actions/getLS'
import cartDB from '../../actions/shoppingCart/cartDB.js'
import  { useEffect } from 'react'

function OrderShoppingCart() {
  
  const dispatch = useDispatch();
  // const userLogged = useSelector((state) => state.userLogged);
  const userLogged=window.sessionStorage.getItem('userLogged')
  useEffect(() => {
    if(!userLogged){
      console.log('entro aca shipping cart ')
      dispatch(getLS())
    }else{
      
      dispatch (cartDB({user:userLogged}))
    }
    
  }, [dispatch])
  const purchaseOrder = useSelector((state) => state.shoppingTrolley);


  const handleSubmit = async function (e) {
      console.log("hice click para enviar la orden")
    e.preventDefault();
    const orderSubmit = {
        items: purchaseOrder
    }
    dispatch(postOrderShoppingCart(orderSubmit));
  };

  return (

        <div >
            <button type="submit" onClick={(e) => handleSubmit(e)}>
                Enviar Orden
            </button>
        </div>

  );
}

export default OrderShoppingCart;