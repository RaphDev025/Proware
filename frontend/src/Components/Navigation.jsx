import React, { useState } from 'react'
import logo from 'assets/images/yellowed.png'
import { Link } from 'react-router-dom'
import { handleActiveItem, iconPath } from 'Utils/handlingFunction'
import { IconPark } from 'assets/SvgIcons'
import combochart from 'assets/SvgIcons/combo-chart.png'
import combochart2 from 'assets/SvgIcons/combo-chart-hl.png'

const Navigation = () => {
  const [item, setItem] = useState('dashboard');

  return (
    <>
      <aside id='side' className='position-fixed top-0 left-0 bottom-0 py-2 px-1 gap-5 d-flex align-items-center flex-column'>
          <img src={logo} width={'40%'} alt='logo' />
          <ul className='list-unstyled d-flex flex-column w-100 gap-3'>
            <li onClick={() => handleActiveItem('dashboard', setItem)}>
              <Link to='dashboard' className='w-100 p-2 list-itm rounded-2 gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                <IconPark path={iconPath(item, 'dashboard', 'radix-icons:dashboard', 'radix-icons:dashboard')} size={20} /> Dashboard
              </Link>
            </li>
            <li onClick={() => handleActiveItem('products', setItem)}>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item" style={{backgroundColor: 'transparent', border: 'none'}}>
                  <h2 className="accordion-header">
                    <button className="accordion-button item-list p-2" style={{backgroundColor: 'transparent'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      <span className='d-flex gap-2' style={{fontSize: '0.9rem', color: 'var(--neutral)'}}><IconPark path={iconPath(item, 'products', 'icon-park-outline:clothes-crew-neck', 'icon-park-outline:clothes-crew-neck')} size={20} /> Item</span>
                    </button>
                  </h2>
                  <div id="collapseOne" className="item-list p-0 accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body p-0">
                      <Link to='new-item' className='w-100 p-2 px-4 list-itm rounded-2 my-2 text-decoration-none d-flex align-items-center fw-medium'>
                        - Add New Item
                      </Link>
                      <Link to='products' className='w-100 p-2 px-4 list-itm rounded-2 text-decoration-none d-flex align-items-center fw-medium'>
                        - Item List
                      </Link>
                    </div>
                  </div>
                </div>
              </div> 
            </li>
            <li onClick={() => handleActiveItem('order', setItem)}>
              <Link to='order' className='w-100 p-2 list-itm rounded-2 gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                <IconPark path={iconPath(item, 'order', 'icon-park-outline:transaction-order', 'icon-park-outline:transaction-order')} size={20} /> Order
              </Link>
            </li>
            <li onClick={() => handleActiveItem('inventory', setItem)}>
              <Link to='inventory' className='w-100 p-2 list-itm rounded-2 gap-2 text-decoration-none d-flex align-items-center fw-medium'>
              {/*{item === 'customer' ? <BsPeopleFill size={30} /> : <BsPeople size={30} />}*/}
                <img src={item === 'inventory' ? combochart2 : combochart } width={'20px'} alt='' /> Inventory
              </Link>
            </li>
            <li onClick={() => handleActiveItem('customers', setItem)}>
              <Link to='student-list' className='w-100 p-2 list-itm rounded-2 gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                <IconPark path={iconPath(item, 'customers', 'teenyicons:users-outline', 'teenyicons:users-outline')} size={20} /> Customers
              </Link>
            </li>
            <li onClick={() => handleActiveItem('mssg', setItem)}>
              <Link to='order' className='w-100 p-2 list-itm rounded-2 gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                <IconPark path={iconPath(item, 'mssg', 'ri:message-line', 'ri:message-line')} size={20} /> Messages
              </Link>
            </li>
          </ul>
      </aside>
      <header id='header' className='position-fixed top-0 end-0 p-2 d-flex justify-content-end align-items-center'>
        <div className='d-flex justify-content-end align-items-center pe-5 gap-3'>
          <a href='/' className='itm'>
            <IconPark path={iconPath(item, 'notif', 'mingcute:notification-fill', 'mingcute:notification-fill')} size={20} />
          </a>
          <a href='/' className='itm'>
            <IconPark path={iconPath(item, 'notif', 'solar:user-bold', 'solar:user-bold')} size={20} />
          </a>
        </div>
      </header>
    </>
  )
}

export default Navigation