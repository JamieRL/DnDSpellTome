import React from 'react'
import Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import {
  Redirect
} from "react-router-dom"
import styled from 'styled-components'

const OPTIONS = ['Spells', 'Traits']

const SearchBox = styled.input`
  text-align:center;
`

const TabList = styled.ul`
  list-style-type:none;
  display: inline;
  margin-bottom: 1rem;
  padding-inline-start: 0;
`
const Tab = styled.li`
  display:inline-block;
  color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.3rem;
  margin: 1rem;
`

const TabSelected = styled.li`
  display:inline-block;
  color: black;
  background-color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.3rem;
  margin: 1rem;
`
class MainPage extends React.Component {

  constructor(props) {
    super(props)
    let username = Cookies.get('username')
    this.state = {
      loggedIn: username ? true : false,
      query: '',
      tab: 0
    }
  }

  componentWillMount() {
    let username = Cookies.get('username')
    if(username) {
      fetch('/'+username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  renderRedirect() {
    return (
      <Redirect to={{ pathname: "/login"}} />
    )
  }

  updateQuery(e) {
    this.setState({'query': e.target.value})
  }
  changeTab(index) {
    console.log('index is', index)
    this.setState({'tab': index})
  }

  renderMainPage() {
    const tabs = OPTIONS.map((option, index) => {
      if(index === this.state.tab) {
        return (
          <TabSelected key={index} onClick={() => this.changeTab(index)}>{option}</TabSelected>
        )
      }
      return (
        <Tab key={index} onClick={() => this.changeTab(index)}>{option}</Tab>
      )
    })

    return (
      <>
        <div>Main Page</div>
        <TabList>{tabs}</TabList><br/>
        <SearchBox type='text' value={this.state.query} onChange={e => this.updateQuery(e)}/>
      </>
    )
  }
  render() {
    console.log('state', this.state)
    return (
      <div>
        {this.state.loggedIn ? this.renderMainPage() : this.renderRedirect()}
      </div>
    )
  }
}

export default MainPage
