import React from "react";
import "./faq.css";
import { useEffect } from 'react';
import { Navbar } from "../../components/LandingPage/components";
import { Link } from "react-router-dom";

const Faq = () => {


    useEffect(() => {
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                const accordionContent = button.nextElementSibling;

                button.classList.toggle('active');

                if (button.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                } else {
                    accordionContent.style.maxHeight = 0;
                }

                // Close other open accordion items
                document.querySelectorAll('.accordion-header').forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.classList.remove('active');
                        otherButton.nextElementSibling.style.maxHeight = 0;
                    }
                });
            });
        });
    }, [])





    return (
        <div>
            <Navbar />
            <div className="row justify-content-center py-5 m-0">
                <div className="col-11 col-sm-11 col-md-8 col-lg-8">
                    <h1 className="faq-h1">Frequently Asked Questions</h1>
                    <div class="accordion-container">
                        <div class="accordion-item">
                            <button class="accordion-header">
                                What services do you offer?<span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Hayame offers variety of cleaning services provided, such as residential,
                                    commercial, deep cleaning, move-in/move-out cleaning, etc. Please
                                    refer to <Link to="/product-and-services">https://hayame.my/product-and-services</Link> for more details </p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                How do you charge for your services? <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Hayame pricing structure are based on cleaner per hour computation, Current promotional rate are set at RM 20.00 per hour </p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Do I need to provide any cleaning equipment or supplies?  <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Hayame utilize clients cleaning equipment and cleaning materials,
                                    primary factor for this is due cleanliness reasoning. </p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                How do you ensure the quality of your cleaning?  <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Hayame ensures highest quality of cleaning, our service implements
                                    several key measures, “Professional Training”, “Quality Control Checks”,
                                    “Client Feedback”, “Reliable and Consistent Staff”, “Responsive Customer
                                    Service” </p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                How can I book a cleaning appointment?  <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Booking can be done at ease by visiting <Link to="/">https://hayame.my</Link></p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                What is your cancellation or rescheduling policy?  <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Please refer to <Link to="/refund-policy">https://hayame.my/refund-policy</Link></p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                Can I request the same cleaner for every visit?  <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Yes, this is possible, please contact to us at support@hayame.my and
                                    we will be able arrange this request.</p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                How long does a typical cleaning take? <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>Minimum duration required for the cleaning work would be 4 hours,
                                    and this can be extended based on size of the house and type of
                                    cleaning required </p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                What should I do before the cleaning service arrives?  <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>
                                    <ul>
                                        <li><strong>Declutter Spaces:</strong> Clear away toys, clothes, and personal items from surfaces and floors to allow cleaners direct access to areas needing attention.</li>
                                        <li><strong>Secure Valuables and Fragile Items:</strong> Safely store away any valuable, fragile, or sentimental items to prevent accidents during the cleaning process.</li>
                                        <li><strong>Provide Clear Instructions:</strong> Leave specific instructions for areas that need special care or should be avoided, and arrange for pet safety and comfort. </li>
                                        <li><strong>Prepare the Space:</strong> Ensure there's available parking and provide any necessary access codes or keys for entry.</li>
                                        <li><strong>Communicate Preferences and Concerns:</strong> Inform the cleaning service of any preferences regarding cleaning products or special considerations like allergies, and specify if you have areas requiring particular attention. </li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">
                                How do you handle pets during cleaning? <span class="icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <p>
                                    <ul>
                                        <li><strong>Inform and Prepare:</strong> Clients are encouraged to inform us about their pets and provide any specific instructions for their care or areas to avoid, ensuring pets are safely secured away from the cleaning areas.</li>
                                        <li><strong>Staff Awareness:</strong> Our cleaners are trained on how to interact with pets respectfully and safely, avoiding any stress or harm to the animals. </li>
                                        <li><strong>Pet-Safe Cleaning:</strong> We use pet-friendly cleaning products upon request to protect the well-being of your pets, ensuring a safe environment for them throughout the cleaning process. </li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Faq;
