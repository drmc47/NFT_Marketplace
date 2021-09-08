import React from 'react';
import Slider from "react-slick";
import Grid from '@material-ui/core/Grid';
// import "slick-carousel/slick/slick.css";
import s from "../slider/slider.module.css";


export default function ImageSlider() {
    let settings = {
        // dots: true,
        // infinite: true,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // cssEase: "linear"
    }
    return (
        <Slider {...settings}>
            <div className={s.box}></div>
            <div className={s.box1}></div>
            <div className={s.box2}></div>
            
            
        </Slider>
    )
}
