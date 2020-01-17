import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import * as API from '../api'
import Cookies from 'js-cookie'
import Header from '../components/Header';
import history from '../history';

const LoginInput = styled.input`
  text-align: left;
  margin-bottom: 1rem;
`
const Login = styled.div`
  display: block;
  button{
    margin: 1rem;
    background-color:white;
  }
`

const ErrorText = styled.h3`
  color: red;
`

function LoginPage(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

  function onLogin() {
    setInvalidCredentials(false);
    API.login(username, password)
    .then((response) => {
      if(response.ok) {
        response.json()
        .then(json => {
          console.log('json', json)
          Cookies.set('x-access-token', json.token)
          history.push('/')
        })

      }
      else {
        setInvalidCredentials(true);
      }
    })
  }

  return (
    <>
      <Header showLogin={false}/>
      <Login>
        <h2>Login</h2>
        <label>Username: </label><LoginInput type='text' value={username} onChange={e => setUsername(e.target.value)}/><br/>
        <label>Password: </label><LoginInput type='password' value={password} onChange={e => setPassword(e.target.value)}/><br/>
        <button onClick={onLogin}>Login</button>
        {invalidCredentials ? (<ErrorText>Invalid Username or Password</ErrorText>) : null}
      </Login>
    </>
  )
}

export default LoginPage
