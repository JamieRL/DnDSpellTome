import fetch from 'isomorphic-fetch'


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

export {
  login,
  addFavourite,
  removeFavourite
}
