// eslint-disable-next-line import/no-unresolved
// import "virtual:unocss-box-component-vite-plugin.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import "./tokens.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
