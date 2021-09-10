import NavBar from '../NavBar/NavBar'
import './Login.module.css'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import localLogin from '../../actions/login'

export default function Login({ validateEmail, errors, handleChange }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [inputs, setInputs] = useState({ email: '', password: '' })
  // const [error, setError] = useState({ emailError: false, passError: false })

  // function handleChange(e) {
  //   setInputs({ ...inputs, [e.target.name]: e.target.value })
  //   // setError({
  //   //   emailError: validateEmail(inputs.email).error,
  //   //   passError: !inputs.password.length,
  //   // })
  //   if (validateEmail(inputs.email)) {
  //     errors.email = 'Insert a valid email'
  //   }
  // }

  function handleSubmit(e) {
    console.log('Estos son los inputs al momento del login =>', inputs)
    e.preventDefault()
    dispatch(localLogin(inputs))
    setInputs({ email: '', password: '' })
    history.push('/')
  }

  return (
    <div className='App'>
      <NavBar />
      <header className='App-header'>
        <h1>Login</h1>
        <form action='' noValidate autoComplete='off' onSubmit={handleSubmit}>
          <div>
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              error={validateEmail(inputs.email)}
              id='email'
              name='email'
              label='E-mail'
              value={inputs.email}
              variant='outlined'
              // helperText={validateEmail(inputs.email)?.message}
              helperText={errors?.email}
            />
          </div>
          <div>
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              id='password'
              name='password'
              label='Password'
              value={inputs.password}
              variant='outlined'
              type='password'
            />
          </div>

          <div>
            <Button
              variant='contained'
              color='primary'
              // disabled={!error.emailError && !error.passError ? false : true}
              type='submit'
            >
              Login
            </Button>
          </div>
        </form>

        <div className='LoginDiv'>
          <a href='http://localhost:8001/auth/google'>Log in with Google</a>
        </div>
      </header>
    </div>
  )
}
