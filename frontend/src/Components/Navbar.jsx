import React from 'react'
import whiteLogo from 'assets/icons/white.png'
import yellowLogo from 'assets/icons/yellowed.png'
import { ShoppingCart, BellIcon } from 'Components'
import { BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom'; 

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <nav className='navbar navbar-expand-lg bg-blue px-5 p-0 fixed-top text-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand p-0 m-0 d-flex justify-content-center' to='/modiform/'>
                    <div className='h-100 position-relative'>
                        <img src={whiteLogo} alt='logo' width='50%' height='50%' className='d-inline-block align-text-center me-2' />
                        <img src={yellowLogo} alt='logo' id="logo-front" width='50%' height='50%' className='d-inline-block align-text-center me-2' />
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div id='navbarSupportedContent' className='collapse navbar-collapse gap-5 d-flex justify-content-end'>
                    <ul className='navbar-nav gap-5 w-50 d-flex justify-content-center align-items-center'>
                        {/* nav items */}
                        <li className={`nav-item`} >
                            <Link className={`nav-link text-light fw-bolder`} to='/modiform/'><span className='itm-2 text-uppercase'>Home</span></Link>
                        </li>
                        <li className={`nav-item dropdown`} >
                            <p className="nav-link text-light m-0 dropdown-toggle fw-bolder text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='itm-2 text-uppercase'>Proware Shop</span>
                            </p>
                            <ul className="dropdown-menu " id='drop'>
                                <li><Link id='lnk' className="dropdown-item text-center text-light" to="/modiform/college-shop">College</Link></li>
                                <li><Link id='lnk' className="dropdown-item text-center text-light" to="/modiform/high-shop">High School</Link></li>
                                <li><Link id='lnk' className="dropdown-item text-center text-light" to="/modiform/other-shop">Others</Link></li>
                            </ul>
                        </li>
                        <li className={`nav-item`} >
                            <a className={`nav-link text-light fw-bolder`} href='/'><span className='itm-2 text-uppercase'>About</span></a>
                        </li>
                    </ul>
                    {/* Buttons */}
                    <form className='d-flex justify-content-center gap-4 p-2 w-25'>
                        <button onClick={() => {navigate('/modiform/cart')}} type='button' className='btn p-0 m-0' style={{border: 'none'}}>
                            <ShoppingCart size={24} />
                        </button>
                        <button type='button' className='btn p-0 m-0' style={{border: 'none'}}>
                            <BellIcon size={24} color={'white'}/>
                        </button>
                        <button type='button' className='btn p-0 m-0' style={{border: 'none'}}>
                            <BiUser size={24} className='ic' />
                        </button>
                    </form> 
                </div>
            </div>
        </nav>
    )
}

export default Navbar