import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage'
import JobApp from './pages/JobApp'
import JobTest from './pages/JobTest'
import WorkTime from './pages/WorkTime'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <LoginPage /> */}
    {/* <App /> */}
    <JobApp />
    {/* <JobTest /> */}
    {/* <WorkTime /> */}
  </StrictMode>,
)
