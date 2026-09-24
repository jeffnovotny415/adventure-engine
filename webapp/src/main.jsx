import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './index.css'
import './styles/theme.css'
import './styles/bookshelf.css'
import './styles/reader.css'
import './styles/sceneImage.css'
import App from './App.jsx'
import { RuntimeBoundary } from './components/shared/RuntimeBoundary/RuntimeBoundary.jsx'
import { PurchaseProvider } from './hooks/usePurchases.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RuntimeBoundary>
      <PurchaseProvider><App /></PurchaseProvider>
    </RuntimeBoundary>
  </StrictMode>,
)
