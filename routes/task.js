const express = require('express')
const router = express.Router()

const {createTask, getTask, deleteTask, getObjective} = require('../controllers/mainController')

router.post('/add', createTask)
// router.get('/get', getAllTasks)
router.get('/get/:id', getTask)
// router.put('/update/:id', updateTask)

router.delete('/delete/:id', deleteTask)






router.get('/obj/:id', getObjective)


module.exports = router