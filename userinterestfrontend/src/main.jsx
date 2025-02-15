import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BoundsProvider } from './util/context/BoundsContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BoundsProvider>
      <App />
    </BoundsProvider>
  </StrictMode>,
)
