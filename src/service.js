import axios from 'axios';

export function fetchStock(sticker){
     return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${sticker}&apikey=U1TEZICKW8CON2ZU`).then(res => res.data)
}