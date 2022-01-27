import React,{useEffect,useState} from 'react';
import api from 'api/AxiosConnection';
import {useTriggerStateContext} from 'contexts/triggerStateContext';
import { useProfitContext } from 'contexts/ProfitContext';
import { useTriggerRefreshContext } from 'contexts/triggerRefreshContext'

interface ITradeTypes{
  ExchangeType: boolean;
  Finished: boolean;
  Lots: number;
  NextOpening: number;
  StartDate: string;
  SwapTax: number;
  __v: number;
  _id: string;
}

interface IForexTypes{
  symbol:string;
  ts:string;
  bid:number;
  ask:number;
  mid:number;
}

function Exchange(props:any){
  const websocket=props.socket;
  const {profitValues,setProfitValues}=useProfitContext();
  const {triggerState,setTriggerState}=useTriggerStateContext();
  const {triggerRefresh,setTriggerRefresh}=useTriggerRefreshContext()
  const [forexValues,setForexValues]=useState<IForexTypes>({
      symbol: "",
      ts:"",
      bid: 0,
      ask:0,
      mid:0
  })
  useEffect(()=>{
     websocket.on("sendData",(data:any)=>{
        setForexValues(JSON.parse(data))
    })
    return () => {
      websocket.disconnect();
    }
  },[])

  useEffect(()=>{
    if(profitValues.FinalProfit!==0 && profitValues.PipQtd!==0 && profitValues.PipPrice!==0){
      HandleExchange()
    }
  },[profitValues])

    const [lotsValue,setLotsValue]=useState("0");
   
    function HandleBuyOrSell(type:boolean){
      let now = new Date().toISOString()
      let LotsNumber=parseFloat(lotsValue)
      if(forexValues.mid!==0 && lotsValue.length!==0 && LotsNumber>0){
        let query={"Lots":lotsValue,"ExchangeType":type,"StartDate":now,"SwapTax":0.5,"NextOpening":forexValues.mid}
        api.post("/trade/createunfinished",query)
        .then(function(data:any){
          setLotsValue("0");
          setTriggerState(!triggerState)
          setTriggerRefresh(!triggerRefresh)
        })
      }
    }
    function triggerStuff(){
      setTriggerState(!triggerState)
    }

    function HandleExchange(){
      let now = new Date().toISOString()

      let query={Profit:profitValues.FinalProfit,FinalDate:now,PipQtd:profitValues.PipQtd,PipPrice:profitValues.PipPrice}

        api.post("/trade/updatefinished",query)
        .then(function(data:any){
          setTriggerRefresh(!triggerRefresh)
        })
    }
    
    return(
    <div className='Exchange'>
      <p>Lots</p>
        <div className='Buttons'>
            <button disabled={triggerRefresh} onClick={()=>HandleBuyOrSell(false)} className="SellButton">Sell</button>
            <input disabled={triggerRefresh} className='Lots' value={lotsValue} 
            onChange={(e)=>setLotsValue(e.target.value)}
            type="number"/>
            <button disabled={triggerRefresh} onClick={()=>HandleBuyOrSell(true)} className='BuyButton'>Buy</button>
            <div>
              <button disabled={!triggerRefresh} onClick={()=>triggerStuff()} className='ExchangeButton'>Exchange</button>
            </div>
        </div>
      </div>
    )
}

export default Exchange