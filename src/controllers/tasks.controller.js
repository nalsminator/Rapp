import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        //devuelve solo los datos creados por el usuario
        user: req.user.id,
    }).populate('user'); //<- como subconsulta para traer todos los datos del usuario
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: "Sigle task not found." });
    res.json(task);
};

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if(!task) return res.status(404).json({ message: "Task not found." });
    res.json(task);
    //para devolver solo el estado OK
    //return res.status(204);
};

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found." });
    res.json(task);
};