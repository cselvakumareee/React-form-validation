import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.scss';
import FormComp from '../src/Form/Form';
import View from './View/View';
import reducer from '../src/Store/Reducer';
import excel from '../src/Assets/excel.svg';
import { Route, Switch, Link, NavLink } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <header className="app-header">
        <img src={excel} width="80px" height="80px"/>
        <h2>React Form</h2>
      </header>
      <main>
         
         <Switch>
           
         <Route path="/" exact component={FormComp} />
         <Route path= "/view" component={View} />
         </Switch>

      </main>
      <div className="app-footer">
         <button><NavLink to="/">Form</NavLink></button>
         <button><NavLink to="/view">View</NavLink></button>
      </div>
    </div>
  );
}

export default App;
