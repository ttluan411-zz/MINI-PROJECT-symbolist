import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css'

export default function Watchlist( props ){
    console.log( props )
    return (
        


        <table className="Table">
            <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Volume</th>
                <th>1yr-Price</th>
                <th>1yr-Volumn</th>
                <th>Return</th>
                <th>Remove</th>
            </tr>
            {props.stocks.map((stock, index) => {
                return(
                 <tr>
                    <td>{stock.name}</td> 
                    <td>{stock.price}</td> 
                    <td>{stock.volume}</td>
                    <td>{stock.oneYearPrice}</td> 
                    <td>{stock.oneYearVolume}</td> 
                    <td>{((props.price - props.oneYearPrice) / props.oneYearPrice).toFixed(2)}</td>
                    <td><button>Remove</button></td>
                </tr>
                )
            })}
         </table>
    )
}