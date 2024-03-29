import React from 'react'
import "./contactUs.css"
import { useNavigate, Link } from 'react-router-dom'
import { Navbar, Footer } from "../../components/LandingPage/components"
import { WhatsappIcon, PhoneIcon, WhatsappChatBtn } from '../../assets';


const ContactUs = () => {

  return (
    <div className='contact-us-main-container'>

      <Navbar />
      <div className="contact-us-container">
        <div className="contact-us-bg-img"></div>
        <div className="row p-0 m-0 contact-us-row">
          <div className="col-11 col-sm-11 col-md-7 col-lg-4 contact-us-card">
            <div className="contact-us-inner-card">
              <h1 className='about-us-header'>Contact Us</h1>
              <h2 className='about-us-title'>Company Address</h2>
              <p>HAYAME SOLUTIONS SDN BHD</p>
              <p>A-6-4, BLOCK A,</p>
              <p>MEGAN PHOENIX,</p>
              <p>JALAN 2/142A, OFF JALAN CHERAS,</p>
              <p>WP KUALA LUMPUR</p>
              <p><img src={PhoneIcon} className="contact-us-whatsapp-icon" /> +60 12-4343-470</p>
              <p><a href="mailto: support@hayame.my">support@hayame.my</a></p>
              <a href="https://wa.me/60124343470" target="_blank"><img src={WhatsappChatBtn} className="contact-us-whatsapp-btn" /></a>
            </div>

          </div>
        </div>

      </div>


      <Footer />


    </div>
  )
}

export default ContactUs