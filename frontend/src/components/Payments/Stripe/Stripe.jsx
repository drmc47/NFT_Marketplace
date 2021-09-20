import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { TransactionStripe } from "../../../actions/StripeTransaction";
import Button from '@material-ui/core/Button';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { makeStyles } from '@material-ui/core/styles';

import "./Stripe.css";
import {getLS} from '../../../actions/getLS'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import  { useEffect } from 'react'

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
function Stripe() {
  
  const userLogged= useSelector((state) => state.userLogged);
  const stripePromise = loadStripe("pk_test_51JW0tcIjGDmG2UQfAkI8szNjoLv5Ub72nxET50aEEsFKFgGGAZECrupO2Uxgp13JtpxGxSD2mtunzeSYWvK3WrJy00al1P3DwN");
  const dispatch = useDispatch();
  const purchaseOrder = useSelector((state) => state.shoppingTrolley);
  useEffect(() => {
    if(!userLogged){
        dispatch(getLS())
    }else{
        
        dispatch (cartDB(userLogged))
    }

}, [dispatch])

const [loading, setLoading] = useState(false);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const classes = useStyles();


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    console.log('handleSubmit funciona');
    e.preventDefault();

    //Generar Payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;

      try {

        let amount = {
            id,
            purchaseOrder
          }
          dispatch(TransactionStripe(amount));
          elements.getElement(CardElement).clear();

      } catch (error) {
        console.log(error);
      }
    }
  };

  const [StripeOption, setStripeOption] = useState(true);
 
  return (
    <div className="App">
      <button className="button" type="button" onClick={() => setStripeOption(!StripeOption)} >
        {StripeOption ? 'Stripe' : 'Stripe'}
      </button>

      {StripeOption ? (
        <div >

        </div>
      ) : (

    <div className="paymentOption">

        <header className="App-header">
          
        <form className={classes.root} noValidate autoComplete="off"  onSubmit={() => setLoading(!loading)}>
            <CreditCardIcon color="primary" size="large"/>
            <div className="form-group">
              <CardElement />
            </div>

            <div>   
                  <Button  color="primary"
                           variant="contained"
                           size="small"
                           onClick={(e) => handleSubmit(e)}
                           className="button" disabled={!stripe}>
                  {loading ? (
                      <div  role="status">
                        <span ></span>
                      </div>
                    ) : "Buy"}   
                  </Button>
              </div>
              
        </form>    
    </header>
    </div>    
      )}
    </div>
  );
};

  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Stripe;
