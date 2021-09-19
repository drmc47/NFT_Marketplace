import React, { useState } from "react";
import MercadoPago from '../MercadoPago/MercadoPago';
import MetaMask from '../MetaMask/MetaMask';
import Stripe from '../Stripe/Stripe';
import { makeStyles } from '@material-ui/core/styles'


  const useStyle = makeStyles({
  pay: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    margin: '10px',
  }
 })

function Payments() {
  const classes = useStyle()

  return (
        <div className={classes.pay}>
          <div className={classes.button}>
          <Stripe />
          </div>
          <div className={classes.button}>
          <MercadoPago />
          </div>
          <div className={classes.button}>
          <MetaMask />
          </div>
        </div>

  );
}

export default Payments;