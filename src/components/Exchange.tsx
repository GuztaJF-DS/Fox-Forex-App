import React,{useEffect,useState} from 'react';
import api from 'api/AxiosConnection';

function Exchange(props:any){
  var socket=props.Socket
  const [ForexData,setForexData]=useState({"symbol":"GBPUSD","ts":"0","bid":0,"ask":0,"mid":0});

  useEffect(()=>{
      socket.on("sendData",(data:any)=>{
          setForexData(data)          
      })
  },[])

    const [lotsValue,setLotsValue]=useState("0");
   
    
    function HandleBuyOrSell(type:boolean){
      let now = new Date().toISOString()
      api.post("/trade/createunfinished",
      {"Lots":lotsValue,"ExgangeType":type,"StartDate":now,"SwapTax":0.5,"NextOpening":ForexData.mid}
      ).then(function(data:any){
        setLotsValue("0");
      })
    }

    return(
    <div className='Exchange'>
      <p>Lots</p>
        <div className='Buttons'>
            <button onClick={()=>HandleBuyOrSell(false)} className='SellButton'>Sell</button>
            <input className='Lots' value={lotsValue} 
            onChange={(e)=>setLotsValue(e.target.value)}
            type="number"/>
            <button onClick={()=>HandleBuyOrSell(true)} className='BuyButton'>Buy</button>
            <div>
              <button  className='ExchangeButton'>Exchange</button>
            </div>
        </div>
      </div>
    )
}

export default Exchange