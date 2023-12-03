import React, {useState, useEffect} from 'react'
import bg2 from 'assets/imges/BE_FUTURE-READY_BE_STI_3.png'
import { ItemGallery, AddToCartModal } from 'Components' 
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const OtherShop = () => {
    const [loading, setLoading] = useState(true)
    const [Wear, setWear] = useState(null)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://proware-api.vercel.app/api/products');
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    // Assuming 'apparel' is the field indicating whether it's for men or women
                    const menItems = json.filter(item => item.apparel === 'Others' && item.status === 'Selling');
    
                    setWear(menItems);
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

    return (
        <>
            <main className='mt-5 h-100'>
                <section className='collegeBanner3 d-flex justify-content-center position-relative'>
                    <img src={bg2} width={'100%'} alt='college' className=' position-relative' />
                    <div className='filt h-100 w-100 z-2 position-absolute top-0 left-0' />
                </section>
                <section className='p-5 h-100 '>  
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
                    ) : (<>
                            <ItemGallery title={'Others'} category={'Others'} items={Wear} />
                        </>
                    )}
                    </div>
                </section>
            </main>
            <AddToCartModal />
        </>
    )
}

export default OtherShop