import React, { useState } from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

export default function LoginSection() {
  const [signup, setSignup] = useState(false)

  const errors = {}
  const validateEmail = (input) => !/\S+@\S+\.\S+/.test(input)
  const validatePassword = (input) => !/(?=.*[0-9])/.test(input)

  function handleChange(e, state, setState) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {signup ? (
        <Signup
          validateEmail={validateEmail}
          handleChange={handleChange}
          validatePassword={validatePassword}
        />
      ) : (
        <Login validateEmail={validateEmail} handleChange={handleChange} />
      )}

      <div>
        <button
          onClick={() => setSignup(!signup)}
          //   disabled={!error.emailError && !error.passError ? false : true}
        >
          {signup
            ? 'Already have an account? Login'
            : 'Are you new here? Create an account'}
        </button>
      </div>
    </div>
  )
}
