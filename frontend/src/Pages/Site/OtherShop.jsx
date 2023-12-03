import React, {useState, useEffect} from 'react'
import bg2 from 'assets/imges/BE_FUTURE-READY_BE_STI_3.png'
import { ItemGallery, AddToCartModal } from 'Components' 

const OtherShop = () => {
    const [Wear, setWear] = useState(null)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://modiform-api.vercel.app/api/products');
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    // Assuming 'apparel' is the field indicating whether it's for men or women
                    const menItems = json.filter(item => item.apparel === 'Others');
    
                    setWear(menItems);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
                        <ItemGallery title={'Others'} category={'Others'} items={Wear} />
                    </div>
                </section>
            </main>
            <AddToCartModal />
        </>
    )
}

export default OtherShop