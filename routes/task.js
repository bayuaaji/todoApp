const express = require('express')
const router = express.Router()

const {createTask} = require('../controllers/mainController')

router.post('/add', createTask)
// router.get('/get', getAllTasks)
// router.get('/get/:id', getTask)
// router.put('/update/:id', updateTask)
// router.delete('/delete/:id', deleteTask)

module.exports = router