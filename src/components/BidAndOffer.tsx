import React,{useState,useEffect} from 'react';
import api from 'api/AxiosConnection';
import PipFunction from 'functions/pipFunction';
import SwapFunction from 'functions/swapFunctions';
import FinalProfitFunction from 'functions/finalProfitFuncion'
import { useTriggerStateContext } from 'contexts/triggerStateContext';
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

function BidAndOffer(props:any){
    const websocket=props.socket; 
    const {triggerState,setTriggerState}=useTriggerStateContext();
    const {profitValues,setProfitValues}=useProfitContext();
    const {triggerRefresh,setTriggerRefresh}=useTriggerRefreshContext()

    const [forexValues,setForexValues]=useState<IForexTypes>({
        symbol: "",
        ts:"",
        bid: 0,
        ask:0,
        mid:0
    })
    const [trade,setTrade]=useState<ITradeTypes>({
        ExchangeType: false,
        Finished: false,
        Lots: 0,
        NextOpening: 0,
        StartDate: '',
        SwapTax: 0,
        __v: 0,
        _id: ''
    })
    
    const [openingColor,setOpeningColor]=useState<string>("#fff")
    const [tempState,setTempState]=useState(
        {FinalProfit:0,
        PipQtd:0,
        PipPrice:0
    });

    useEffect(()=>{
        api.get("/trade/getall").then(function(TableData:any){
            if(TableData.data.length!==0){
                if(TableData.data[TableData.data.length-1].Finished===false){
                    setTrade(TableData.data[TableData.data.length-1]);
                }else{
                    setTrade({ExchangeType: false,
                      Finished: false,
                      Lots: 0,
                      NextOpening: 0,
                      StartDate: '',
                      SwapTax: 0,
                      __v: 0,
                      _id: ''
                  })
              }
              }
         });
    },[triggerRefresh])

    useEffect(()=>{
         setProfitValues({
            FinalProfit:tempState.FinalProfit,
            PipQtd:tempState.PipQtd,
            PipPrice:tempState.PipPrice
        })
        setTempState({FinalProfit:0,PipQtd:0,PipPrice:0})
    },[triggerState])    
  
    useEffect(()=>{
       websocket.on("sendData",(data:any)=>{
           setForexValues(JSON.parse(data))
      })
      return () => {
        websocket.disconnect();
      }
    },[])

    useEffect(()=>{
        let pip=PipFunction(trade.NextOpening,forexValues.mid,trade.ExchangeType,trade.Lots)
        let swap=SwapFunction(pip.PipPrice,trade.ExchangeType,trade.Lots,trade.SwapTax,0);
        let finalProfit=FinalProfitFunction(pip.Profit,swap)
        setTempState({FinalProfit:finalProfit,PipQtd:pip.PipQtd,PipPrice:pip.PipPrice})
    },[forexValues])
    
    return(
        <div className='BidAndOffer'>
            <div className='Bid'>
            Bid:
            <div>
                {
                forexValues.bid
                }
            </div>
            Opening:
            <div style={{color:openingColor}}>
                {
                forexValues.mid
                }
            </div>
            </div>

            <div className='profitColor'>
            Expected Profit:
            <div style={{color:openingColor}}>
                {tempState.FinalProfit}
            </div>
            </div>

            <div className='Offer'>
            Offer:
            <div>
                {
                forexValues.bid
                }
            </div>
            Last Trade Closure:
            <div >
                {
                trade.NextOpening
                }
            </div>
            </div>
        </div>
    )
}

export default BidAndOffer