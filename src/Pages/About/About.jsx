import React from 'react'
import "./about.css"
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from "../../components/LandingPage/components"


const About = () => {

  return (
    <div className='about-us-main-container'>

      <Navbar/>
      <div className="about-container">
      <h1 className='about-us-header'>HAYAME - A Leading Recruitment & Manpower Web Based company in Malaysia</h1>

      <h2 className='about-us-title'>Our Story</h2>
      <p>HAYAME is a recruitment technology & manpower supply startup founded in 2023 by a group of HR professionals and developers to assist both employers and job seekers with their hiring needs.</p>
      <p>Our initial focus was to address the problem of time-consuming and inefficient recruitment processes, which our founder, Johannes Losgrandes, experienced himself when he was tasked with hiring for his company. We realized that many job seekers were also frustrated with the lack of transparency and ease in finding job opportunities. Passionate about making the hiring process more streamlined and accessible, we took matters into our own hands and decided to tackle the issues both employers and job seekers face for good.</p>
      <p>Since implementing our recruitment app in various industries, we have received overflowing support and positive feedback both from employers and job seekers. It wasn't long before we realized there was much to do for the recruitment industry in Malaysia after receiving numerous requests and demands from our users. We made it our mission to roll out more comprehensive features that would significantly impact the recruitment industry.</p>
      <p>Today, HAYAME serves as an all-in-one recruitment companion for both employers and job seekers. Employers can easily post job openings, manage applications, and conduct interviews through our app, while job seekers can search for job opportunities and apply directly through the platform. Additionally, we offer a range of tools such as resume builder and career advice to assist job seekers in their career development.</p>
      <p>We believe that the future of recruitment is digital, and we are committed to making the hiring process efficient, transparent, and accessible in collaboration with our partner companies.</p>

      <h2 className='about-us-title'>Our Brand</h2>
      <p>HAYAME was founded by a group of seasoned HR professionals and developers who collectively had just one idea - to revolutionize the recruitment & manpower supply industry in Malaysia through advanced technology.</p>
      <p>Our journey began as a recruitment app provider for various industries, and we have since evolved and expanded our market presence in the recruitment sector. Our brand name signifies our commitment, moving forward, to providing innovative recruitment solutions for employers and job seekers alike.</p>

      <h2 className='about-us-title'>Vision</h2>
      <p>HAYAME aims to empower individuals nationally to attain their career goals through the advancement of recruitment technology.</p>

      <h2 className='about-us-title'>Mission</h2>
      <p>Our mission is to help individuals access job information, services, and receive quality career advice.</p>
      <p>We strive to encourage employers to adopt innovative recruitment technology to improve their hiring accessibility, quality, and efficiency.</p>
      <p>Our goal is to have a positive and meaningful impact on individuals' career outcomes over time.</p>

      <h2 className='about-us-title'>Our Tagline</h2>
      <p style={{ fontStyle: "italic", fontWeight: "bold" }}>“Revolutionizing Manpower”<br/>
      “Your go-to solution for Manpower”<br/>
      “Passionate about Recruitment”</p>
      <p>Our tagline, "Revolutionizing Manpower", embodies our commitment and inspires us towards our vision. It reflects our daily mission towards more comprehensive, transformative hiring & supplying solutions.</p>
      <p style={{ textDecoration: "underline" }}>At <strong>HAYAME</strong>, we are passionate about recruitment & manpower supply.</p>
      <p>We are a dedicated group of professionals, researchers and innovators who believe that technology innovation can revolutionize the recruitment process, reduce costs, and improve job outcomes.</p>
      <p>We are enthusiastic about being the trusted partner for employers to provide solutions that make recruitment better, simpler and more efficient.</p>
      <p>The recruitment industry is evolving rapidly, and we are passionate about positively impacting people's careers and improving lives by delivering recruitment services through innovative technology.</p>

      <h2 className='about-us-title'>Our Values</h2>
      <h3 className='about-us-subtitle'>Quality</h3>
      <p className='about-us-values-content'>Quality Manpower Supplying Company<br/>
      We are committed to providing only exceptional manpower services for all.</p>

      <h3 className='about-us-subtitle'>Motivation</h3>
      <p className='about-us-values-content'>Motivation Drives Productivity<br/>
      Together we are inspired to continuously level up our commitment and energy in propelling the success of our services.</p>

      <h3 className='about-us-subtitle'>Empowering</h3>
      <p className='about-us-values-content'>Empowering Ownership<br/>
      We strive to entrust everyone with the knowledge and skills to make informed decisions about their career.</p>

      <h3 className='about-us-subtitle'>Dynamic</h3>
      <p className='about-us-values-content'>Dynamic Business Strategies<br/>
      Full steam ahead, we are swift and versatile in adopting efficient strategies in response to any situation in the manpower industry.</p>
      </div>


      <Footer/>


    </div>
  )
}

export default About