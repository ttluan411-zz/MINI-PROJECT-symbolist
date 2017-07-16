import React, { Component } from 'react';
import About from './About';
import ContactUs from './ContactUs';
import Brokers from './Brokers';
import './App.css';
import { NavLink } from 'react-router-dom'

export default function Header(){
    return (
        <div className="Header">
            <NavLink to="/">Home</NavLink>
           <NavLink to="/about">About</NavLink>
           <NavLink to="/brokers">Brokers</NavLink>
           <NavLink to="/contactus">Contact Us</NavLink>           
        </div>
    )
}