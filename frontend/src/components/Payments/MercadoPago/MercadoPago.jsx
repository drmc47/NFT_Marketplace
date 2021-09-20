import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TransactionMercadoPago } from "../../../actions/TransactionMercadoPago";
import {getLS} from '../../../actions/getLS'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import  { useEffect } from 'react'


function MercadoPago() {
    
    const dispatch = useDispatch();
    const userLogged= useSelector((state) => state.userLogged);
    const purchaseOrder = useSelector((state) => state.shoppingTrolley);
    useEffect(() => {
        if(!userLogged){
            dispatch(getLS())
        }else{
            
            dispatch (cartDB(userLogged))
        }
    
    }, [dispatch])
    console.log('purchaseOrder: ', purchaseOrder);

    return (
            <div>
                <button className="button" onClick={() => dispatch(TransactionMercadoPago(purchaseOrder))}>
                    Mercado Pago
                </button>
            </div>
    )
}

export default MercadoPago;