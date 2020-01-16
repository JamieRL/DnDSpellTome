import React from 'react'
import Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import {
  Redirect
} from "react-router-dom"
import styled from 'styled-components'
import SpellInfo from '../components/SpellInfo'
import Header from '../components/Header'

const DND_API_URL = 'https://api.open5e.com/'//'http://www.dnd5eapi.co/api/'

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

const SearchButton = styled.h3`
  color:white;
  border: 1px solid #ffffff;
  border-radius: 0.5px;
  width: 20%;
  margin:auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
class MainPage extends React.Component {

  constructor(props) {
    super(props)
    let username = Cookies.get('username')
    this.state = {
      loggedIn: username ? true : false,
      query: '',
      tab: 0,
      favourites: [],
      spells: []
    }
  }

  componentWillMount() {
    let token = Cookies.get('x-access-token')
    if(token) {
      fetch('/api/myspells', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        res.json()
        .then(json => {
          console.log('jsonn', json)
          if(res.ok) {
            this.setState({favourites: json})
          }
        })
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
    let query = this.capitalizeWords(this.state.query.split(' ')).join('+')
    return DND_API_URL+type+'/?search='+query
  }

  fetchData() {
    fetch(this.buildRoute(OPTIONS[this.state.tab].url),{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response.json()
      .then(json => {
        if(response.ok) {
          if(json.results.length > 0) {
            this.setState({ spells: json.results})
          }
        }
        else {
           Promise.reject(json)
        }
      })
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
          <SearchButton onClick={() => this.fetchData()}>Search</SearchButton>
        </form>
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

    const spells = this.state.spells ? this.state.spells.map(spell => {
      let isFavourite = this.state.favourites.find(fave => {
        return fave.slug === spell.slug
      })
      return (
        <SpellInfo spell={spell} isFavourite={isFavourite}/>
      )
    }) : null

    return (
      <>
        <Header showLogin={true} />
        <Main>
          <div>Main Page</div>
          <TabList>{tabs}</TabList><br/>
          {this.state.tab === 0 ? this.renderSearch() : null}
          {spells}
        </Main>
      </>
    )
  }
  render() {
    return (
      <div>
        {this.renderMainPage()}
      </div>
    )
  }
}

export default MainPage
