import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../images/banner1.jpg'
import banner2 from '../../images/banner2.jpg'
import banner3 from '../../images/banner3.jpg'

function Carousel() {
    const images = [banner1,banner2,banner3];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <div className='flex justify-center items-center mt-[100px]'>
                        <img
                            src={image}
                            alt={`banner-${index}`}
                            className='object-cover w-[1200px] h-[550px] border rounded-lg shadow-lg'
                        />
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default Carousel;
