const { Router } = require('express')
const router = Router()
const cors = require('cors')
const passport = require('passport')
const {
  transactionMetaMask,
} = require('../controllers/payments/crypto/transactionMetaMask')
const { StripePayment } = require('../controllers/payments/fiat/Stripe')
const { createOrder, getOrder } = require('../controllers/products/orders')
const { createProfile, getProfile } = require('../controllers/users/user')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../controllers/middlewares/verifyToken')
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}
// PRUEBA NODEMAILER
const nodemailer = require('../libs/nodemailer')
//ADMIN
const {
  getUsers,
  updateAdminById,
  deleteUser,
  getUserById,
} = require('../controllers/Admin/admin')
//ROUTES ADMIN
router.get('/admin/users', getUsers)
router.get('/user/:id', getUserById)
router.put('/admin/edit/:username', updateAdminById)
router.delete('/deleteUser/:id', deleteUser)

//CATEGORIES
const {
  createCategorie,
  updateCategorieById,
  deleteCategorieById,
  getCategories,
} = require('../controllers/products/categorie')
//ROUTES CATEGORIES
router.get('/categories', getCategories)
router.post('/create/categorie', createCategorie)
router.put('/edit/categorie/:id', updateCategorieById)
router.delete('/categorie/:id', deleteCategorieById)

//PRODUCTS
const {
  searchProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getNFTs,
} = require('../controllers/products/products')
const verifyAdmin = require('../controllers/middlewares/verifyAdmin')

// ROUTES PRODUCTS
router.get('/search', searchProduct)
router.get('/nfts', getNFTs)
router.get('/nft/:id', getProductById)
router.get('/orderCart', getOrder)
router.post('/nft', createProduct)
router.post('/orderCart', createOrder)
router.post('/transactionMetamask', transactionMetaMask)
router.post('/transactionStripe', StripePayment)
router.put('/edit/:id', updateProductById)

//PRUEBA NODEMAILER
router.post('/email', nodemailer)

//ROUTES PROFILE
router.get('/profile', getProfile)
router.post('/profile', createProfile)

//1 admin crea categorias
//2 admin asigna roles a user
//3 modifica el fee (%comision)
//4 admin elimina nfts

router.delete('/admin/:id', deleteProductById) // RUTA DEL ADMIN
router.post(
  '/admin/create',
  passport.authenticate('local-signup', {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),
  async (req, res, next) => {
    res.json(req.user)
    //res.redirect(AL JOM DEL PROYECTO)
  }
)

router.delete('/delete/:id', deleteProductById)

//REGISTRO LOCAL
router.post(
  '/register',
  passport.authenticate('local-signup', {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),

  async (req, res, _next) => {
    return res.send(req.user)

    //res.redirect(AL JOM DEL PROYECTO)
  }
)

//INICIO DE SESION LOCAL

router.post(
  '/login',
  passport.authenticate('local-login', {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),
  async (req, res, next) => {
    try {
      if (req.error || !req.user) {
        const error = new Error('new Error')
        return next(error)
      }
      req.login(req.user, { session: false }, async (err) => {
        if (err) return next(err)
        const body = { _id: req.user.id, username: req.user.username }
        const token = jwt.sign({ user: body }, 'superstringinhackeable')
        const filter = { username: req.body.username }
        const update = { token: token }
        await User.findOneAndUpdate(filter, update, { new: true })
        return res.send(token)
      })
    } catch (error) {
      return next(error)
    }
  }
)

//INICIO DE SESION CON GOOGLE
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/rutadeerror',
    // successRedirect: 'http://localhost:3000/',
    passReqToCallback: true,
  }),
  async (req, res) => {
    res.send(req.user)
    // res.redirect('http://localhost:3000/profile')
  }
)

//PRUEBAS
router.get('/prueba', verifyAdmin)

router.use(cors(corsOptions))

module.exports = router
