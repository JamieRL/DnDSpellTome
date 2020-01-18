import fetch from 'isomorphic-fetch'

const DND_API_URL = 'https://api.open5e.com/'//'http://www.dnd5eapi.co/api/'


function addFavourite(spellName, spellSlug) {
  return fetch('/api/myspells', {
    method: 'POST',
    body: JSON.stringify({
      name: spellName,
      slug: spellSlug
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function removeFavourite(spellName, spellSlug) {
  return fetch('/api/myspells', {
    method: 'DELETE',
    body: JSON.stringify({
      name: spellName,
      slug: spellSlug
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
function login(username, password) {

  return fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function register(username, password, confirmPassword) {
  return fetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function buildRoute(type, queryString, multi=false) {
  if(multi) {
    let query = queryString.join('%2C')
    return DND_API_URL+type+'/?slug__in='+query
  }
  let query = queryString.split(' ').join('+')
  return DND_API_URL+type+'/?search='+query
}

function fetchSpellData(query) {
  return fetch(buildRoute('spells', query),{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function fetchFavouriteSpells(favourites) {
  let query = []
  favourites.forEach(fave => {
    query.push(fave.slug)
  })
  return fetch(buildRoute('spells', query, true), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


function getFavouriteSpells() {
  return fetch('/api/myspells', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export {
  login,
  register,
  fetchSpellData,
  getFavouriteSpells,
  fetchFavouriteSpells,
  addFavourite,
  removeFavourite
}
