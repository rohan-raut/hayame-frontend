import React from "react";
import "./testimonials.css";
import { useEffect } from "react";
import Slider from "react-slick";



const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    useEffect(() => {


    }, [])



    return (
        <div className="row justify-content-center testimonial-row">
            <h2 className="testimonials-h2">Reviews</h2>
            <div className="slider-container testimonial-container">
                <Slider {...settings}>
                    <div className="testimonial-card">
                        <h3 className="testimonials-h3">Ajitha Ratnam</h3>
                        <div className="testimonials-rating-container">
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                        </div>
                        <p>The cleaning service I hired did an excellent job, very thorough. Highly recommended!</p>
                    </div>
                    <div className="testimonial-card">
                        <h3 className="testimonials-h3">Mani Kagita</h3>
                        <div className="testimonials-rating-container">
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                        </div>
                        <p>Faster response time, easy booking and reasonable price. Cleaners listen to our requirements and careful in cleaning fragile items. Will book again.</p>
                    </div>
                    <div className="testimonial-card">
                        <h3 className="testimonials-h3">Reeshmma Gunaseharan</h3>
                        <div className="testimonials-rating-container">
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                        </div>
                        <p>I felt confident entrusting my home to the cleaning service I hired. Highly recommended!</p>
                    </div>
                    <div className="testimonial-card">
                        <h3 className="testimonials-h3">Sures</h3>
                        <div className="testimonials-rating-container">
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                        </div>
                        <p>I must say, the cleaning service I recently used was quite impressive.</p>
                    </div>
                    <div className="testimonial-card">
                        <h3 className="testimonials-h3">Ashwin Ramankutty</h3>
                        <div className="testimonials-rating-container">
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                        </div>
                        <p>I was really pleased with the result of the cleaning service I booked. Bravo and keep up the great work!</p>
                    </div>
                    <div className="testimonial-card">
                        <h3 className="testimonials-h3">Jonathan Lim</h3>
                        <div className="testimonials-rating-container">
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                            <span className="testimonials-star-ratings">★</span>
                        </div>
                        <p>I've tried a few cleaning services, but this one stands out for its professionalism.</p>
                    </div>
                </Slider>
            </div>
        </div>

    );
};

export default Testimonials;
