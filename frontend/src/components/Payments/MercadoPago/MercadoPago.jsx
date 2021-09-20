import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TransactionMercadoPago } from "../../../actions/TransactionMercadoPago";
import { Button } from '@material-ui/core'

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
                <Button className="button" onClick={() => dispatch(TransactionMercadoPago(purchaseOrder))}
                    color='primary' variant='contained'> MP
                </Button>
            </div>
    )
}

export default MercadoPago;