import React from "react";
import "./testimonials.css";
import { useEffect } from "react";
import Slider from "react-slick";



const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {


    }, [])



    return (
        <div className="row justify-content-center testimonial-row">
            <h2>Reviews</h2>
            <div className="slider-container testimonial-container">
                <Slider {...settings}>
                    <div className="testimonial-card">
                        <h3>Ajitha Ratnam</h3>
                        <p>The cleaning service I hired did an excellent job, very thorough. Highly recommended!</p>
                    </div>
                    <div className="testimonial-card">
                        <h3>2</h3>
                    </div>
                    <div className="testimonial-card">
                        <h3>3</h3>
                    </div>
                    <div className="testimonial-card">
                        <h3>4</h3>
                    </div>
                    <div className="testimonial-card">
                        <h3>5</h3>
                    </div>
                    <div className="testimonial-card">
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        </div>

    );
};

export default Testimonials;
