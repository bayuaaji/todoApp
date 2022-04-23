const {Task, Objective} = require('../models')

const taskController = {
    createTask: async (req,res) => {
        const body = req.body
        try {
            const task = await Task.create(
                {
                    title: body.title, 
                    action_time: body.action_time,
                    is_Finished: body.is_Finished
                })

            let objective = await Objective.bulkCreate(body.objective_list)
            
            // objective[i].task_id = task.id

            for(var i = 0; i<=objective.length-1; i++){
                let objectiveId = objective[i].id
                await Objective.update(
                    {task_id: task.id},
                    {where: {id : objectiveId} }
                )
            }

            if(!task || !objective){
                return res.status(400).json({
                    status: "Bad Request",
                    message: "Failed to create task",
                    result: {}
                })
            }
            console.log(objective[0].task_id)

            res.status(201).json({
                status: "success",
                message: "successfully created new task",
                result: task, objective
            })
        } catch (error) {
            return res.status(500).json({
                status: "Internal Server Error",
                message: error.message,
                result: {}
            })
        }
    },
    getAllTasks: async(req,res) => {
        let {page, limit, keyword} = req.query

        try {
            let search;
            if(keyword){
                search = {
                    title: {
                        [Op.Like]: `%${keyword}%`
                    }
                }
            }

            let action_time;
            if(keyword){
                action_time = {
                    action_time: {
                        [Op.Like]: `%${keyword}`
                    }
                }
            }

            let is_Finished;
            if(keyword){
                is_Finished = {
                    is_Finished: {
                        [Op.Like]: `%${keyword}`
                    }
                }
            }

            const task = await Task.findAll({
                where: {
                    ...search
                }
            })



        } catch (error) {
            return res.status(500).json({
                status: "Internal Server Error",
                message: error.message,
                result: {}
            })
        }
    }, getTask: async (req,res) =>{
        const id = req.params.id
        try {
            const task = await Task.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Objective,
                        as: "objective",
                    }
                ]
            })

            if(!task){
                return res.status(404).json({
                    status: "Not Found"
                })
            }

            res.status(200).json({
                result: task
            })

        } catch (error) {
            return res.status(500).json({
                status: "Internal Server Error",
                message: error.message,
                result: {}
            })
        }
    },getObjective: async (req,res) =>{
        const id = req.params.id
        try {
            const objective = await Objective.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Task,
                        as: "task",
                    }
                ]
            })

            if(!objective){
                return res.status(404).json({
                    status: "Not Found"
                })
            }

            res.status(200).json({
                result: objective
            })

        } catch (error) {
            return res.status(500).json({
                status: "Internal Server Error",
                message: error.message,
                result: {}
            })
        }
    },
    deleteTask: async(req,res) => {
        const id = req.params.id
        try {
            const task = await Task.destroy({
                where: {
                    id
                }
            })
            console.log(task);
            if(!task){
                return res.status(404).json({
                    status: "Not Found",
                    message: "Task does not exist",
                    result: {}
                })
            }

            res.status(200).json({
                status: "success"
            })

        } catch (error) {
            return res.status(500).json({
                status: "Internal Server Error",
                message: error.message,
                result: {}
            })
        }
    }
}

module.exports = taskController