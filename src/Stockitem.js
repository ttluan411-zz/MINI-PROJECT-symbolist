import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './main.css'

export default function Stockitem( props ){
    console.log( props )
    return (
       <table className="Stockitem">
           <tr >
               <th>Symbol</th>
               <th>Price</th>
               <th>Volume</th>
               <th>1yr-Price</th>
               <th>1yr-Volume</th>
               <th>1yr-Return</th>
               <th>Action</th>
            </tr>
            <tr>
                <td>{props.name}</td>
                <td>${Number(props.price).toFixed(2)}</td>
                <td>{Number(props.volume).toLocaleString()}</td>
                <td>${Number(props.oneYearPrice).toFixed(2)}</td>
                <td>{Number(props.oneYearVolume).toLocaleString()}</td>
                <td>{(((props.price - props.oneYearPrice) / props.oneYearPrice)* 100).toFixed(2)}%</td>
                <td> <button className = "SaveButton" onClick={() => props.saveStock()} type="button">Save</button></td>
            </tr> 
     </table>
    )
}