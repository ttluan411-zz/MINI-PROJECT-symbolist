import React, { Component } from 'react';
import './App.css';
import './reset.css';
import { HashRouter, Route } from 'react-router-dom';
import Stockitem  from './Stockitem';
// import Watchlist from './Watchlist';
// import Brokers from './Brokers';
import {fetchStock, getStock} from './service'; 
import moment from 'moment';
class App extends Component {
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
      let newStock = {
        sticker: this.state.sticker,
        input: this.state.input,
        name: this.state.name,
        price: this.state.price,
        volume: this.state.volume,
        oneYearPrice: this.state.oneYearPrice,
        oneYearVolume: this.state.oneYearVolume
      }

      this.setState({
        stocks: [...this.state.stocks, newStock]
      })
    }




    pullStock( stock = this.state.sticker  ){

      fetchStock( stock ).then(result => {
        var timeUpdate = result["Meta Data"]["3. Last Refreshed"]
        console.log(timeUpdate)
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
                console.log(  'here' )

        if (!result["Time Series (Daily)"][timePast]){
          timePast = moment(timePast).add(-2,'day').format("YYYY-MM-D")
          console.log(timePast)
        console.log( result )

        this.setState({
          oneYearPrice: result["Time Series (Daily)"][timePast]["1. open"],
          oneYearVolume: result["Time Series (Daily)"][timePast]["5. volume"]
        })
      } else if( result["Time Series (Daily)"][timePast] ){
        console.log(timePast)
        console.log( result )
            this.setState({
              oneYearPrice: result["Time Series (Daily)"][timePast]["1. open"],
              oneYearVolume: result["Time Series (Daily)"][timePast]["5. volume"]
            })
        }
        
      })
    }
    // 2012-07-12
    handleClick(){
      console.log( this.state.input );

        this.setState({
          sticker: this.state.input,
          input: ''
        })
        this.pullOneYearStock( this.state.input );
        this.pullStock( this.state.input );
        
      }
    

    handleChange(e){
      this.setState({
        input: e.target.value
      })
    }
    
   componentDidMount(){
     this.pullStock()
     this.pullOneYearStock()
  }
     
  render() {

    const stocks = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h2>Symbolist</h2>
          <input className = "InputBox" type= "text" onChange={this.handleChange} placeholder="Enter symbol here" value={this.state.input}/>
          <button className = "InputButton" onClick={this.handleClick} type="button">Enter</button>
          {/*<input className ="Inputbox" type="text" onChange={this.handleChange} onKeyDown={this.handleEnter}  placeholder="Enter" value={this.state.input}/>*/}
        </div>
        {/*<HashRouter>*/}
          <div>
            {/*<Route path='/' component={Stockitem} exact />*/}
            <table className="row">
              {this.state.name}<br/>
              {parseInt(this.state.price).toFixed(2)}<br/>
              {parseInt(this.state.volume)}<br/>
              {parseInt(this.state.oneYearPrice).toFixed(2)}<br/>
              {parseInt(this.state.oneYearVolume)}<br/>
              {((this.state.price - this.state.oneYearPrice) / this.state.oneYearPrice).toFixed(2)}<br/>
              <button className = "SaveButton" onClick={this.saveStock} type="button">Save</button>
            </table>
            <ul>
              {this.state.stocks.map((stock, index) => {
                return <li>
                  Symbol:{stock.name}, 
                  Price:{stock.price}, 
                  Volume:{stock.volume}, 
                  1-yr Price:{stock.oneYearPrice}, 
                  1-yr Volume:{stock.oneYearVolume}
                  1-yr Return: {((this.state.price - this.state.oneYearPrice) / this.state.oneYearPrice).toFixed(2)}
                  </li>
              })}
            </ul>
            

       
          </div>
        
        
        {/*</HashRouter>  */}

      </div>
    );
  }
}

export default App;
