import React, { useState } from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

export default function LoginSection() {
  const [signup, setSignup] = useState(false)

  const validateEmail = (input) => {
    return {
      error: !/\S+@\S+\.\S+/.test(input),
      message: !/\S+@\S+\.\S+/.test(input) ? 'Please enter a valid email' : '',
    }
  }

  return (
    <div>
      {signup ? (
        <Signup validateEmail={validateEmail} />
      ) : (
        <Login validateEmail={validateEmail} />
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
