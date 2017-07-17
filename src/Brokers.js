import React, { Component } from 'react';
import './main.css';

export default class Brokers extends Component {
    render(){
        return(
            <div className="brokers">
                <ul>
                    <li><a href="https://robinhood.com/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhnrMiSvqC3WduTiOjsoF9iLmF9pcZuVxmJqmxeuBRKNjpNfOoP_k2b0F-" alt="robinhood"/></a><p>Robinhood - No commission stock trading</p></li>
                    <li><a href="https://www.motifinvesting.com/"><img src="https://yt3.ggpht.com/-q-i8t6qus8M/AAAAAAAAAAI/AAAAAAAAAAA/qkWv8SGVHvw/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="motif"/></a><p>Motif - $9.95 Motif trades (30 stocks portfolio)</p></li>
                    <li><a href="http://content.schwab.com/web/retail/public/get-started/brokerage/?src=NAY&sv1=pj7lIfPk_dc&sv2={SITELINK}&keyword=charles%20schwab&device=c&adposition=1t1&matchtype=e&network=g&devicemodel=&placement=&s_kwcid=AL!5158!3!112553388620!e!!!!charles%20schwab&ef_id=WUiSyQAAAIeaH1rm:20170716221211:s"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Charles_Schwab_Corporation_logo.png" alt="Charles Schwab"/></a><p>Charles Schwab - $4.95 Online Equity Trades</p></li>
                </ul>
            </div>
    )}
}