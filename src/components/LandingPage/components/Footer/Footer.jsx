import React from 'react'
// import { instagramIcon, facebookIcon, twitterIcon, linkedInIcon } from '../../../../assets'
import "./footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <div className='footer-div'>
    //   <div className='footer-card'>

    //     <div className="container">
    //       <div className='footer-content'>
    //         <div className='col-4'>
    //           <p className='footer-copywrite'>Copywrite ©️ 2023 Hayame. All Rights Reserved</p>
    //         </div>
    //         <div className='col-8'>
    //           <ul className='icons-list'>
    //             {/* <li><img src={instagramIcon} alt='Instagram Icon' /></li>
    //           <li><img src={facebookIcon} alt='Facebook Icon' /></li>
    //           <li><img src={twitterIcon} alt='Twitter Icon' /></li>
    //           <li><img src={linkedInIcon} alt='LinkedIn Icon' /></li> */}
    //             <li><Link to="/about-us">About Us</Link></li>
    //             <li><Link to="/product-and-services">Product & Services</Link></li>
    //             <li><Link to="/refund-policy">Refund Policy</Link></li>
    //             <li><Link to="/contact-us">Contact Us</Link></li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </div>

    <div>
      <div className="container footer-content">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-11 col-md-4 col-lg-4">
            <p className='footer-copywrite'>Copyright ©️ 2024 Hayame. All Rights Reserved</p>
          </div>
          <div className="col-11 col-sm-11 col-md-8 col-lg-8 footer-link-list">
            <div className='footer-link-item'><Link className='footer-menu-item' to="/about-us">About Us</Link></div>
            <div className='footer-link-item'><Link className='footer-menu-item' to="/product-and-services">Product & Services</Link></div>
            <div className='footer-link-item'><Link className='footer-menu-item' to="/refund-policy">Refund Policy</Link></div>
            <div className='footer-link-item'><Link className='footer-menu-item' to="/contact-us">Contact Us</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer