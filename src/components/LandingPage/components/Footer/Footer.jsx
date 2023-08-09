import React from 'react'
import { instagramIcon, facebookIcon, twitterIcon, linkedInIcon } from '../../../../assets'
import "./footer.css"

const Footer = () => {
  return (
    <div className='footer-div'>
      <div className='footer-card'>
        <div className='footer-content'>
          <div>
            <h5 className='footer-copywrite'>Copywrite ©️ 2023 Hayame. All Rights Reserved</h5>
          </div>
          <div>
            <ul className='icons-list'>
              <li><img src={instagramIcon} alt='Instagram Icon' /></li>
              <li><img src={facebookIcon} alt='Facebook Icon' /></li>
              <li><img src={twitterIcon} alt='Twitter Icon' /></li>
              <li><img src={linkedInIcon} alt='LinkedIn Icon' /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer