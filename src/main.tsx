import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/syne'
import '@fontsource-variable/jetbrains-mono'
import './styles/index.css'
import './styles/app.scss'
import { App } from './app/App'

const root = document.getElementById('root')
if (!root) throw new Error('Application root was not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
