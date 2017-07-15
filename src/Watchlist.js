import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css'

export default function Watchlist( props ){
    console.log( props )
    return (
        <ul>
            {props.stocks.map((stock, index) => {
                return(
                 <li>
                    Symbol:{stock.name}, 
                    Price:{stock.price}, 
                    Volume:{stock.volume}, 
                    1-yr Price:{stock.oneYearPrice}, 
                    1-yr Volume:{stock.oneYearVolume}
                    1-yr Return: {((props.price - props.oneYearPrice) / props.oneYearPrice).toFixed(2)}
                </li>
                )
            })}
         </ul>
    )
}