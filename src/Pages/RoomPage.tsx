import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Components/UserFeeedPlayer";

const RoomPage: React.FC = () => {
  const { roomId } = useParams();
  const { socket, user, stream, peers } = useContext(SocketContext);
  useEffect(() => {
    // Emitting this event so that either creater of the room or the user who joins the room can be identified
    // Anyone who added the server Knows that new people have been  added
    //to the room
    if (user) {
      socket.emit("joinedRoom", { roomId: roomId, peerId: user?.id });
    }
  }, [roomId, user, socket]);

  return (
    <div className="  mt-4 flex border-blue-400 justify-right items-center  "> 
      Room : {roomId}
      <br/>
      Your own user feed 
      <UserFeedPlayer stream={stream} />
      <div >
      
        {Object.keys(peers).map((peerId) => (
          <>
            Other Users feed
            <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
          </>
        ))}
      </div>
    </div>
  );
};
export default RoomPage;
