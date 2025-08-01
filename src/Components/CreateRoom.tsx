import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom : React.FC = () => {
    // This component will handle the creation of a new room
    // and will be used to start a new meeting.
    const {socket } = useContext(SocketContext);
  const initRoom = () => {
    console.log("Creating a new room");
    // Emit an event to the server to create a new room
    socket.emit("createRoom")

  }

    return (
        <div className="text-center my-4">
        <button onClick={initRoom}
            className= "btn btn-secondary bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Start  a new meeting in a new room
        </button>
    </div>
    )
}
export default CreateRoom;