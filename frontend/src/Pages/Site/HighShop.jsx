import React, {useState, useEffect} from 'react'
import bg2 from 'assets/imges/seniorHigh.png'
import { ItemGallery, AddToCartModal } from 'Components' 
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HighShop = () => {
    const [loading, setLoading] = useState(true)
    const [itWear, setITWear] = useState(null)
    const [womenWear, setWomenWear] = useState(null)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://proware-api.vercel.app/api/products');
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    // Assuming 'apparel' is the field indicating whether it's for men or women
                    const menItems = json.filter(item => item.apparel === 'For Men' && item.status === 'Selling');
                    const womenItems = json.filter(item => item.apparel === 'For Women' && item.status === 'Selling');
    
                    setITWear(menItems);
                    setWomenWear(womenItems);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                // Set loading to false once data is fetched
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);
    
    const [category, setCategory] = useState('men')

    return (
        <>
            <main className='mt-5 h-100'>
                <section className='collegeBanner2 d-flex justify-content-center pt-3 position-relative'>
                    <img src={bg2} width={'50%'} alt='college' className=' position-relative' />
                    <div className='filt h-100 w-100 z-2 position-absolute top-0 left-0' />
                </section>
                <section className='p-5 h-100 '>
                    <div className='gap-5 ms-5 d-flex'>
                        <button className={`text-uppercase rounded-1 px-4 py-1 fs-5 ${ category === 'men' ? 'bg-college text-light' : 'bg-college2' }`} onClick={() => setCategory('men')} > Men </button>
                        <button className={`text-uppercase rounded-1 px-4 py-1 fs-5 ${ category === 'women' ? 'bg-college text-light' : 'bg-college2' }`} onClick={() => setCategory('women')} > Women </button>
                    </div>
                    <div className='list-section d-flex flex-column py-5 z-0'>
                    {loading ? (
                        <>
                        <div className='d-flex flex-column gap-2'>
                            <div className='d-flex gap-2'>
                                <div className='d-flex gap-2 p-2'>
                                    <Skeleton count={2} height={50} />
                                    <div className='p-2 border-top'>
                                        <Skeleton count={1} height={20} />
                                    </div>
                                </div>
                                <div className='d-flex gap-2 p-2'>
                                    <Skeleton count={2} height={50} />
                                    <div className='p-2 border-top'>
                                        <Skeleton count={1} height={20} />
                                    </div>
                                </div>
                                <div className='d-flex gap-2 p-2'>
                                    <Skeleton count={2} height={50} />
                                    <div className='p-2 border-top'>
                                        <Skeleton count={1} height={20} />
                                    </div>
                                </div>
                                <div className='d-flex gap-2 p-2'>
                                    <Skeleton count={2} height={50} />
                                    <div className='p-2 border-top'>
                                        <Skeleton count={1} height={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    ) : (
                    <>
                    {category === 'men' ? (
                        <div className='list-section d-flex flex-column py-5 z-0'>
                            <ItemGallery title={'Junior High School'} category={'Junior High'} items={itWear} />
                            <ItemGallery title={'Senior High School'} category={'Senior High'} items={itWear} />
                        </div>
                    ) : (
                        <div className='list-section d-flex flex-column py-5 z-0'>
                            <ItemGallery title={'Junior High School'} category={'Junior High'} items={womenWear} />
                            <ItemGallery title={'Senior High School'} category={'Senior High'} items={womenWear} />
                        </div>
                    )}
                    </>
                    )}
                    </div>
                </section>
            </main>
            <AddToCartModal />
        </>
    )
}

export default HighShop