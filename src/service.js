import axios from 'axios';

export function fetchStock(abc){
     return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${abc}&apikey=U1TEZICKW8CON2ZU`).then(res => res.data)
}

export function getStock(abc){
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${abc}&outputsize=full&apikey=U1TEZICKW8CON2ZU`).then(res => res.data)
}