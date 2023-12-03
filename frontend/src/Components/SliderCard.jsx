import React, {useState, useEffect} from 'react';
import { BsPlus } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';

const SliderCard = ({ data, addToCart, category }) => {

    const [currentCategory, setCurrentCategory] = useState(category);
    const [isAnimating, setIsAnimating] = useState(false);
    const [newData, setNewData] = useState(data);

    useEffect(() => {
        if (currentCategory !== category) {
            setCurrentCategory(category);
            setIsAnimating(true);

            // Remove the animation class after the animation completes
            setTimeout(() => {
                setIsAnimating(false);
            }, 500); // Adjust the timeout to match the animation duration

            // Delay updating the data until after the animation
            setTimeout(() => {
                setNewData(data);
            }, 500); // Adjust the timeout to match the animation duration
        }
    }, [category, data, currentCategory]);

    return (
        <div className={`card itm-card border-light my-2 rounded-2 mx-1 ${isAnimating ? 'category-change' : ''}`} style={{ width: '350px' }}>
            {newData.product_img === '' ? (
                <Skeleton style={{ height: '390px' }} />
            ) : (
                <div className='position-relative bg-pic'>
                    <img src={newData.product_img} height={'390px'} alt={newData.product_img} className='card-img-top img-back d-inline-block' />
                    <img src={newData.product_img} height={'390px'} alt={newData.product_img} className='card-img-top img-front d-inline-block' />
                </div>
            )}
            <div className='card-body d-flex justify-content-between gap-3'>
                <div className='d-flex w-50 flex-column'>
                    <span className='fs-6 text-uppercase'>{newData.item_name}</span>
                    <span className='fs-6 text-uppercase'>P {newData.unit_price}.00</span>
                </div>
                <div className='d-flex w-50 align-items-center justify-content-end'>
                    <button type='button' className='px4 cart-btn py-2 w-100' onClick={() => addToCart(data)}>
                        <BsPlus size={24} /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SliderCard;
