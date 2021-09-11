import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/ui/Theme'
import { Route, Switch } from 'react-router-dom'
// import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Error from './components/Error/Error.jsx'
import NavBar from './components/NavBar/NavBar.js'
import Categories from './components/categories/categories.jsx'
import All from './components/categories/all.jsx'
import Funny from './components/categories/Funny.jsx'
import Animals from './components/categories/Animals.jsx'
import Sport from './components/categories/Sport.jsx'
import Music from './components/categories/Music.jsx'
import Cute from './components/categories/Cute.jsx'
import Abstractart from './components/categories/Abstractart.jsx'
import Utopy from './components/categories/Utopy.jsx'
import Create from './components/create/create.jsx'
import Profile from './components/profile/profile.jsx'
import Contact from './components/contact/contact.jsx'
import About from './components/about/about.jsx'
import NftDetail from './components/NftDetail/NftDetail'
import NavBarShoppingCart from "./components/NavBarShoppingCart/shoppingcart.jsx"
import './App.css'
import LoginSection from './components/LoginSection/LoginSection'
import AdminProfile from './components/Admin/admin'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/nft/:id' component={NftDetail} />
        <Route path='/categories/nft/:id' component={NftDetail} />
        <Route exact path='/categories' component={Categories}></Route>
        <Route exact path='/categories/all' component={All}></Route>
        <Route exact path='/categories/funny' component={Funny}></Route>
        <Route exact path='/categories/animals' component={Animals}></Route>
        <Route exact path='/categories/sport' component={Sport}></Route>
        <Route exact path='/categories/music' component={Music}></Route>
        <Route exact path='/categories/cute' component={Cute}></Route>
        <Route exact path='/admin'component={AdminProfile}></Route>
        <Route
          exact
          path='/categories/abstractart'
          component={Abstractart}
        ></Route>
        <Route exact path='/categories/utopy' component={Utopy}></Route>
        <Route exact path='/create' component={Create}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/contact' component={Contact}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/shoppingcart' component={NavBarShoppingCart}></Route>
        <Route exact path='/login' component={LoginSection}></Route>
        <Route path='/*' component={Error}></Route>
      </Switch>
    </ThemeProvider>
  )
}

export default App
