import React,{useState,useEffect} from 'react';


function BidAndOffer(props:any){
    var socket=props.Socket
    const [ForexData,setForexData]=useState('{"symbol":"GBPUSD","ts":"0","bid":0,"ask":0,"mid":0}');

    useEffect(()=>{
        socket.on("sendData",(data:any)=>{
            setForexData(data)
        })
    },[])

    return(
        <div className='BidAndOffer'>
            <div className='Bid'>
            Bid:
            <div>
                {
                (ForexData!=="Connected")?
                JSON.parse(ForexData).bid:0
                }
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
            {
                (ForexData!=="Connected")?
                JSON.parse(ForexData).ask:0
                }
            </div>
            </div>
        </div>
    )
}

export default BidAndOffer