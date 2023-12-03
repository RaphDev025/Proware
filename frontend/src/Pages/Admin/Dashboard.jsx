import React, {useState, useEffect} from 'react'
import { DoughnutChart, LineChart, Overview, Table } from 'Components'
import { doughnutData } from 'Utils/initialData'

const Dashboard = () => {
    const [defaultBtn, setDefault] = useState('today')
    const [orders, setOrders] = useState(null)
    const caption = ['Revenue', 'Orders Received', 'Total Users']
    const [sample, setSample] = useState([0, 0, 0]);
    const icons = ['tabler:currency-peso', 'mdi:cart-check', 'fluent:people-team-28-regular']
    const colors = ['#0694A2', '#FF8A4C', '#0E9F6E']
    const subHeaders = ['Item Code', 'Item Description', 'Inventory Class', 'Quantity', 'Selling Price', 'Sub Total']

    const headers = ['Invoice ID', 'Date', 'User ID', 'User Name', 'Total Items', 'Total Amount', 'Status', 'Action', 'Invoice']

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    usersResponse,
                    ordersResponse,
                    ordersCountResponse
                ] = await Promise.all([
                    fetch('https://modiform-api.vercel.app/api/users/count'),
                    fetch('https://modiform-api.vercel.app/api/orders'),
                    fetch('https://modiform-api.vercel.app/api/orders/count')
                ]);
    
                const [
                    usersJson,
                    ordersJson,
                    ordersCountJson
                ] = await Promise.all([
                    usersResponse.json(),
                    ordersResponse.json(),
                    ordersCountResponse.json()
                ]);
    
                if (usersResponse.ok) {
                    setSample((prevSample) => [
                        prevSample[0],
                        prevSample[1],
                        usersJson.totalUsers,
                    ]);
                }
    
                if (ordersResponse.ok) {
                    setOrders(ordersJson);
                    // Calculate the sum of total_amount
                    const totalAmountSum = ordersJson.reduce((sum, order) => sum + order.total_amount, 0);

                    // Update the sample array with the calculated sum
                    setSample((prevSample) => [
                        totalAmountSum, // Update with revenue
                        prevSample[1], // Keep orders received
                        prevSample[2] // Keep total users
                    ])
                }
    
                if (ordersCountResponse.ok) {
                    setSample((prevSample) => [
                        prevSample[0],
                        ordersCountJson.totalOrders,
                        prevSample[2],
                    ]);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <main id='dash' className='container-fluid '>
            <section className='container-fluid px-3 py-2'>
                <div className='d-flex justify-content-start py-2'>
                    <div className='d-flex rounded-2' style={{border: '1px solid var(--dark-blue)'}}>
                        <button className={`${defaultBtn === 'today' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`} onClick={() => setDefault('today')}>Today</button>
                        <button className={`${defaultBtn === 'week' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`} onClick={() => setDefault('week')}>Week</button>
                        <button className={`${defaultBtn === 'month' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`} onClick={() => setDefault('month')}>Month</button>
                        <button className={`${defaultBtn === 'year' ? 'active' : ''} rounded-1 py-2 px-3 text-light btn-list`} onClick={() => setDefault('year')}>Year</button>
                    </div>
                </div>
                <div className='d-flex gap-3 pt-2'>
                    {caption.map((desc, indx) => (
                        <Overview desc={desc} data={sample[indx]} color={colors[indx]} icon={icons[indx]} key={indx}  />
                    ))}
                </div>
            </section>
            <section className='px-3 py-2 d-grid statistic-container'>
                <div className='statistic rounded-3 p-3' style={{height: '350px'}}>
                    <h4 className='header m-0'>Best Selling Uniform</h4>
                    <DoughnutChart data={doughnutData}/>
                </div>
                <div className='statistic rounded-3 p-3'  style={{height: '350px'}}>
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
    )
}

export default Dashboard