import React, { Component } from 'react';
// import { HashRouter, Route } from 'react-router-dom';
import {fetchStock, getStock} from './service'; 
import Input from './Input';
import Stockitem  from './Stockitem';
import Watchlist from './Watchlist';
import moment from 'moment';
import Header from './Header';
import route from './Router';
import './App.css';
import './reset.css';

export default class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
        sticker: 'AAPL',
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
    this.handleClick = this.handleClick.bind(this);
    this.pullOneYearStock = this.pullOneYearStock.bind(this);
  }
    saveStock(){
      const newStock = {...this.state}
      delete newStock.stocks
        this.setState({
          stocks: [...this.state.stocks, newStock]
        })
    }
    pullStock( stock = this.state.sticker ){
      fetchStock( stock ).then(result => {
        var timeUpdate = result["Meta Data"]["3. Last Refreshed"]
        // console.log(timeUpdate)
        this.setState({
          name: result["Meta Data"]["2. Symbol"].toUpperCase(),
          price: result["Monthly Time Series"][timeUpdate]["1. open"],
          volume: result["Monthly Time Series"][timeUpdate]["5. volume"],
        })
      })
    }
    pullOneYearStock(stock = this.state.sticker){
      getStock(stock).then(result => {
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
      })
    }
    handleClick(){
        this.setState({ sticker: this.state.input, input: '' })
        this.pullOneYearStock( this.state.input );
        this.pullStock( this.state.input );
      }
    handleChange(e){
      this.setState({input: e.target.value})
    }
   componentDidMount(){
     this.pullStock()
     this.pullOneYearStock()
  }
    
  render() {
    return (
      // <HashRouter>
      <div className="Task">
        <div className="header">
          {/*<Header />Header*/}
        </div>
        <Input handleClick={this.handleClick} handleChange={this.handleChange} />
            <div>
              <Stockitem {...this.state} saveStock={this.saveStock}/>
              <Watchlist stocks={this.state.stocks}/>
            </div>
            {/*{route}*/}
      </div>
      // </HashRouter>
    );
  }
}
