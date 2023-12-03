import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { SliderCard } from 'Components';
import { useCart } from 'Context/CartContext';

const SliderWrapper = ({ data, category }) => {
    const slides = data.length > 2 ? 3 : 2;

    const settings = {
        dots: false,
        speed: 500,
        arrows: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: slides,
        variableWidth: data.length > 2 ? false : true,
    };

    const { addToCart } = useCart();

    return (
        <div className={`container p-1`}>
            <Slider {...settings}>
                {data && data.map((item, indx) => (
                    <SliderCard data={item} id={indx} addToCart={addToCart} category={category} />
                ))}
            </Slider>
        </div>
    );
};

export default SliderWrapper;
