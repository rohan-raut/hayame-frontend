import React from 'react'
import "./productServices.css"
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from "../../components/LandingPage/components"


const ProductServices = () => {

  return (
    <div className='about-us-main-container'>

      <Navbar />

      <div className="container my-5 product-sevices-container">
        <div className="row justify-content-around product-services-row p-3">
          <div className="col-11 col-sm-11 col-md-4 col-lg-4 bg-white p-3 my-2">
            <h2>Skilled Workers</h2>
            <p>MYR 20.00 per hour</p>
            <div className='skillset-list'>
              <ul>
                <li>Electrician</li>
                <li>Painter</li>
                <li>MHE Driver</li>
                <li>Plumber</li>
                <li>Handyman</li>
              </ul>
            </div>
          </div>

          <div className="col-11 col-sm-11 col-md-4 col-lg-4 bg-white p-3 my-2">
            <h2>Non-Skilled Workers</h2>
            <p>MYR 20.00 per hour</p>
            <div className='skillset-list'>
              <ul>
                <li>Factory Operator</li>
                <li>Maid</li>
                <li>Warehouse Workers</li>
                <li>Mover</li>
                <li>Cleaner</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <Footer />


    </div>
  )
}

export default ProductServices