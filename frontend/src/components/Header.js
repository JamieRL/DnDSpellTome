import React from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
const Header = styled.div`
  color: #e62212;
  width: 100%;
  font-family: Copperplate-Bold;
  margin-top: 0;
  height: 3rem;
  z-index: 5;
  background-color: black;
  position:absolute;
  top:0;
  padding-top:3vh;
  left:0;
  right:0;
  font-size:110%;
  h2{
    position:absolute;
    width:100%;
    top:0;
    padding-bottom:0.5rem;
    right:0;
    left:0;
  }
  a,p {
    position:absolute;
    top: 0;
    right:0;
    color: #e62212;
    width: 20%
    float:right;
    margin-top:0.4rem;
    text-decoration:none !important;
  }
`

function HeaderComponent(props) {


  function onLogout() {
    Cookies.remove('x-access-token')
    Cookies.remove('username')
    window.location.reload()
  }

  function goHome() {
    props.history.push('/')
  }

  const token = Cookies.get('x-access-token')

  const login = <p><a href='/login'>Login</a></p>
  const logout = <p onClick={() => onLogout()}>Logout</p>

  return (
    <Header>

      <h2 onClick={() => goHome()}>5e Spell-Tome</h2>
      {props.showLogin ? (token ? logout : login) : null}
    </Header>
  )
}

export default HeaderComponent
