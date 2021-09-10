import NavBar from '../NavBar/NavBar'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import localSignup from '../../actions/signup'

export default function Signup({ validateEmail }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [error, setError] = useState({ emailError: false, passError: false })

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    setError({
      emailError: validateEmail(inputs.email).error,
      passError: !inputs.password.length,
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(localSignup(inputs))
    setInputs({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    })
    history.push('/')
  }
  return (
    <div className='App'>
      <NavBar />
      <header className='App-header'>
        <form action='' noValidate autoComplete='off' onSubmit={handleSubmit}>
          <div>
            <TextField
              onChange={(e) => handleChange(e)}
              error={error.emailError}
              id='email'
              name='email'
              label='E-mail'
              value={inputs.email}
              variant='outlined'
              helperText={validateEmail(inputs.email)?.message}
            />
          </div>
          <div>
            <TextField
              onChange={(e) => handleChange(e)}
              id='username'
              name='username'
              label='Username'
              value={inputs.username}
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              onChange={(e) => handleChange(e)}
              id='password'
              name='password'
              label='Password'
              value={inputs.password}
              variant='outlined'
              type='password'
            />
          </div>
          <div>
            <TextField
              onChange={(e) => handleChange(e)}
              id='passwordValidation'
              name='passwordValidation'
              label='Confirm password'
              value={inputs.passwordValidation}
              variant='outlined'
            />
          </div>

          <div>
            <Button
              variant='contained'
              color='primary'
              disabled={!error.emailError && !error.passError ? false : true}
              type='submit'
            >
              Sign up
            </Button>
          </div>
        </form>

        <div className='LoginDiv'>
          <a href='http://localhost:8001/auth/google'>Signup with Google</a>
        </div>
      </header>
    </div>
  )
}
