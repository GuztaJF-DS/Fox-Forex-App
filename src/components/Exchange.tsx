import React,{useEffect,useState} from 'react';
import api from 'api/AxiosConnection';
import {useTriggerContext} from 'context/triggerContext';


function Exchange(props:any){
  var socket=props.Socket
  const [ForexData,setForexData]=useState({"symbol":"GBPUSD","ts":"0","bid":0,"ask":0,"mid":0});
  const [updateData,setUpdateData]=useState();
  const {trigger,setTrigger}=useTriggerContext();
  const [openTrade,setOpenTrade]=useState<boolean>(true)

  useEffect(()=>{
      socket.on("sendData",(data:any)=>{
          setForexData(data)          
      })
  },[])

  useEffect(()=>{
    api.get("/trade/getall").then(function(TableData:any){
      setOpenTrade(!TableData.data[TableData.data.length-1].Finished);
    });
  },[updateData])

    const [lotsValue,setLotsValue]=useState("0");
   
    function HandleBuyOrSell(type:boolean){
      let now = new Date().toISOString()

      api.post("/trade/createunfinished",
      {"Lots":lotsValue,"ExgangeType":type,"StartDate":now,"SwapTax":0.5,"NextOpening":ForexData.mid})
      .then(function(data:any){
        setLotsValue("0");
        setTrigger(!trigger )
      })
    }

    return(
    <div className='Exchange'>
      <p>Lots</p>
        <div className='Buttons'>
            <button disabled={openTrade} onClick={()=>HandleBuyOrSell(false)} className={`SellButton ${openTrade}`}>Sell</button>
            <input disabled={openTrade} className='Lots' value={lotsValue} 
            onChange={(e)=>setLotsValue(e.target.value)}
            type="number"/>
            <button disabled={openTrade} onClick={()=>HandleBuyOrSell(true)} className='BuyButton'>Buy</button>
            <div>
              <button  className='ExchangeButton'>Exchange</button>
            </div>
        </div>
      </div>
    )
}

export default Exchange