import React, { useState, useEffect } from 'react';
import { DoughnutChart, LineChart, Overview, Table } from 'Components';
import { doughnutData } from 'Utils/initialData';

const Dashboard = () => {
    const [defaultBtn, setDefault] = useState('today');
    const [totalOrders, setTotalOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [orders, setOrders] = useState(null);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('today');

    const subHeaders = [
        'Item Code',
        'Item Description',
        'Inventory Class',
        'Quantity',
        'Selling Price',
        'Sub Total',
    ];

    const headers = [
        'Invoice ID',
        'Date',
        'User ID',
        'User Name',
        'Total Items',
        'Total Amount',
        'Status',
        'Action',
        'Invoice',
    ];

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://proware-api.vercel.app/api/orders');
            if (response.ok) {
                const data = await response.json();

                // Filter orders based on the createdAt field
                const filteredOrders = filterOrdersByTimePeriod(data, selectedTimePeriod);

                // Filter the received orders
                const receivedOrders = filteredOrders.filter(order => order.status === 'Received');

                setTotalOrders(receivedOrders.length);
                setRevenue(receivedOrders.reduce((acc, order) => acc + order.total_amount, 0));
                setOrders(filteredOrders);
            } else {
                throw new Error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchUsersCount = async () => {
      try {
          const response = await fetch('https://proware-api.vercel.app/api/users/count');
          if (response.ok) {
              const data = await response.json();
              setUsersCount(data.totalUsers);
          } else {
              throw new Error('Failed to fetch users count');
          }
      } catch (error) {
          console.error('Error fetching users count:', error);
      }
  };

    const filterOrdersByTimePeriod = (orders, timePeriod) => {
        const today = new Date();
        let startDate, endDate;

        switch (timePeriod) {
            case 'week':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
                break;
            case 'month':
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 1);
                break;
            case 'year':
                startDate = new Date(today);
                startDate.setFullYear(today.getFullYear() - 1);
                break;
            default:
                // Default to 'today'
                startDate = new Date(today);
                break;
        }

        // Filter orders based on the createdAt field within the selected time period
        return orders.filter(order => new Date(order.createdAt) >= startDate);
    };

    const handleTimePeriodClick = (timePeriod) => {
        setDefault(timePeriod);
        setSelectedTimePeriod(timePeriod);
    };

    useEffect(() => {
        fetchOrders();
    }, [selectedTimePeriod]);

    useEffect(() => {
      fetchUsersCount();
  }, []);

  return (
    <main id='dash' className='container-fluid '>
      <section className='container-fluid px-3 py-2'>
        <div className='d-flex justify-content-start py-2'>
          <div className='d-flex rounded-2' style={{ border: '1px solid var(--dark-blue)' }}>
            <button
              className={`${defaultBtn === 'today' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`}
              onClick={() => {
                setDefault('today');
                setSelectedTimePeriod('today');
              }}
            >
              Today
            </button>
            <button
              className={`${defaultBtn === 'week' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`}
              onClick={() => {
                setDefault('week');
                setSelectedTimePeriod('week');
              }}
            >
              Week
            </button>
            <button
              className={`${defaultBtn === 'month' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`}
              onClick={() => {
                setDefault('month');
                setSelectedTimePeriod('month');
              }}
            >
              Month
            </button>
            <button
              className={`${defaultBtn === 'year' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`}
              onClick={() => {
                setDefault('year');
                setSelectedTimePeriod('year');
              }}
            >
              Year
            </button>
          </div>
        </div>
        <div className='d-flex gap-3 pt-2'>
            <Overview desc={'Revenue'} data={revenue || 0} color={'#0694A2'} icon={'tabler:currency-peso'} />
          
            <Overview desc={'Orders Received'} data={totalOrders} color={'#FF8A4C'} icon={'mdi:cart-check'} />
            <Overview desc={'Total Users'} data={usersCount} color={'#0E9F6E'} icon={'fluent:people-team-28-regular'} />
        </div>
      </section>
      <section className='px-3 py-2 d-grid statistic-container'>
        <div className='statistic rounded-3 p-3' style={{ height: '350px' }}>
          <h4 className='header m-0'>Best Selling Uniform</h4>
          <DoughnutChart data={doughnutData} />
        </div>
        <div className='statistic rounded-3 p-3' style={{ height: '350px' }}>
          <h4 className='header m-0'>Total Sales</h4>
          <LineChart />
        </div>
      </section>
      <section className='px-3 py-2 w-100'>
        <div className='statistic rounded-3 p-3'>
          <h4 className='header'>Recent Invoices</h4>
          <Table headers={headers} subHeader={subHeaders} data={orders} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
