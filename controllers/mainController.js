const {Task, Objective} = require('../models')

const taskController = {
    createTask: async (req,res) => {
        const body = req.body
        try {
            const task = await Task.create({title: body.title, action_time: body.action_time})
            let objective = await Objective.bulkCreate(body.objective_list)
            
            for(var i = 0; i<=objective.length-1; i++){
                objective[i].task_id = task.id
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
            res.status(500)
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

            

        } catch (error) {
            
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
            
            if(!task){
                res.status(404).json({
                    status: "Not Found",
                    message: "Task does not exist",
                    result: {}
                })
            }

            res.status(200).json({
                status: "success"
            })

        } catch (error) {
            
        }
    }
}

module.exports = taskController