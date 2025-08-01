
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Socket } from 'socket.io-client'
import { SocketProvider } from './context/socketContext.tsx'

createRoot(document.getElementById('root')!).render(
 <SocketProvider>
    <App />
 </SocketProvider>
)
