import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/ui/Theme"
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Error from './components/Error/Error.jsx'
import NavBar from './components/NavBar/NavBar.js'
import Categories from './components/categories/categories.jsx'
import All from './components/categories/all.jsx'
import SuperRare from './components/categories/superarrare.jsx'
import MakersPlace from './components/categories/makersplace.jsx'
import Rarible from './components/categories/rarible.jsx'
import GodSunchained from './components/categories/godsunchained.jsx'
import AutoGlyphs from './components/categories/autoglyphs.jsx'
import Cryptokitties from './components/categories/cryptokitties.jsx'
import Artblocks from './components/categories/artblocks.jsx'
import Create from './components/create/create.jsx'
import Profile from './components/profile/profile.jsx'
import Contact from './components/contact/contact.jsx'
import About from './components/about/about.jsx'
import NftDetail from './components/NftDetail/NftDetail'
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path="/nft/:id" component={NftDetail} />
        <Route exact path='/categories' component={Categories}></Route>
        <Route exact path='/categories/all' component={All}></Route>
        <Route exact path='/categories/superrare' component={SuperRare}></Route>
        <Route exact path='/categories/makersplace' component={MakersPlace}></Route>
        <Route exact path='/categories/rarible' component={Rarible}></Route>
        <Route exact path='/categories/godsunchained' component={GodSunchained}></Route>
        <Route exact path='/categories/autoglyphs' component={AutoGlyphs}></Route>
        <Route exact path='/categories/cryptokitties' component={Cryptokitties}></Route>
        <Route exact path='/categories/artblocks' component={Artblocks}></Route>
        <Route exact path='/create' component={Create}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/contact' component={Contact}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route path='/*' component={Error}></Route>
      </Switch>
    </ThemeProvider>
  )
}

export default App;