import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";

const RoomPage : React.FC = () => {
    const {roomId} = useParams();
    const {socket, user} = useContext(SocketContext)
   useEffect( () => {
        
         // Emitting this event so that either creater of the room or the user who joins the room can be identified
         // Anyone who added the server Knows that new people have been  added 
         //to the room 
         if(user){
         socket.emit('joinedRoom', {roomId : roomId, peerId: user?.id});}
   },[roomId, user])

    return(
        <div className="flex items-center justify-center h-screen text-color-white bg-gray-800"> 
            Room : {roomId}
        </div>
    
    )
}
export default RoomPage