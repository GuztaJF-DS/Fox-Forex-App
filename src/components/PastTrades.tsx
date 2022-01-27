import React,{useState,useEffect} from 'react';
import api from 'api/AxiosConnection';
import { useTriggerRefreshContext } from 'contexts/triggerRefreshContext'

function PastTrades(){
  const {triggerRefresh,setTriggerRefresh}=useTriggerRefreshContext()

  const [tradeData,setTradeData]=useState([])
  useEffect(()=>{
    api.get("/trade/getall").then(function(data:any){
      setTradeData(data.data)
    });
  },[triggerRefresh])



    return(
        <div className='PastTrades'>
        <p>Past Trades</p>
        <div className='Table'>
        <div className='TableHeadMask'>.</div>
          <div className='TableHead'>
            <div className='Titles'>
              <div>Lots</div>
              <div className='ExchangeTitle'>Exchange Type</div>
              <div>Date</div>
              <div>Profit</div>
            </div>
          <div className='line'></div>
          </div>
          {tradeData.map((data:any,index:number)=>{
            let DateDay=data.StartDate.split("T")
            let DateHour=DateDay[1].split(".");
            let Exchange=(data.ExgangeType==true)?"Buy":"Sell"
            let Profit=(data.Profit!==undefined)?data.Profit:0

            return(
              <div className='Content' key={index}>
                <div className='Lots'>{data.Lots}</div>
                <div className='ExchangeType'>{Exchange}</div>
                <div className='Date'>{DateDay[0]+" - "+DateHour[0]}</div>
                <div className='Profit'>{Profit}$</div>
              </div>
            )
          })}
          
        </div>
      </div>
    )
}
export default PastTrades