import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './main.css'

export default function Input( props ){
    console.log( props.input );
    return (
        <div className="Input-section">
            <h1>Symbolist</h1>
              <div className="input-row">
                <input className = "InputBox" value={props.input} onKeyPress={props.handleEnter} type= "text" onChange={props.handleChange} placeholder="Enter symbol here" />
                {/*<button className = "InputButton" onClick={() => props.handleClick()} type="button">Enter</button>*/}
              </div>
        </div>
    )
}