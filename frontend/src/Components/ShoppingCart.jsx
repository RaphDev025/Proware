import React from 'react';

function ShoppingCart({ size, color }) {
    return (
        <svg
        fill="none"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className='ic'
        >
        <g
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
        >
            <path d="m2 2h1.74001c1.08 0 1.92999.93 1.83999 2l-.83 9.96c-.14 1.63 1.14999 3.03 2.78999 3.03h10.65001c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01h-12.90999" />
            <path
            d="m16.25 22c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25-1.25.5596-1.25 1.25.5596 1.25 1.25 1.25z"
            fill={color}
            />
            <path
            d="m8.25 22c.69036 0 1.25-.5596 1.25-1.25s-.55964-1.25-1.25-1.25-1.25.5596-1.25 1.25.55964 1.25 1.25 1.25z"
            fill={color}
            />
            <path d="m9 8h12" />
        </g>
        </svg>
    );
}

export default ShoppingCart;
