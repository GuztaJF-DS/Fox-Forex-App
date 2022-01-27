import React,{useEffect,useState} from 'react';
import api from 'api/AxiosConnection';
import { useTriggerRefreshContext } from 'contexts/triggerRefreshContext'

function Header(){
  const {triggerRefresh,setTriggerRefresh}=useTriggerRefreshContext()
  const [headerData,setHeaderData]=useState({
    Profit:0,
    Lots:0
  });

  useEffect(()=>{
    setTimeout(function(){
      api.get("/user/get").then(function(data:any){
        console.log(data)
        setHeaderData({
          Profit:data.data.currentProfit,
          Lots:data.data.currentLots
        })
      })
    },100)
    
  },[triggerRefresh])

    return(
        <div className="header">
        <div className="foxforextext">
          Fox Forex
        </div>
          <div className="CurrentUserData">
            <div>
              Current Profit: {headerData.Profit}$
            </div>
            <div>
              Current lots: {headerData.Lots}
            </div>
          </div>
      </div>
    )
}

export default Header