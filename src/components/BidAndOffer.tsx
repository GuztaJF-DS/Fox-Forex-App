import React from 'react';
import WebsocketConnection from '../api/websocketConnection'


function BidAndOffer(){
    let ForexData=WebsocketConnection()


    return(
        <div className='BidAndOffer'>
            <div className='Bid'>
            Bid:
            <div>
                {JSON.parse(ForexData).bid}
            </div>
            </div>

            <div className='ExpectedProfit'>
            Expected Profit:
            <div>
                0%
            </div>
            <div>
                0
            </div>
            </div>

            <div className='Offer'>
            Offer:
            <div>
                {JSON.parse(ForexData).ask}
            </div>
            </div>
        </div>
    )
}

export default BidAndOffer