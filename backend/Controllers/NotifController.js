const Notif = require('../Models/NotifModel')
const mongoose = require('mongoose')

// Get all history
const getNotif = async (req, res) => {
    const notif = await Notif.find({}).sort({createdAt: -1})
    res.status(200).json(notif)
}

// get single user
const getNotifId = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No notif Found'})
    }
    const notif = await Notif.findById(id)

    if(!notif){
        return res.status(404).json({error: 'No notif Found'})
    }
    res.status(200).json(notif)
}

// Create history
const createNotif = async (req, res) => {
    const { to, from, content, title } = req.body
    try{
        const notif = await Notif.create({ to, from, content, title })
        res.status(200).json(notif)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Update history
const updateNotif = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No notif found'})
    }

    const notif = await Notif.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!notif){
        return res.status(404).json({error: 'No notif found'})
    }
    res.status(200).json(notif)
}

// Delete history
const deleteHistory = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No notif found'})
    }

    const notif = await Notif.findOneAndDelete({_id: id})

    if(!notif){
        return res.status(404).json({error: 'No notif found'})
    }
    res.status(200).json(notif)
}

module.exports = { getNotif, getNotifId, createNotif, updateNotif, deleteHistory }