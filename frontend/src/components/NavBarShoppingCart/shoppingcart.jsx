import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderShoppingCart } from "../../actions/getOrderShoppingCart";
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
        //window.localStorage.get('user')
    }, [dispatch])


    const handleCartClick = function () {
        dispatch(getOrderShoppingCart())
    }

    /*         const allProductsCart = useSelector(state => state.shoppingCart) */

    const allProductsCart = useSelector(state => state.shoppingTrolley)
    console.log("allProductsCart", allProductsCart)
    /*     const misProductos = allProductsCart?.map(e => e) */

    return (
        <div>
            <button onClick={() => handleCartClick()}>
                Mostrar carrito
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
                        {console.log("e.name",e.name)}
                        <div className="divData">
                            <h5>{e? e.name : null}</h5>
                        </div>
                        <div className="divData">
                            <h5>{e? e.owner : null}</h5>
                        </div>
                        <div className="divData">
                            <img src={e? e.image : null} width="80px" height="80px" />
                        </div>
                        <div className="divData">
                            <h4>{e? e.price : null}</h4>
                        </div>
                        <div className="divData">
                            <h4>Quitar</h4>
                        </div>
                    </div>
                ))


            }
            {/*             <div className="divOrder">

                <div className="divData">
                    <h5>{misProductos ? misProductos.name : null}</h5>
                </div>
                <div className="divData">
                    <h5>{misProductos ? misProductos.owner : null}</h5>
                </div>
                <div className="divData">
                    <img src={misProductos ? misProductos[0].image : null} width="80px" height="80px" />
                </div>
                <div className="divData">
                    <h4>{misProductos ? misProductos[0].price : null}</h4>
                </div>
                <div className="divData">
                    <h4>Quitar</h4>
                </div>
            </div> */}

            {/*             <div className="divOrder">
                <div className="divData">
                    <h5>{misProductos ? misProductos[1].name : null}</h5>
                </div>
                <div className="divData">
                    <h5>{misProductos ? misProductos[1].owner : null}</h5>
                </div>
                <div className="divData">
                    <img src={misProductos ? misProductos[1].image : null} width="80px" height="80px" />
                </div>
                <div className="divData">
                    <h4>{misProductos ? misProductos[1].price : null}</h4>
                </div>
                <div className="divData">
                    <h4>Quitar</h4>
                </div>
            </div> */}
            <Payments />

        </div>
    )
}