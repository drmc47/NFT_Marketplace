import NavBar from '../NavBar/NavBar'
import './Login.module.css'
import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import localLogin from '../../actions/login'

export default function Login({ invalidEmail, handleChange, handleSubmit }) {
  const [inputs, setInputs] = useState({ email: '', password: '' })

  return (
    <div className='App'>
      <NavBar />
      <header className='App-header'>
        <h1>Login</h1>
        <form
          action=''
          noValidate
          autoComplete='off'
          onSubmit={(e) => handleSubmit(e, localLogin, inputs)}
        >
          <div>
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              error={inputs.email && invalidEmail(inputs.email)}
              id='email'
              name='email'
              label='E-mail'
              value={inputs.email}
              variant='outlined'
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
              disabled={invalidEmail(inputs.email) && !inputs.password.length}
              type='submit'
            >
              Login
            </Button>
          </div>
        </form>

        <Button className='LoginDiv' variant='contained' color='secondary'>
          <a href='http://localhost:8001/auth/google'>Log in with Google</a>
        </Button>
      </header>
    </div>
  )
}
