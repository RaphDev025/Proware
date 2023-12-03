import React, {useState, useEffect} from 'react'
import {IconPark} from 'assets/SvgIcons'
import {iconPath} from 'Utils/handlingFunction'
import {Table} from 'Components'

const OrderPage = () => {
  const headers = ['Invoice ID', 'Date', 'User ID', 'User Name', 'Total Items', 'Total Amount', 'Status', 'Action', 'Invoice']
  const subHeaders = ['Item Code', 'Item Description', 'Inventory Class', 'Quantity', 'Selling Price', 'Sub Total']
  const [orders, setOrders] = useState(null)
  const [searchUserId, setSearchUserId] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleSearchUserIdChange = (event) => {
    setSearchUserId(event.target.value);
  };

  const handleStatusFilterChange = (selectedStatus) => {
    setStatusFilter(selectedStatus);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const response = await fetch('https://modiform-api.vercel.app/api/orders');
          const json = await response.json();
          console.log(json)
          if (response.ok) {
            setOrders(json);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      } 
    };
    fetchProducts()
  }, [])

  const filteredOrders = orders &&  orders.filter(order => {
    const userIdMatch = order.user_id.includes(searchUserId);
    const statusMatch = statusFilter === 'All' || order.status === statusFilter;

    return userIdMatch && statusMatch;
  });

  return (
    <main id='order' className='container-fluid '>
      <div className='px-3 pt-3'>
        <h2 className='py-2 m-0 page-header'>Orders List</h2>
        <p className='m-0' style={{fontSize: '11px', color: 'gray'}}>Manage your Order Report</p>
      </div>
      <section className="container-fluid p-3">
        <div className="rounded-3 d-flex align-items-end gap-3 statistic p-3">
        <div className="d-flex w-50 flex-column">
            <label htmlFor="search">Search by User ID</label>
            <input
              type="text"
              className="p-2 w-100 rounded-2"
              id="search"
              placeholder="Search by User ID"
              name="search"
              value={searchUserId}
              onChange={handleSearchUserIdChange}
            />
          </div>

          <div className="dropdown w-50">
            <button
              className="rounded-3 w-100 statistic-2 text-light py-2 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {statusFilter}
            </button>
            <ul className="dropdown-menu">
              <li><p className="dropdown-item" onClick={() => handleStatusFilterChange('All')}>All</p></li>
              <li><p className="dropdown-item" onClick={() => handleStatusFilterChange('Received')}>Received</p></li>
              <li><p className="dropdown-item" onClick={() => handleStatusFilterChange('Processing')}>Processing</p></li>
              <li><p className="dropdown-item" onClick={() => handleStatusFilterChange('Pending')}>Pending</p></li>
              <li><p className="dropdown-item" onClick={() => handleStatusFilterChange('Canceled')}>Canceled</p></li>
            </ul>
          </div>

          <button className='btn btn-primary btn-sm py-2 w-50'><IconPark path={iconPath('', 'messages', 'bytesize:download', 'bytesize:download')} size={20} /> Download all orders received</button>
        </div>
      </section>
      <section className="container-fluid p-3">
        <section className='p-3 rounded-3 statistic'>
          <Table data={filteredOrders} headers={headers} height={'460px'} subHeader={subHeaders} />
        </section>
      </section>
    </main>
  )
}

export default OrderPage