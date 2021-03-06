import React from 'react'
import Cookies from 'js-cookie'
import * as API from '../api'
import * as Components from './mainComponents'
import SpellInfo from '../components/SpellInfo'
import Header from '../components/Header'

const OPTIONS = [{'name': 'Spells', 'url': 'spells'}, {'name': 'My Spells', 'url': 'spells'}]
const FAVOURITES = 1
const EMPTY = 0
const blackHeart = '\u2665';

class MainPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      tab: 0,
      favourites: [],
      spells: [],
      username: Cookies.get('username'),
      isLoading: false
    }

    if(this.state.tab === FAVOURITES) {
      this.fetchFavouriteData(this.state.favourites)
    }
  }

  componentWillMount() {
    this.getFavourites()

  }

  fetchFavouriteData(favourites) {
    if(favourites.length < 1) {
      this.setState({spells: EMPTY})
      return
    }
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
            this.setState({favourites: json, isLoading: false})
          }
        })
      })
    }
  }

  toggleFavourite(spellName, spellSlug) {
    if(this.state.isLoading) {
      return
    }
    let token = Cookies.get('x-access-token')
    if(!token) {
      window.alert('Sign in to save to My Spells')
      return
    }
    let found = this.state.favourites.find(fave => {
      return fave.slug === spellSlug
    })
    this.setState({isLoading: true})
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
          else {
            this.setState({ spells: EMPTY})
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
          <Components.SearchBox type='text' value={this.state.query} onChange={e => this.updateQuery(e)}/><br/>
          <Components.SearchButton onClick={() => this.fetchData()}>Search</Components.SearchButton>
        </form>
      </>
    )
  }

  renderSpells() {
    const favourites = this.state.favourites;
    const loggedIn = Cookies.get('username') || false
    if(this.state.tab === FAVOURITES && !loggedIn) {
      return (
        <h3>Log in to save spells to My Spells</h3>
      )
    }
    if(this.state.spells === EMPTY) {
      if(this.state.tab === FAVOURITES) {
        return <h3 className='noFavourites'>Add spells to <span className='heart'>{blackHeart+' '}</span>My Spells to save them here</h3>
      }
      return <h3>No spells found</h3>
    }
    return this.state.spells ? this.state.spells.map(spell => {
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
          isLoading={this.state.isLoading}
        />
      )
    }) : null
  }

  render() {
    const tabs = OPTIONS.map((option, index) => {
      if(index === this.state.tab) {
        return (
          <Components.TabSelected key={index} onClick={() => this.changeTab(index)}>{option.name}</Components.TabSelected>
        )
      }
      return (
        <Components.Tab key={index} onClick={() => this.changeTab(index)}>{option.name}</Components.Tab>
      )
    })

    return (
      <>
        <Header showLogin={true} {...this.props}/>
        <Components.Main>
          <Components.TabList>{tabs}</Components.TabList><br/>
          {this.state.tab === 0 ? this.renderSearch() : null}
          {this.renderSpells()}
        </Components.Main>
      </>
    )
  }
}

export default MainPage
