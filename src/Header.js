import React, { Component } from 'react';
import About from './About';
import ContactUs from './ContactUs';
import Brokers from './Brokers';
import './main.css';
import { Link } from 'react-router-dom'

export default function Header(){
    return (
        <div className="Header">
            <Link className="nav" to="/">Home</Link>
           <Link className="nav" to="/about">About</Link>
           <Link className="nav" to="/brokers">Brokers</Link>
           <Link className="nav" to="/contactus">Contact Us</Link>           
        </div>
    )
}