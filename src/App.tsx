import React,{useState,useEffect} from 'react';
import './App.css';
import Header from 'components/Header';
import GraphicPart from 'components/GraphicPart';
import BidAndOffer from 'components/BidAndOffer';
import Exchange from 'components/Exchange';
import PastTrades from 'components/PastTrades';
import { TriggerStateContext } from 'contexts/triggerStateContext';
import { TriggerRefreshContext } from 'contexts/triggerRefreshContext';
import { ProfitContext } from 'contexts/ProfitContext';
import WebsocketConnection from 'api/WebsocketConnection';

function App() {
type Profit={ 
    FinalProfit: number;
    PipQtd: number;
    PipPrice: number;
};

const [triggerState,setTriggerState]=useState<boolean>(false);
const [triggerRefresh,setTriggerRefresh]=useState<boolean>(false);
const [profitValues,setProfitValues]=useState<Profit>({
  FinalProfit: 0,
  PipQtd:0,
  PipPrice:0
});
let WebSocket=WebsocketConnection()

  return (
    <ProfitContext.Provider value={{profitValues,setProfitValues}}>
      <TriggerRefreshContext.Provider value={{triggerRefresh,setTriggerRefresh}}>
      <TriggerStateContext.Provider value={{triggerState,setTriggerState}}>
          <div className="app">
            <Header/>
            <div className='toDesktop'>
              <div className='desktopLeft'>
                <GraphicPart/>
              </div>
              <div className='desktopRight'>
                <BidAndOffer socket={WebSocket}/>
                <Exchange socket={WebSocket}/>
                <PastTrades/>
              </div>
            </div>
          </div>
          </TriggerStateContext.Provider>
        </TriggerRefreshContext.Provider>
      </ProfitContext.Provider>
  );
}

export default App;
