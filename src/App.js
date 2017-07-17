import React, {Component} from 'react';
import route from './Router';
import Header from './Header';
import {HashRouter} from 'react-router-dom';
import './main.css';

export default class App extends Component {
   render() {
    return (
    <HashRouter>
         <div className="wrapper">
            <Header/>
            {route}
         </div>
    </HashRouter>
    )
   }
}