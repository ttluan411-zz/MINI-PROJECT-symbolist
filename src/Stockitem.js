import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css'

export default function Stockitem( props ){
    console.log( props )
    return (
       <table className="row">
              {props.name}<br/>
              {parseInt(props.price).toFixed(2)}<br/>
              {parseInt(props.volume)}<br/>
              {parseInt(props.oneYearPrice).toFixed(2)}<br/>
              {parseInt(props.oneYearVolume)}<br/>
              {((props.price - props.oneYearPrice) / props.oneYearPrice).toFixed(2)}<br/>
              <button className = "SaveButton" onClick={() => props.saveStock()} type="button">Save</button>
     </table>
    )
}