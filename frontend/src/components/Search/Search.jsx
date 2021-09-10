import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { getNFTByName } from "../../actions/getNFTByName";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  search: {
    maxWidth: "250px",
    position: 'fixed',
    right: "15px",
    marginBottom: "15px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    marginRight: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    color: "white",
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [inputName, setInputName] = useState("")

  function handleInput(e) {
    e.preventDefault()
    setInputName(e.target.value)

  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      dispatch(getNFTByName(inputName));
      setInputName("")
    }
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={inputName}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleInput(e)}
        onKeyPress={(e) => handleSubmit(e)}
      />
    </div>
  )
}
