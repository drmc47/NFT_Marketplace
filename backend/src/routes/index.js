const { Router } = require("express");
const axios = require("axios");
const router = Router();
const auth = require("../controllers/user/auth.js");
const passport = require("passport");
const { isLoggedIn } = require("../controllers/user/isLoggedIn");
const { protected } = require("../controllers/apiGoogle/protected");
const cors = require('cors');
const corsOptions ={
  origin:"http://localhost:3000", 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const { transactionMetaMask } = require("../controllers/payments/crypto/transactionMetaMask");
const { StripePayment } = require("../controllers/payments/fiat/Stripe");


const {
  searchProduct,
  createProduct,
  getProductsApi,
  getProductsDb,
  getProductById,
  updateProductById,
  deleteProductById,
  getNFTs,
} = require("../controllers/products/products");
const login = require('../controllers/auth/login');
const register = require('../controllers/user/register');

// Routes
router.get("/search", searchProduct);
router.get("/nfts", getNFTs);
router.get("/nft/:id", getProductById);
router.post("/nft", createProduct);
router.post("/transaction", transactionMetaMask);
router.post('/auth/login', login);
router.post('/register', register);
router.post('/transactionStripe', StripePayment);
router.put("/edit/:id", updateProductById);
router.delete("/delete/:id", deleteProductById);
// router.use('/auth/google',isAuthenticated)
// router.use('/google/callback',googleCallback)
// router.use('/auth/failure', authFailure)
router.use("/protected", isLoggedIn, protected);

router.use(cors(corsOptions))

module.exports = router;

