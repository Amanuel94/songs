import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App'
import 'styles/index.css'

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)
// document.documentElement.setAttribute('data-theme', 'dark');


root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
)
