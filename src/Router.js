import React from 'react';
import { Route, Switch} from 'react-router-dom';
import About from './About';
import Brokers from './Brokers';
import ContactUs from './ContactUs';
import Task from './Task';
export default (
    <Switch>
        <Route component= {Task} exact path="/" />
        <Route component= {About} path="/about"/>
        <Route component= {Brokers} path="/brokers"/>
        <Route conponent= {ContactUs} path="/contactus"/>
    </Switch>
)