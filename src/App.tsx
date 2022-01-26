import React,{useState} from 'react';
import './App.css';
import Header from 'components/Header';
import GraphicPart from 'components/GraphicPart';
import BidAndOffer from 'components/BidAndOffer';
import Exchange from 'components/Exchange';
import PastTrades from 'components/PastTrades';
import WebsocketConnection from 'api/WebsocketConnection'
import { TriggerContext } from 'context/triggerContext';

function App() {
  const [trigger,setTrigger]=useState<boolean>(false);
  let WebSocket=WebsocketConnection()
  return (
    <TriggerContext.Provider value={{trigger,setTrigger}}>
    <div className="app">
      <Header/>
      <div className='toDesktop'>
        <div className='desktopLeft'>
          <GraphicPart/>
        </div>
        <div className='desktopRight'>
          <BidAndOffer Socket={WebSocket}/>
          <Exchange Socket={WebSocket}/>
          <PastTrades/>
        </div>
      </div>
    </div>
    </TriggerContext.Provider>
  );
}

export default App;
