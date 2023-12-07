const History = require('../Models/HistoryModel')
const mongoose = require('mongoose')

// Get all history
const getHistory = async (req, res) => {
    const history = await History.find({}).sort({createdAt: -1})
    res.status(200).json(history)
}

// get single user
const getHistoryId = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No history Found'})
    }
    const history = await History.findById(id)

    if(!history){
        return res.status(404).json({error: 'No history Found'})
    }
    res.status(200).json(history)
}

// Create history
const createHistory = async (req, res) => {
    const { total_qty, total_amount, item_list, user_name, user_id, status } = req.body
    try{
        const history = await History.create({ total_qty, total_amount, item_list, user_name, user_id, status })
        res.status(200).json(history)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Update history
const updateHistory = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No history found'})
    }

    const history = await History.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!history){
        return res.status(404).json({error: 'No history found'})
    }
    res.status(200).json(history)
}

// Delete history
const deleteHistory = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No history found'})
    }

    const history = await History.findOneAndDelete({_id: id})

    if(!history){
        return res.status(404).json({error: 'No history found'})
    }
    res.status(200).json(history)
}

module.exports = { getHistory, getHistoryId, createHistory, updateHistory, deleteHistory }