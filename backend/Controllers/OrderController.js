const Order = require('../Models/OrderModel')
const mongoose = require('mongoose')

// Get 
const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({createdAt: -1})
    res.status(200).json(orders)
}


// Create 
const createOrder = async (req, res) => {
    const { total_qty, total_amount, item_list, user_name, user_id, status } = req.body
    try{
        const order = await Order.create({ total_qty, total_amount, item_list, user_name, user_id, status })
        res.status(200).json(order)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Update 
const updateOrder = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No order found'})
    }

    const order = await Order.findOneAndUpdate({_id: id}, {
        ...req.body 
    })

    if(!order){
        return res.status(404).json({error: 'No order found'})
    }
    res.status(200).json(order)
}

// Delete 
const deleteOrder = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No order found'})
    }

    const order = await Order.findOneAndDelete({_id: id})

    if(!order){
        return res.status(404).json({error: 'No order found'})
    }
    res.status(200).json(order)
}

// Count total orders and calculate total revenue
const getTotalRevenue = async () => {
    try {
        // Count total orders
        const totalOrders = await Order.countDocuments({});

        // Sum total revenue (total_amount) across all orders
        const totalRevenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$total_amount' },
                },
            },
        ]);

        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

        return { totalOrders, totalRevenue };
    } catch (error) {
        throw new Error('Error calculating total revenue: ' + error.message);
    }
};

// Modified countOrders function to include total revenue
const countOrders = async (req, res) => {
    try {
        const { totalOrders, totalRevenue } = await getTotalRevenue();
        res.status(200).json({ totalOrders, totalRevenue });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const revenue = async (req, res) => {
    try {
      // Fetch all orders from the database
        const orders = await Order.find();

      // Calculate the sum of total_amount
        const totalAmountSum = orders.reduce((sum, order) => sum + order.total_amount, 0);

      // Send the sum as a response
        res.json({ totalAmountSum });
        console.log(totalAmountSum)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getOrders, deleteOrder, revenue, countOrders, updateOrder, createOrder }