
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Socket } from 'socket.io-client'

import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './Context/SocketContext.tsx'


createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
 <SocketProvider>
   <App/>
 </SocketProvider>
 </BrowserRouter>
)
