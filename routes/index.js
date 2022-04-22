const express = require('express')
const router = express.Router()
const taskRoutes = require('./task')
// const objectiveRoutes = require('./objective')

router.use('/task', taskRoutes)
// router.use('/objective', objectiveRoutes)

module.exports = router