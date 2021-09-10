const Stripe = require('stripe');
const stripe = new Stripe("sk_test_51JW0tcIjGDmG2UQfViGd7rcWR8FxrqAZLlj4BOh6MPkag7pIGxLqAAi0KoUw446WyFv5cM0LEuhw4Y1h210hyfqm00UO1p7kG7");

async function StripePayment (req, res){

   try {
    const { id, amount, currency, description } = req.body
    const payment =  await stripe.paymentIntents.create({
         payment_method: id,
         amount: 10000,
         currency: "USD",
         description: "soy una compra de NFT",
         confirm: true,
    });

      console.log(req.body)
      console.log(payment);
    res.json(payment);

 } catch (error){
    console.log(error);
    res.json({message: err.raw.message});
 }

}

module.exports =  {StripePayment};