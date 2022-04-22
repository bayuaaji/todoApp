const {Task, Objective} = require('../models')

const taskController = {
    createTask: async(req,res)=>{
        const body = req.body
        try {
            const task = await Task.create({title: body.title, action_time: body.action_time})
            const objective = await Objective.bulkCreate(body.objective_list)
        
            console.log(task)
            if(!task && !objective){
                return res.status(400).json({
                    status: "Bad Request",
                    message: "Failed to create task",
                    result: {}
                })
            }

            res.status(201).json({
                status: "success",
                message: "successfully created new task",
                result: task
            })
        } catch (error) {
            res.status(500)
        }
    },
    getAllTask: async(req,res) => {
        let {page, limit, title, isFinished} = req.query

        try {
            let search;
            if(title){
                search = {
                    title: {
                        [Op.Like]: `%${title}%`
                    }
                }
            }

            if(isFinished){
                search
            }
        } catch (error) {
            
        }
    }
}

module.exports = taskController