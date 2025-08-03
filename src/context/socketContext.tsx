import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";
import { v4 as UUIDV4 } from "uuid";
import { addPeerAction } from "../Actions/peerAction";
import { peerReducer } from "../Reducers/peerReducers";


const ws_server = "http://localhost:5000";
// eslint-disable-next-line @typescript-eslint/no-explicit-any, react-refresh/only-export-components
export const SocketContext = createContext<any | null>(null);
const socket = SocketIoClient(ws_server);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {

  const navigate = useNavigate(); // This is used to navigate to different pages
  //state variable to store userId
  const [user, setUser] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {}); // peers->state

  const fetchUserFeed = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream)
  };

  // Function to fetch user data
  const fetchUserData = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    console.log("Fetching user data");
    console.log(roomId, participants);
  };


  // Here you can implement the logic to fetch user data based on roomId and peerId
  useEffect(() => {
    const userId = UUIDV4();
    const newPeer = new Peer(userId, {
      host: "localhost",
      port: 9000,
      path: "/myapp"
    });
    setUser(newPeer);
    fetchUserFeed()
    const enterRoom = ({ roomId }: { roomId: string }) => {
      console.log("Entering room with ID:", { roomId });
      navigate(`/room/${roomId}`);
    };
    //  we are listening for the "roomCreated" event from the server
    // and when it is emitted, we will call the enterRoom function

    socket.on("roomCreated", enterRoom);
    socket.on("getUser", fetchUserData);
  }, []);


 useEffect(() => {
        if(!user || !stream) return;

        socket.on("userJoined", ({peerId}) => {
            const call = user.call(peerId, stream);
            console.log("Calling the new peer", peerId);
            call.on("stream", () => {
                dispatch(addPeerAction(peerId, stream));
            })
        })

        user.on("call", (call) => {
            // what to do when other peers on the group call you when u joined
            console.log("receiving a call");
            call.answer(stream);
            call.on("stream", () => {
                dispatch(addPeerAction(call.peer, stream));
            })
        })

        socket.emit("ready");
    }, [user, stream])


  return (
    <SocketContext.Provider value={{ socket, user, stream, peers}}>
      {children}
    </SocketContext.Provider>
  );
};
