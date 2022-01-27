import {io} from "socket.io-client";

function WebsocketConnection(){
    const socket=io('http://localhost:8080');

    socket.on("disconnect",(data:any)=>{
        console.log("Disconnected")
    })

    return(
        socket
    )
    
}

export default WebsocketConnection