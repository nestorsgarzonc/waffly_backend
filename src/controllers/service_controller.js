import Task from '../models/Service'

export const findAllTasks = async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
}

export const findOneTask = async (req, res) => {
    const tasks = await Task.findById(req.params.id)
    res.json(tasks)
}

export const createTasks = async (req, res) => {
    const new_task = new Task({
        title: req.body.title,
        message: req.body.message,
    });
    const taskSaved = await new_task.save();
    res.json({
        message: "New task saved",
        ok: true,
        ...taskSaved._doc
    })
}

export const deleteOneTask = async (req, res) => {
    const tasks = await Task.findByIdAndDelete(req.params.id)
    if(!tasks){
        res.json({deleted: false})
    }
    res.json({deleted: true, ...tasks})
}