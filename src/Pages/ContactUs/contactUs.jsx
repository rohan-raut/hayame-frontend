import React from 'react'
import "./contactUs.css"
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from "../../components/LandingPage/components"


const ContactUs = () => {

  return (
    <div className='about-us-main-container'>

      <Navbar />
      <div className="about-container">
        <h1 className='about-us-header'>Contact Us</h1>

        <h2 className='about-us-title'>Company Address</h2>
        <p>HAYAME SOLUTIONS SDN BHD</p>
        <p>A-6-4, BLOCK A,</p>
        <p>MEGAM PHEONIX,</p>
        <p>JALAN 2/142A, OFF JALAN CHERAS,</p>
        <p>WP KUALA LUMPUR</p>
        <p>support@hayame.my</p>

      </div>


      <Footer />


    </div>
  )
}

export default ContactUs