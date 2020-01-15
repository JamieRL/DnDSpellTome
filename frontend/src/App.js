import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import * as Pages from './pages'
import styled from 'styled-components'

function App() {

  useEffect(() => {
    // Update the document title using the browser API
    //document.body.style.backgroundColor = "black";
  });
  const Main = styled.div`
  background-color: black;
  color: white;
  height: 100vh;
  text-align:center;
  font-size: 1rem;
  letter-spacing: 0.5px;
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
