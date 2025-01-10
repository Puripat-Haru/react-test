// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import LoginPage from './pages/LoginPage'
// import JobApp from './pages/work/JobApp.jsx'
// import JobTest from './pages/JobTest'
// import WorkTime from './pages/work/WorkTime.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <LoginPage /> */}
//     {/* <App /> */}
//     <JobApp />
//     {/* <JobTest /> */}
//     {/* <WorkTime /> */}
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

console.log('Main is running');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)