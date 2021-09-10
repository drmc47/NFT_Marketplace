const { Router } = require("express");
const router = Router();
const cors = require("cors");
const passport = require("passport");
const { transactionMetaMask } = require("../controllers/payments/crypto/transactionMetaMask");
const { StripePayment } = require("../controllers/payments/fiat/Stripe");
const { createOrder, getOrder } = require("../controllers/products/orders")
const { createProfile, getProfile } = require('../controllers/users/user')
const jwt = require("jsonwebtoken");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const {
  searchProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getNFTs,
} = require("../controllers/products/products");

// Routes
router.get("/search", searchProduct);
router.get("/nfts", getNFTs);
router.get("/nft/:id", getProductById);
router.get("/orderCart", getOrder)
router.get('/profile', getProfile)
router.post('/profile', createProfile)
router.post("/nft", createProduct);
router.post("/orderCart", createOrder)
router.post("/transactionMetamask", transactionMetaMask);
router.post("/transactionStripe", StripePayment);
router.put("/edit/:id", updateProductById);

router.delete("/admin/:id", deleteProductById); // RUTA DEL ADMIN
router.post(
  "/admin/create",
  passport.authenticate("local-signup", {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),
  async (req, res, next) => {
    res.json(req.user);
    //res.redirect(AL JOM DEL PROYECTO)
  }
);

router.delete("/delete/:id", deleteProductById);

//REGISTRO LOCAL
router.post(
  "/register",
  passport.authenticate("local-signup", {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),
  async (req, res, next) => {
    res.json(req.user);
    //res.redirect(AL JOM DEL PROYECTO)
  }
);

//INICIO DE SESION LOCAL

router.post(
  "/login",
  passport.authenticate("local-login", {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),
  async (req, res, next) => {
    try {
      if (req.error || !req.user) {
        const error = new Error("new Error");
        return next(error);
      }
      req.login(req.user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { _id: req.user.id, username: req.user.username };
        const token = jwt.sign({ user: body }, "superstringinhackeable");
        return res.send({ text: "Jelou tenes el token " + token });
      });
    } catch (error) {
      return next(error);
    }
  }
);

//INICIO DE SESION CON GOOGLE
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/laconchadesumadre",
    // successRedirect: 'http://localhost:3000/profile',
    passReqToCallback: true,
  }),
  async (req, res) => {
    const token = jwt.sign(
      { googleID: req.user.googleID },
      "superstringinhackeable",
      {
        expiresIn: 60 * 60 * 24, // equivalente a 24 horas
      }
    );
    res.send({ text: "Jelou tenes el token " + token });
    // res.redirect('http://localhost:3000/profile')
  }
);

router.use(cors(corsOptions));

module.exports = router;
