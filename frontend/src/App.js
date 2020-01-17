import React from 'react';
import './App.css';
import { Router, Switch, Route, Link } from "react-router-dom"
import * as Pages from './pages'
import styled from 'styled-components'
import history from './history';

function App() {

  const Main = styled.div`
  background-color: black;
  color: white;
  height: 100vh;
  text-align:center;
  font-size: 1rem;
  letter-spacing: 0.5px;
  `
  return (

        <Router history={history}>
          <Switch>
            <Route path="/login" component={Pages.Login}/>
            <Route path="/" component={Pages.Main}/>
          </Switch>
        </Router>

  );
}

export default App;
