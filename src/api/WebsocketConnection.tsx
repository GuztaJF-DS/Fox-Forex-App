import React,{useState,useEffect} from "react";
import {io} from "socket.io-client";

function WebsocketConnection(){
    const socket=io('http://localhost:8080');
    return(
        socket
    )
}

export default WebsocketConnection