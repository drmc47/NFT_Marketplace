import React, { useState } from "react";
import MercadoPago from '../MercadoPago/MercadoPago';
import MetaMask from '../MetaMask/MetaMask';
import Stripe from '../Stripe/Stripe';
import './payments.css';

function Payments() {
  const [paymentOption, setPaymentOption] = useState(true);

  return (
    <div>
      <button className="payments" type="button" onClick={() => setPaymentOption(!paymentOption)} >
        {paymentOption ? 'Comprar' : 'Comprar'}
      </button>

      {paymentOption ? (
        <div >
        </div>
      ) : (
        <div className="paymentOption">
          <Stripe />
          <MercadoPago />
          <MetaMask />
        </div>
      )}
    </div>
  );
}

export default Payments;