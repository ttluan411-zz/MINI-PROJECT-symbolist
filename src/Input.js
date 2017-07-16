import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css'

export default function Watchlist( props ){
    console.log( props );
    return (
        <div className="App-header">
              <h1>Symbolist</h1>
              <input className = "InputBox" type= "text" onChange={props.handleChange} placeholder="Enter symbol here" value={props.input}/>
              <button className = "InputButton" onClick={() => props.handleClick()} type="button">Enter</button>
            </div>
    )
}