import React from 'react'
import "./about.css"
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from "../../components/LandingPage/components"


const About = () => {

  return (
    <div className='about-us-main-container'>

      <Navbar />
      <div className="about-container">
        <h1 className='about-us-header'>Welcome to Hayame<br />Where Technology meets Cleanliness!</h1>

        <p>At <strong>Hayame</strong>, we're revolutionizing the way you book cleaning services. With our
          cutting-edge online platform, we've streamlined the entire process, making it easier
          and more convenient than ever before to schedule professional cleaning for your
          home or business.</p>

        <p>Founded with a passion for innovation and a commitment to exceptional service, 
          <strong> Hayame</strong> brings together the best of technology and cleaning expertise. Our platform
          is designed to provide you with a hassle-free experience, allowing you to book your
          cleaning appointments with just a few clicks, anytime and anywhere.</p>

        <p>But we're more than just a booking platform. We're a team of dedicated professionals
          who are passionate about cleanliness and customer satisfaction. Our network of
          trusted cleaning partners undergoes rigorous screening and training to ensure that
          they deliver top-quality service every time. Whether you need a one-time deep clean
          or regular maintenance, you can trust <strong>Hayame</strong> to get the job done right.</p>

        <p>At <strong>Hayame</strong>, we believe that everyone deserves a clean and healthy environment to
          live and work in. That's why we're committed to making our services accessible and
          affordable to all. With transparent pricing and flexible scheduling options, we strive to
          provide value that exceeds your expectations.</p>

        <p>Join the <strong>Hayame</strong> community today and experience the future of cleaning services.
          Book your next cleaning appointment with us and let technology take care of the
          rest!</p>



      </div>


      <Footer />


    </div>
  )
}

export default About