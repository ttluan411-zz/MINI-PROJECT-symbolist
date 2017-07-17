import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './main.css'

export default function Watchlist( props ){
    return (
        <div className="BottomWrapper">
        <table className="Table">
            <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Volume</th>
                <th>1yr-Price</th>
                <th>1yr-Volume</th>
                <th>1yr-Return</th>
                <th>Action</th>
            </tr>
            {props.stocks.map((stock, index) => {
                console.log(typeof stock.price);
                console.log(typeof stock.oneYearPrice)
                return(
                 <tr>
                    <td>{stock.name} </td> 
                    <td>{Number(stock.price).toFixed(2)} </td>
                    <td>{Number(stock.volume)}</td>
                    <td>{Number(stock.oneYearPrice).toFixed(2)}</td> 
                    <td>{Number(stock.oneYearVolume)}</td> 
                    <td>{((Number(stock.price) - Number(stock.oneYearPrice)) / Number(stock.oneYearPrice)).toFixed(2)}</td>
                    <td><button className="SaveButton" onClick={()=> props.handleDelete(index)}>Remove</button></td>
                </tr>
                )
            })}
         </table>
         </div>
    )
}