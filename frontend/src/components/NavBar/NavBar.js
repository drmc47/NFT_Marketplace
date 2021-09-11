import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logout from '../../actions/logout'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useTheme} from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from "@material-ui/core/IconButton";

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  button: {
    borderRadius: '50px',
    marginLeft: '25px',
    marginRight: '20px',
    fontFamily: 'Raleway',
    fontSize: '1rem',
    textTransform: 'none',
    height: '35px',
    color: 'white',
  },
  menu: {
    backgroundColor: theme.palette.common.green,
    // color: 'white',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  shoppingcart: {
    color: "black"
  }
}))

export default function NavBar() {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
  const [anchorEl, setanchorEl] = useState(null);
  const [open, setopen] = useState(false);

  const handleChange = (e, value) => {
    setValue(value)
  }

  const handleclick = (e) => {
    setanchorEl(e.currentTarget)
    setopen(true)
  }

  const handleClose = (e) => {
    setanchorEl(null)
    setopen(false)
    setValue(1)
  }

  const handleLogout = () => {
    dispatch(logout())
    setValue(0)
  }

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === '/categories' && value !== 1) {
      setValue(1)
    } else if (window.location.pathname === '/categories/all' && value !== 1) {
      setValue(1)
    } else if (
      window.location.pathname === '/categories/funny' &&
      value !== 1
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/categories/animals' &&
      value !== 1
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/categories/sport' &&
      value !== 1
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/categories/music' &&
      value !== 1
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/categories/cute' &&
      value !== 1
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/categories/abstractart' &&
      value !== 1
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/categories/utopy' &&
      value !== 1
    ) {
      setValue(1)
    } else if (window.location.pathname === '/contact' && value !== 2) {
      setValue(2)
    } else if (window.location.pathname === '/about' && value !== 3) {
      setValue(3)
    } else if (window.location.pathname === '/create' && value !== 4) {
      setValue(4)
    } else if (window.location.pathname === '/profile' && value !== 5) {
      setValue(5)
    }
  }, [value])

  const tabs = (
    <React.Fragment>
      <Tabs
              value={value}
              className={classes.tabContainer}
              onChange={handleChange}
              indicatorColor='secondary'
            >
              <Tab
                className={classes.tab}
                component={Link}
                to='/'
                label='Home'
              />
              <Tab
                aria-owns={anchorEl ? 'categoriesMenu' : undefined}
                aria-haspopup={anchorEl ? true : undefined}
                className={classes.tab}
                onMouseOver={(e) => handleclick(e)}
                component={Link}
                to='/categories'
                label='Categories'
              />

              <Tab
                className={classes.tab}
                component={Link} to='/contact'
                label='Contact'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/about'
                label='About Us'
              />
              {/* ADD */}
              {userLogged && (
                <Tab
                  className={classes.tab}
                  component={Link}
                  to='/create'
                  label='Create'
                />
              )}
              {userLogged && (
                <Tab
                  className={classes.tab}
                  component={Link}
                  to='/profile'
                  label='My Profile'
                />
              )}
            </Tabs>
            <Menu
              id='categoriesMenu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              classes={{ paper: classes.menu }}
              elevation={3}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to='/categories'
                classes={{ root: classes.menuItem }}
              >
                Categories
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to='/categories/all'
                classes={{ root: classes.menuItem }}
              >
                All NFTS
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                classes={{ root: classes.menuItem }}
                component={Link}
                to='/categories/funny'
              >
                Funny
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                classes={{ root: classes.menuItem }}
                component={Link}
                to='/categories/animals'
              >
                Animals
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                classes={{ root: classes.menuItem }}
                component={Link}
                to='/categories/sport'
              >
                Sport
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                classes={{ root: classes.menuItem }}
                component={Link}
                to='/categories/music'
              >
                Music
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                classes={{ root: classes.menuItem }}
                component={Link}
                to='/categories/cute'
              >
                Cute
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                classes={{ root: classes.menuItem }}
                component={Link}
                to='/categories/abstractart'
              >
                Abstract art
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                classes={{ root: classes.menuItem }}
                component={Link}
                to='/categories/utopy'
              >
                Utopy
              </MenuItem>
            </Menu>
           
              <IconButton component={Link}
                to='/shoppingcart'>
                <ShoppingCartIcon  
                />
              </IconButton>
           

            {userLogged ? (
              <Button
                component={Link}
                to='/'
                onClick={handleLogout}
                variant='contained'
                color='secondary'
                className={classes.button}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to='/login'
                variant='contained'
                color='secondary'
                className={classes.button}
              >
                Login
              </Button>
            )}
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed'>
          <ToolBar>
            <Typography variant='h5'>NFT MARKET</Typography>
            {matches? null : tabs}
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}