import React from 'react'
import "./refundPolicy.css"
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from "../../components/LandingPage/components"


const RefundPolicy = () => {

  return (
    <div className='refund-policy-main-container'>

      <Navbar />
      <div className="about-container">
        <h1 className='refund-policy-header'>Refund Policy</h1>
        <p>We at HAYAME SOLUTIONS SDN BHD strive to provide excellent service to all our customers. However, we understand that circumstances may arise where a refund is necessary. Please review our refund policy below:</p>

        <h2 className='refund-policy-title'>Refund Eligibility:</h2>
        <p>Refunds may be considered under the following circumstances:</p>
        <p>If there has been an error on our part that prevents us from fulfilling the agreed-upon service.</p>
        <p>If the service provided does not meet the specifications outlined in the service agreement or contract.</p>
        <p>Refunds will not be issued for services that have been satisfactorily rendered and have met the agreed-upon terms.</p>

        <h2 className='refund-policy-title'>Refund Requests:</h2>
        <p>To request a refund, customers must contact our customer support team at refund@hayame.my within 7 days of the service completion date.
          Refund requests must include:</p>
        <ul>
          <li>Customer name</li>
          <li>Invoice number</li>
          <li>Description of the issue or reason for the refund request</li>
          <li>Any supporting documentation or evidence</li>
        </ul>

        <h2 className='refund-policy-title'>Refund Process:</h2>
        <p>Once a refund request is received and reviewed, we will notify the customer regarding the approval or rejection of the refund.</p>
        <p>If approved, the refund will be processed within 7 days, and a credit will automatically be applied to the original method of payment.</p>
        <p>If the refund request is rejected, we will provide a detailed explanation to the customer.</p>

        <h2 className='refund-policy-title'>Exceptions:</h2>
        <p>There may be certain services or circumstances where refunds are not applicable. These exceptions will be communicated clearly at the time of service agreement or purchase.</p>

        <h2 className='refund-policy-title'>Cancellation Policy:</h2>
        <p>For services that are canceled by the customer prior to completion, refunds may be subject to a cancellation fee or prorated based on the work completed up to the cancellation date.</p>

        <h2 className='refund-policy-title'>Contact Us:</h2>
        <p>If you have any questions about our refund policy, please contact us at support@hayame.my for assistance.
          Please note that by availing of our services, you agree to abide by the terms and conditions outlined in this refund policy.</p>
        <p>HAYAME SOLUTIONS SDN BHD reserves the right to update or modify this refund policy at any time without prior notice.</p>




      </div>


      <Footer />


    </div>
  )
}

export default RefundPolicy