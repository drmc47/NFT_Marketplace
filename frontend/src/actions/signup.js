import axios from 'axios'

export default async function localSignup(payload) {
    const response = await axios.post('localhost:8001/register', payload)
    if (response.error) {
        return {
            type: 'SIGNUP_ERROR'
        }
    }
    return {
      type: 'SIGNUP_SUCCESS',
      payload
    }
  }