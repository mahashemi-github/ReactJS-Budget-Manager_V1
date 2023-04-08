import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { DataContextProvider } from './context/DataContext'
// import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
      <DataContextProvider>
        <App />
      </DataContextProvider>
    {/* </AuthContextProvider> */}
  </React.StrictMode>,
)
