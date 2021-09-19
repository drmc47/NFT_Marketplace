import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TransactionMercadoPago } from "../../../actions/TransactionMercadoPago";
import { Button } from '@material-ui/core'

function MercadoPago() {

    const dispatch = useDispatch();
    const purchaseOrder = useSelector((state) => state.shoppingTrolley);
    console.log('purchaseOrder: ', purchaseOrder);

    return (
            <div>
                <Button className="button" onClick={() => dispatch(TransactionMercadoPago(purchaseOrder))}
                    color='primary' variant='contained'> MP
                </Button>
            </div>
    )
}

export default MercadoPago;