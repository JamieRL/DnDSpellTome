import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import Cookies from 'js-cookie'

const LoginInput = styled.input`
  text-align: center;
`
const Login = styled.div`
  display: block;
  button{
    margin: 1rem;
    background-color:white;
  }
`

function LoginPage(props) {

  const [username, setUsername] = useState('');
  const history = useHistory();

  function onLogin() {
    console.log('settings username')
    console.log(Cookies.get('username'))
    Cookies.set('username', username)
    history.push("/"+username);
  }
  return (
    <Login>
      <h2>Login</h2>
      <LoginInput type='text' value={username} onChange={e => setUsername(e.target.value)}/><br/>
      <button onClick={onLogin}>Login</button>
    </Login>
  )
}

export default LoginPage
