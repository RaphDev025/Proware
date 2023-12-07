const express = require('express')
const { getNotif, getNotifId, createNotif, updateNotif, deleteHistory } = require('../Controllers/NotifController')

const router = express.Router()

router.get('/', getNotif)

router.get('/:id', getNotifId)

router.post('/', createNotif)

router.delete('/:id', deleteHistory)

router.patch('/:id', updateNotif)

module.exports = router