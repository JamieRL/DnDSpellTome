import React from 'react'
import styled from 'styled-components'

const Header = styled.h1`
color: #e62212;
width: 100%;
cursor: pointer;
font-family: Copperplate-Bold;
margin-top:0.5rem;
margin-bottom:4rem;
height: 3rem;
span{
  position:absolute;
  left:10%;
  right:10%;
}
a {
  color: #e62212;
  width: 20%
  float: right;
  font-size: 1rem;
  margin-top:0.7rem;
  text-decoration:none !important;
}
`

function HeaderComponent(props) {
  return (
    <Header>
      <span>5e Spell-Tome</span>
      {props.showLogin ? <a href='/login'>Login</a> : null}
    </Header>
  )
}

export default HeaderComponent
