const express = require('express')
const { getHistory, getHistoryId, createHistory, updateHistory, deleteHistory } = require('../Controllers/HistoryController')

const router = express.Router()

router.get('/', getHistory)

router.get('/:id', getHistoryId)

router.post('/', createHistory)

router.delete('/:id', deleteHistory)

router.patch('/:id', updateHistory)

module.exports = router