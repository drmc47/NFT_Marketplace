import React from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

function MercadoPago() {

    const purchaseOrder = useSelector((state) => state.shoppingTrolley);
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