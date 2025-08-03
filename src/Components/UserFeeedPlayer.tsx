import { useEffect, useRef } from "react"

const UserFeedPlayer : React.FC<{stream: MediaStream}> = ({stream}) => {


    const videoRef  =  useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if(videoRef.current && stream){
            videoRef.current.srcObject =  stream;
        }

    }, [stream])

    return(
     <>
       <video
  ref={videoRef}
  style={{
    height: 400,
    width: 400,
    borderRadius: '50%', // 👈 Rounded corners
    objectFit: 'cover',    // Optional: keeps video well cropped
    border: '2px solid #ccc' // Optional: border for clarity
  }}
  muted={true}
  autoPlay
/>

       </>
    )
}
export default UserFeedPlayer;