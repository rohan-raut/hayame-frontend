import React from 'react'
// import { Navbar, Hero, MainContent, Footer } from "./components"
import { Navbar, Hero, MainContent, Footer } from "./components"
import "./landingPage.css"


const LandingPage = () => {
  return (
    <div className='landingPage'>
        <Navbar />
        <Hero />
        <MainContent />
        <Footer />
    </div>
  )
}

export default LandingPage