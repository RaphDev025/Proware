const express = require('express')
const { getOrders, deleteOrder, revenue, countOrders, updateOrder, createOrder } = require('../Controllers/OrderController')

const router = express.Router()

router.get('/', getOrders)

router.get('/count', countOrders)

router.post('/', createOrder) 

router.get('/revenue', revenue) 

router.delete('/:id', deleteOrder)

router.patch('/:id', updateOrder)

module.exports = router