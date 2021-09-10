import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderShoppingCart } from "../../actions/getOrderShoppingCart";
import ShoppingCart from '../shoppingCart/shoppingCart'
import Payments from '../Payments/PaymentsButton/PaymentsButton'
import getClean from "../../actions/getClean"
import './contact.css'

export default function Contact() {
    const dispatch = useDispatch();
    const allProductsCart = useSelector(state => state.shoppingCart)
    
    useEffect(() => {
        dispatch(getOrderShoppingCart())
        return () => {
          dispatch(getClean())
        }
      }, [dispatch])

    const misProductos = allProductsCart[0].items.map(e => e)

    return(
        <div>
            <ShoppingCart/>

    
                <div className="divOrder">
                    <h6>Nombre</h6>
                    <h6>Dueño</h6>
                    <h6>Producto</h6>
                    <h6> Precio </h6>
                    <h6>Eliminar</h6>
                </div>
            <div className="divOrder">

                <div className="divData">
                    <h5>{misProductos[0].name}</h5>
                </div>
                <div className="divData">
                    <h5>{misProductos[0].owner}</h5>
                </div>
                <div className="divData">
                    <img src={misProductos[0].image} width="80px" height="80px" />
                </div>
                <div className="divData">
                    <h4>{misProductos[0].price}</h4>
                </div>
                <div className="divData">
                    <h4>Quitar</h4>
                </div>
            </div>

            <div className="divOrder">
                <div className="divData">
                    <h5>{misProductos[1].name}</h5>
                </div>
                <div className="divData">
                    <h5>{misProductos[1].owner}</h5>
                </div>
                <div className="divData">
                    <img src={misProductos[1].image} width="80px" height="80px" />
                </div>
                <div className="divData">
                    <h4>{misProductos[1].price}</h4>
                </div>
                <div className="divData">
                    <h4>Quitar</h4>
                </div>
            </div>
                <Payments/>
        
        </div>
    )
}