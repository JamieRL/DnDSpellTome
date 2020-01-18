import React, { useState } from 'react'
import styled from 'styled-components'
import * as API from '../api'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import history from '../history'

const RegistrationInput = styled.input`
  text-align: left;
  margin-bottom: 1rem;
`
const Register = styled.div`
  display: block;
  button{
    margin: 1rem;
    background-color:white;
  }
`

const ErrorText = styled.h3`
  color: red;
`

function RegistrationPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState('')
  function onSubmit() {
    if(password !== confirmPassword) {
      setErrors('Passwords do not match')
      return
    }
    setErrors('')
    API.register(username, password, confirmPassword)
    .then((response) => {
      if(response.ok) {
        response.json()
        .then(json => {
          Cookies.set('x-access-token', json.token)
          Cookies.set('username', json.username)
          history.push('/')
        })
      }
      else {
        response.json()
        .then(json => {
          setErrors(json.error)
        })
      }
    })

  }
  return (
    <>
      <Header {...props}/>
      <Register>
      <h2>Signup</h2>
      <label>Username: </label><RegistrationInput type='email' value={username} onChange={e => setUsername(e.target.value)}/><br/>
      <label>Password: </label><RegistrationInput type='password' value={password} onChange={e => setPassword(e.target.value)}/><br/>
      <label>Confirm Password: </label><RegistrationInput type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/><br/>

      <button onClick={onSubmit}>Login</button>
      {errors ? (<ErrorText>{errors}</ErrorText>) : null}
      </Register>
    </>
  )
}

export default RegistrationPage
