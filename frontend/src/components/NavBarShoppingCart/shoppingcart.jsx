import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderShoppingCart } from "../../actions/getOrderShoppingCart";
import { removeLS } from "../../actions/removeLS";
import { getLS } from "../../actions/getLS";
import ShoppingCart from '../shoppingCart/shoppingCart'
import Payments from '../Payments/PaymentsButton/PaymentsButton'
import getClean from "../../actions/getClean"
import './shoppingcart.css'

export default function NavBarShoppingCart() {
    const dispatch = useDispatch();
    /*     useEffect(() => {
            dispatch(getOrderShoppingCart())
         }, [dispatch]) */
    useEffect(() => {
        dispatch(getLS())
    }, [dispatch])


    const handleCartClick = function () {
/*         dispatch(getOrderShoppingCart()) */
        dispatch(removeLS())
        dispatch(getLS())
        window.location.reload()
    }


    const allProductsCart = useSelector(state => state.shoppingTrolley)

    return (
        <div>
            <button onClick={() => handleCartClick()}>
               ¡ Delete your ShoppingCart !
            </button>
            <ShoppingCart />


            <div className="divOrder">
                <h6>Nombre</h6>
                <h6>Dueño</h6>
                <h6>Producto</h6>
                <h6> Precio </h6>
                <h6>Eliminar</h6>
            </div>
            {
                allProductsCart?.map(e => (
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
                            <h4>Quitar</h4>
                        </div>
                    </div>
                ))


            }
            <Payments />

        </div>
    )
}