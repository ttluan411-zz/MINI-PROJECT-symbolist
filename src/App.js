import React, { Component } from 'react';
import './App.css';
import './reset.css';
import { HashRouter, Route } from 'react-router-dom';
import Stockitem  from './Stockitem';
// import Watchlist from './Watchlist';
// import Brokers from './Brokers';
import {fetchStock} from './service'; 
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
      fiveYearPrice: '',
      fiveYearVolume: ''
    }
    this.pullStock = this.pullStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  
   
    pullStock(){
      fetchStock(this.state.sticker).then(result => {
        const date = new Date()
        console.log(result)
        
        // get Realtime (Won's show hour when market closes)
        var timeNow = moment(date).zone(240).format('YYYY-MM-D')
        var Now = moment(date).zone(240).format('HHmm')
          if(Now > 930 && Now < 1600){
          timeNow = moment(date).zone(240).format('YYYY-MM-D HH:mm:00')
        }
        
       //get time from 5 years ago
        const timePast = moment(timeNow).add(-5,'year').format('YYYY-MM-D')
       

        this.setState({
          name: result["Meta Data"]["2. Symbol"].toUpperCase(),
          price: result["Monthly Time Series"][timeNow]["1. open"],
          volume: result["Monthly Time Series"][timeNow]["5. volume"],
          // fiveYearPrice: result["Monthly Time Series"][timePast]["1. open"],
          // fiveYearVolume: result["Monthly Time Series"][timePast]["5. volume"]
        })
      })
    }
    handleEnter(e){
      
      if(e.key === 'Enter') {
        this.pullStock();
        this.setState({
          sticker: this.state.input
        })
      }
    }
    handleChange(e){
      this.setState({
        input: e.target.value
      })
    }

   componentDidMount(){
     this.pullStock()
  }
     
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Symbolist</h2>
          <input className ="Inputbox" type="text" onChange={this.handleChange} onKeyPress={this.handleEnter}  placeholder="Enter"/>
        </div>
        <HashRouter>
          <div>
            <Route path='/' component={Stockitem} exact />
            {this.state.name}
            {this.state.price}
            {this.state.volume}
            {this.state.fiveYearPrice}
            {this.state.fiveYearVolume}
            {/*<Route path='/Watchlist' component={Watchlist} />
            <Route path='/Brokers' component={Brokers} />*/}
          </div>
        
        
        </HashRouter>  

      </div>
    );
  }
}

export default App;
