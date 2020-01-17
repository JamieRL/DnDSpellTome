import React from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
const Header = styled.h1`
  color: #e62212;
  width: 100%;
  font-family: Copperplate-Bold;
  padding-top:3rem;
  margin-top: 0;
  height: 3rem;
  z-index: 5;
  background-color: black;
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:0rem;
  span{
    font-size: 7.5vw;
    position:absolute;
    width:100%;
    top:0;
    padding-bottom:0.5rem;
    right:0;
    left:0;
  }
  a,p {
    position:absolute;
    top: 2%;
    right:0;
    color: #e62212;
    width: 20%
    float:right;
    font-size: 4vw;
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

  const token = Cookies.get('x-access-token')

  const login = <a href='/login'>Login</a>
  const logout = <p onClick={() => onLogout()}>Logout</p>

  return (
    <Header>

      <span>5e Spell-Tome</span>
      {props.showLogin ? (token ? logout : login) : null}
    </Header>
  )
}

export default HeaderComponent
