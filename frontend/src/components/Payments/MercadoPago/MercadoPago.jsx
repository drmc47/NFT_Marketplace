import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TransactionMercadoPago } from "../../../actions/TransactionMercadoPago";
import {getLS} from '../../../actions/getLS'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import { useSelector } from 'react-redux';
import axios from 'axios';

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

    const CheckOutMP = async function Redirect(pesos){
      const response  = await axios.post(`http://localhost:8001/MercadoPagoTransaction`, pesos)
      console.log('response: MP: ',response.data);
      //history.push(response.data);
      window.location.href = response.data;
    }

    return (
            <div>
                <button className="button" onClick={() => CheckOutMP(purchaseOrder)}>
                    Mercado Pago
                </button>
            </div>
    )
}

export default MercadoPago;