import React from 'react';

function Exchange(){
    return(
    <div className='Exchange'>
      <p>Lots</p>
        <div className='Buttons'>
          <button className='SellButton'>Sell</button>
          <input className='Lots' type="text"/>
          <button className='BuyButton'>Buy</button>
          <div>
            <button className='ExchangeButton'>Exchange</button>
          </div>
        </div>
      </div>
    )
}

export default Exchange