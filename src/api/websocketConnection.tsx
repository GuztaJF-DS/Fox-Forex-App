import React,{useState,useEffect} from "react";
import {io} from "socket.io-client";

function WebsocketConnection(){
    const [response,setResponse]=useState('{"symbol":"GBPUSD","ts":"0","bid":0,"ask":0,"mid":0}');

    useEffect(()=>{
        const socket=io('http://localhost:8080');
        socket.on("sendData",data=>{
            setResponse(data)
        })
        socket.on("connect", () => {
            console.log(socket.id);
          });
    },[])

    return(
        response
    )
}

export default WebsocketConnection