import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect,
} from 'react-router-dom'

import StackOverflow from './components/StackOverflow';
import Question from './components/AddQuestion/Question';
import ViewQuestion from './components/ViewQuestion';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component = {StackOverflow} />
          <Route exact path='/question/:id' component = {ViewQuestion} />
          <Route exact path='/add-question' component = {Question} />
          {/* <Route exact path='/question' component = {ViewQuestion} /> */}
        </Switch>
      </Router>
      {/* <Header /> */}
      {/* <StackOverflow /> */}
    </div>
  );
}

export default App;
