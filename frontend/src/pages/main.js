import React from 'react'
import Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import * as API from '../api'
import styled from 'styled-components'
import SpellInfo from '../components/SpellInfo'
import Header from '../components/Header'

const OPTIONS = [{'name': 'Spells', 'url': 'spells'}, {'name': 'My Spells', 'url': 'spells'}]
const FAVOURITES = 1

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
    this.state = {
      query: '',
      tab: 0,
      favourites: [],
      spells: []
    }
    console.log('constructor')
    if(this.state.tab === FAVOURITES) {
      this.fetchFavouriteData(this.state.favourites)
    }
  }

  componentWillMount() {
    this.getFavourites()

  }

  fetchFavouriteData(favourites) {
    console.log('getting favourite spells data', favourites)
    API.fetchFavouriteSpells(favourites)
    .then(res => {
      res.json()
      .then(json => {
        if(res.ok) {
          if(json.results.length > 0) {
              this.setState({spells: json.results})
          }

        }
      })
    })
  }

  getFavourites() {
    let token = Cookies.get('x-access-token')
    if(token) {
      API.getFavouriteSpells()
      .then(res => {
        res.json()
        .then(json => {
          if(res.ok) {
            this.setState({favourites: json})
          }
        })
      })
    }
  }

  toggleFavourite(spellName, spellSlug) {
    let found = this.state.favourites.find(fave => {
      return fave.slug === spellSlug
    })
    if(found) {
      API.removeFavourite(spellName, spellSlug)
      .then((res) => {
        this.getFavourites()
      })
    }
    else {
      API.addFavourite(spellName, spellSlug)
      .then(res => {
        this.getFavourites()
      })
    }
  }

  fetchData() {
    API.fetchSpellData(this.state.query)
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

  updateQuery(e) {
    this.setState({'query': e.target.value})
  }

  changeTab(index) {
    this.setState({
      'tab': index,
      'spells': []
    })
    if(index === FAVOURITES){
      this.fetchFavouriteData(this.state.favourites)
    }
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

  render() {
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

    const favourites = this.state.favourites;

    const spells = this.state.spells ? this.state.spells.map(spell => {
      let isFavourite = false;
      for(var i = 0; i < favourites.length; i++) {
        if(favourites[i].slug === spell.slug){
          isFavourite = true
          break
        }
      }
      return (
        <SpellInfo
          spell={spell}
          isFavourite={isFavourite}
          toggleFavourite={(name, slug) => this.toggleFavourite(name, slug)}
        />
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
}

export default MainPage
