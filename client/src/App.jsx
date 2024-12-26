// rafce
import React from 'react'
// import Navbars from './components/Navbars'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Layout from './components/Layout'

const App = () => {
  return (
    <div>
      <Layout>
        <Hero />
        <About />
        <Experience />
      </Layout>
    </div>
  )
}

export default App