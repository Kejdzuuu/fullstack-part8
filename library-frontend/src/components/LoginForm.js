import React, { useEffect, useState } from 'react'
import { GET_USER, LOGIN } from '../queries'
import { useLazyQuery, useMutation } from '@apollo/client'

const LoginForm = ({ show, user, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)
  const [ queryUser, { data } ] = useLazyQuery(GET_USER)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('user-token', token)
      queryUser()
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  if (!show || user) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
