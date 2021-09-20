import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderShoppingCart } from "../../actions/getOrderShoppingCart";
import { removeLS } from "../../actions/removeLS";
import { getLS } from "../../actions/getLS";
import ShoppingCart from '../shoppingCart/shoppingCart'
import Payments from '../Payments/PaymentsButton/PaymentsButton'
import getClean from "../../actions/getClean"
import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './shoppingcart.css'
import cartDB  from '../../actions/shoppingCart/cartDB.js';
import { getNFTs } from '../../actions/getNFTs';
import removeItem from '../../actions/shoppingCart/removeItem'

export default function NavBarShoppingCart() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!userLogged){
            dispatch(getLS())
            dispatch(getNFTs())
        }else{           
            dispatch(cartDB({user:userLogged}))
            dispatch(getNFTs())
        }
    }, [dispatch]);
    
    const userLogged=JSON.parse(window.sessionStorage.getItem('userLogged'))
    const allNfts= useSelector(state => state.allNFTs)
    const allProductsCart = useSelector(state => state.shoppingTrolley)
    
    //FUNCION PARA OBTENER INFORMACION DE NFTS DEL CARRITO
    function userCartNfts(allNfts,ids){
        var cartNfts=[]       
        for (let i=0; i <=ids.length; i++){
          allNfts.filter((e)=>{if(e._id === ids[i])return cartNfts.push(e)})
          
        }
        return cartNfts
    }
    
    
        const handleCartClick = function (e) {
            /*         dispatch(getOrderShoppingCart()) */
            if(!userLogged){
                dispatch(removeLS(e))
            }else{            
                dispatch(removeItem({user:userLogged,item:e}))
            }
           /*  window.location.reload() */
        }
    const nftsData= userCartNfts(allNfts,allProductsCart)

   
    

    return ( 
        <div>
            <ShoppingCart />
            <div className="divOrder">
                <h6>Nombre</h6>
                <h6>Dueño</h6>
                <h6>Producto</h6>
                <h6> Precio </h6>
                <h6>Eliminar</h6>
            </div>
            {
                nftsData?.map(e => (
                    <div className="divOrder">
                        <div className="divData">
                            <h5>{e ? e.name : null}</h5>
                        </div>
                        <div className="divData">
                            <h5>{e ? e.owner : null}</h5>
                        </div>
                        <div className="divData">
                            <img src={e ? e.image : null} width="80px" height="80px" />
                        </div>
                        <div className="divData">
                            <h4>{e ? e.price : null}</h4>
                        </div>
                        <div className="divData">
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                <DeleteIcon
                                onClick={() => handleCartClick(e._id)}
                                />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                ))
            }
            <Payments />
        </div>
    )
}