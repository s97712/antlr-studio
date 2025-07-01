import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StagewiseToolbar } from '@stagewise/toolbar-react'
import { ReactPlugin } from '@stagewise-plugins/react'

if (import.meta.env.MODE === 'development' && window.location.hostname !== 'host.docker.internal') {
  const stagewiseRootEl = document.createElement('div')
  stagewiseRootEl.id = 'stagewise-toolbar-root'
  document.body.appendChild(stagewiseRootEl)

  const stagewiseRoot = createRoot(stagewiseRootEl)
  stagewiseRoot.render(
    <StagewiseToolbar
      config={{
        plugins: [ReactPlugin],
      }}
    />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
