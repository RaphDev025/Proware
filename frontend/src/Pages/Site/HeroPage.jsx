import React from 'react'
import shs from 'assets/imges/seniorHigh.png'
import bg2 from 'assets/imges/bg2.png'
import other from 'assets/imges/BE_FUTURE-READY_BE_STI_3.png'
import { Footer } from 'Components'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { useNavigate  } from 'react-router-dom';

const HeroPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        // Your login logic here...

        // Redirect to the home screen
        navigate('/modiform/college-shop'); // Replace '/home' with the actual path to your home screen
    };

    return (
        <main className='mt-5 h-100'>
            <section className='land-section'/>
            <section className='mid-section'>
                <div className='p-5 h-25 d-flex justify-content-center align-items-center'>
                    <button id='btn-reserve' className='btn px-4 py-3 text-uppercase fw-medium'><span className='anim-word pe-3'>Reserve Now</span> <BsChevronDoubleRight size={24} className='btn-ic'/></button>
                </div>
                <div className='d-flex pb-4'>
                    <div className='w-50 bg-yellow pt-3 px-3 d-flex align-items-end' onClick={handleRedirect}>
                        <img width={'100%'} className='m-0 p-0' src={bg2} alt='college' />
                    </div>
                    <div className='w-50 bg-blue2 pt-3 px-3 d-flex align-items-end' onClick={() => { navigate('/modiform/high-shop');}}>
                        <img width={'100%'} src={shs} alt='shs' />
                    </div>
                </div>
                <div className='py-5 oth' onClick={() => { navigate('/modiform/other-shop');}}>
                    <img src={other} width={'100%'} alt='others'/>
                </div>
            </section>
            <section className='lower-section' />
            <Footer />
        </main>
    ) 
}

export default HeroPage