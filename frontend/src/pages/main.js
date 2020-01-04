import React from 'react'
import Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import {
  Redirect
} from "react-router-dom"
import styled from 'styled-components'

import SpellSearch from '../components/SpellSearch'


const DND_API_URL = 'http://www.dnd5eapi.co/api/'

const OPTIONS = [{'name': 'Spells', 'url': 'spells'}, {'name': 'My Spells', 'url': 'spells'}]

const SearchBox = styled.input`
  text-align:center;
`
const Main = styled.div`
  button {
    margin-top: 1rem;
  }
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
      tab: 0,
      favourites: {}
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
      .then(json => {
        this.setState({'favourites': json.favourites})
      })
    }
  }

  capitalizeWords(words) {
    let capitalizedWords = []
    words.forEach(word => {
      capitalizedWords.push(word.charAt().toLowerCase()+word.slice(1))
    })
    return capitalizedWords
  }

  buildRoute(type) {
    let query = this.capitalizeWords(this.state.query.split(' ')).join('-')
    console.log('querry', query)
    return DND_API_URL+type+'/'+query
  }

  fetchData() {
    fetch(this.buildRoute(OPTIONS[this.state.tab].url),{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => {
      response.json()
      .then(json => response.ok ? this.setState({ data: json}) : Promise.reject(json))
    })
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
    this.setState({'tab': index})
  }

  renderSearch() {
    return (
      <>
        <form onSubmit={e => e.preventDefault()}>
          <SearchBox type='text' value={this.state.query} onChange={e => this.updateQuery(e)}/><br/>
          <button onClick={() => this.fetchData()}>Search</button>
        </form>
        <SpellSearch spell={this.state.data}/>
      </>
    )
  }

  renderMainPage() {
    const tabs = OPTIONS.map((option, index) => {
      if(index === this.state.tab) {
        return (
          <TabSelected key={index} onClick={() => this.changeTab(index)}>{option.name}</TabSelected>
        )
      }
      return (
        <Tab key={index} onClick={() => this.changeTab(index)}>{option.name}</Tab>
      )
    })

    return (
      <Main>
        <div>Main Page</div>
        <TabList>{tabs}</TabList><br/>
        {this.state.tab === 0 ? this.renderSearch() : null}

      </Main>
    )
  }
  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.loggedIn ? this.renderMainPage() : this.renderRedirect()}
      </div>
    )
  }
}

export default MainPage
