import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './index.css'
import './styles/theme.css'
import './styles/bookshelf.css'
import './styles/motifs.css'
import './styles/sceneImage.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
