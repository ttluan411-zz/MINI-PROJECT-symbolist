import React, { Component } from 'react';
// import { HashRouter, Route } from 'react-router-dom';
import {fetchStock, getStock} from './service'; 
import Input from './Input';
import Stockitem  from './Stockitem';
import Watchlist from './Watchlist';
import moment from 'moment';
import Header from './Header';
import route from './Router';
import './main.css';
import './reset.css';

export default class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
        sticker: '',
        input: '',
        name: '',
        price: '',
        volume: '',
        oneYearPrice: '',
        oneYearVolume: '',
        stocks: []
    }
    this.saveStock = this.saveStock.bind(this);
    this.pullStock = this.pullStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.pullOneYearStock = this.pullOneYearStock.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
    saveStock(){
      const newStock = {...this.state}
      delete newStock.stocks
        this.setState({
          stocks: [...this.state.stocks, newStock],
          sticker: '',
          input: '',
          name: '',
          price: '',
          volume: '',
          oneYearPrice: '',
          oneYearVolume: ''
        })
    }
    pullStock( stock = this.state.sticker ){
      fetchStock( stock ).then(result => {
        if(result["Error Message"]) {
          alert("Yo! it aint sticker")
        } else {
           var timeUpdate = result["Meta Data"]["3. Last Refreshed"]
        // console.log(timeUpdate)
        this.setState({
          name: result["Meta Data"]["2. Symbol"].toUpperCase(),
          price: result["Monthly Time Series"][timeUpdate]["1. open"],
          volume: result["Monthly Time Series"][timeUpdate]["5. volume"],
        })
        }
        
      })
    }
    pullOneYearStock(stock = this.state.sticker){
      getStock(stock).then(result => {
        if(result["Error Message"]) {
          alert("Yo! it aint sticker")
        } else {
        console.log(result)
        var timePast = moment(result["Meta Data"]["3. Last Refreshed"]).add(-1,'year').format("YYYY-MM-D")
          if (!result["Time Series (Daily)"][timePast]){
            timePast = moment(timePast).add(-2,'day').format("YYYY-MM-D")
            this.setState({
              oneYearPrice: result["Time Series (Daily)"][timePast]["1. open"],
              oneYearVolume: result["Time Series (Daily)"][timePast]["5. volume"]
            })
          } else if( result["Time Series (Daily)"][timePast] ){
            this.setState({
              oneYearPrice: result["Time Series (Daily)"][timePast]["1. open"],
              oneYearVolume: result["Time Series (Daily)"][timePast]["5. volume"]
            })
        }
        }
      })
    }
    handleEnter(e){
      if (e.key ==='Enter'){
          this.setState({ 
            sticker: this.state.input, 
            input: '' 
          })
          this.pullOneYearStock( this.state.input );
          this.pullStock( this.state.input );
        }
      }
    handleChange(e){
      this.setState({input: e.target.value})
    }
  //  componentDidMount(){
  //    this.pullStock()
  //    this.pullOneYearStock()
  // }
    handleDelete(index){
      const newStocks = [...this.state.stocks]
      newStocks.splice(index,1);
      this.setState({
        stocks: newStocks
      })      
    }
    
  render() {
    return (
      <div className="Task">
        <div className="top">
        <Input handleEnter={this.handleEnter} input={this.state.input} handleChange={this.handleChange} />
            {!this.state.sticker ? null : 
              <Stockitem {...this.state} saveStock={this.saveStock}/>
            }
          </div>
          <div className="bottom">
              {
                this.state.stocks.length === 0 ? null : 
              <Watchlist stocks={this.state.stocks} handleDelete={this.handleDelete}/>
              }
          </div>
      </div>
    )
  }
}
