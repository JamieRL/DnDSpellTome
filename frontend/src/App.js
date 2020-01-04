import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Header from './components/Header'
import * as Pages from './pages'
import styled from 'styled-components'

function App() {

  const Main = styled.div`
  background-color: black;
  color: white;
  height: 100vh;
  text-align:center;
  font-size: 1rem;
  `
  const Header = styled.h1`
  color: #e62212;
  width: 100%;
  cursor: pointer;
  font-family: Copperplate-Bold;
  `
  return (
    <div>
      <Main>
        <Router>
          <Header>
            D&D Spell-Tome
          </Header>
          <Switch>
            <Route path="/login" component={Pages.Login}/>
            <Route path="/" component={Pages.Main}/>
          </Switch>
        </Router>
      </Main>
    </div>
  );
}

export default App;


/*<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>*/
