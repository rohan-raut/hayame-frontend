import React from 'react'
import "./productServices.css"
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from "../../components/LandingPage/components";
import { DarkConstructionWorker, DarkLabour } from '../../assets';


const ProductServices = () => {

  return (
    <div className='product-services-main-container'>

      <Navbar />

      {/* <div className="row product-services-row justify-content-around align-items-center">
        <div className="col-11 col-sm-11 col-md-9 col-lg-4 product-services-card">
          <div className="product-services-inner-card">
            <div className="row">
              <div className="col-2">
                <img src={DarkLabour} className='product-services-icons' />
              </div>
              <div className="col-9 product-services-header-content">
                <h2 className='product-services-h2'>Skilled Workers</h2>
                <p>MYR 20.00 per hour</p>
              </div>
            </div>
            <div className='product-services-skillset-list'>
              <ul>
                <li>Electrician</li>
                <li>Painter</li>
                <li>MHE Driver</li>
                <li>Plumber</li>
                <li>Handyman</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-11 col-sm-11 col-md-9 col-lg-4 product-services-card">
          <div className="product-services-inner-card">
            <div className="row">
              <div className="col-2">
                <img src={DarkConstructionWorker} className='product-services-icons' />
              </div>
              <div className="col-9 product-services-header-content">
                <h2 className='product-services-h2'>Non-Skilled Workers</h2>
                <p>MYR 20.00 per hour</p>
              </div>
            </div>
            <div className='product-services-skillset-list'>
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

        
      </div> */}

      <div className="about-container">
        <h1 className='product-services-header'>Product & Services</h1>

        <ol className="product-services-ol">
          <li><strong>Residential cleaning:</strong> Regular maintenance cleaning for homes, including bedrooms, bathrooms, kitchens, and common areas.</li>
          <li><strong>Commercial cleaning:</strong> Tailored cleaning services for office spaces, retail stores, restaurants, and other commercial establishments.</li>
          <li><strong>Deep cleaning:</strong> Thorough cleaning of hard-to-reach areas, appliances, and neglected spaces.</li>
          <li><strong>Move-in/move-out cleaning:</strong> Detailed cleaning before or after moving into or out of a property.</li>
          <li><strong>Post-construction cleaning:</strong> Removing dust, debris, and residue left behind after renovation or construction projects.</li>
          <li><strong>Specialized cleaning:</strong> Cleaning services for specific needs such as carpet cleaning, upholstery cleaning, and window washing.</li>
          <li><strong>Disinfection services:</strong> Sanitizing high-touch surfaces and areas to prevent the spread of germs and viruses.</li>
          <li><strong>One-time cleaning:</strong> Occasional cleaning for special events, parties, or emergencies.</li>
          <li><strong>Customized cleaning plans:</strong> Tailoring cleaning services to meet the unique needs and preferences of each client.</li>
          <li><strong>Eco-friendly cleaning:</strong> Using environmentally friendly products and practices to minimize environmental impact.</li>
        </ol>



      </div>

      <Footer />

    </div>
  )
}

export default ProductServices