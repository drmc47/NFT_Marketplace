const Stripe = require('stripe');
const cors = require('cors');

const stripe = new Stripe("sk_test_51JW0tcIjGDmG2UQfViGd7rcWR8FxrqAZLlj4BOh6MPkag7pIGxLqAAi0KoUw446WyFv5cM0LEuhw4Y1h210hyfqm00UO1p7kG7");


async function StripePayment (req, res){

const corsOptions ={
   origin:"http://localhost:3000", 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

 // Use this after the variable declaration

//app.use(cors({origin: 'http://Localhost:3000'}))

 try{
    const { id, amount } = req.body
    const payment =  await stripe.paymentIntents.create({
        amount,
        currency: "AUD",
        description: "Sonic NFT",
        payment_method: id,
        confirm: true
    });

    console.log(req.body)
    console.log(payment);
    //res.send({message: 'Succesful payment'})
    res.json(payment);
 } catch (err){
    console.log(err);
    res.json({message: err.raw.message});
 }

}

module.exports =  {StripePayment};