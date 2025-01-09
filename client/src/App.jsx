// rafce
import React from 'react'
import JobApp from './pages/JobApp'
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from 'lucide-react';

const App = () => {
  return (
    <BrowserRouter>
    <Sidebar />
    <JobApp />
    </BrowserRouter>
  )
}

export default App