const User= require("../../models/User");


async function getCart(req, res, next) {
    try {
      const userToken  = req.body.user; 
      const userCart = await User.findOne({token:userToken})
      return res.send(userCart.shoppingCart)     
    } catch (error) {
      next("Error");
      res.json(error);
    }
  }
 
  module.exports = {
   getCart
};
