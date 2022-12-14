import { Carousel } from 'antd';
import React from 'react';
import Image1 from "../assets/images/Image1.jpeg"
import Image2 from "../assets/images/Image2.jpg"
import './utility.css';

const legend = {
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};

const carousel = () => (
    <Carousel fade autoplay autoplaySpeed={6500} centerMode  className="box-carousel">
        <div className='container-carousel'>
            <img
                className='carousel-img'
                src={Image1}
            />
            {/* <h3 style={legend}></h3> */}
        </div>
        <div className='container-carousel'>
            <img
                className='carousel-img'
                src={Image2}
            />
            {/* <h3 style={legend}></h3> */}
        </div>

    </Carousel>
);

export default carousel;