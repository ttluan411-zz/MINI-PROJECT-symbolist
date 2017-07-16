import React, {Component} from 'react';
import route from './Router';
import Header from './Header';
import {HashRouter} from 'react-router-dom';

export default class App extends Component {
   render() {
    return (
    <HashRouter>
         <div>
            <Header/>
            {route}
         </div>
    </HashRouter>
    )
   }
}