const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fs = require('fs');
const path = require('path');

const tasksFile = path.join(__dirname, 'task.json');

// Function to read tasks
const readTasks = () => {
    try {
        const data = fs.readFileSync(tasksFile, 'utf8');
        console.log('Tasks read successfully');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error reading tasks:', error);
        return { tasks: [] };
    }
};

// Function to write tasks
const writeTasks = (data) => {
    fs.writeFileSync(tasksFile, JSON.stringify(data, null, 2));
};

// Get all tasks
app.get('/tasks', (req, res) => {
    // Get query parameters
    const query = req.query;;
    console.log('GET /tasks: Sending all task with query:', query);
    const data = readTasks();
    
    // Filter tasks based on query parameters
    if (query.completed) {
        const completedTasks = data.tasks.filter(task => task.completed === true);
        res.json(completedTasks);
    } else if (query.sort) {
        const sortedTasks = data.tasks.sort((a, b) => a.title.localeCompare(b.title));
        res.json(sortedTasks);
    } else {
        res.json(data.tasks);
    }
});

// Get task by id
app.get('/tasks/:id', (req, res) => {
    // Get task id from request parameters
    console.log('GET /tasks/:id: Sending task with id:', req.params.id);
    const data = readTasks();
    const taskId = parseInt(req.params.id);
    const requiredTask = data.tasks.find(task => task.id === taskId);
    
    // Check if task exists
    if (!requiredTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Send task
    res.json(requiredTask);
});

// Get tasks by priority level
app.get('/tasks/priority/:level', (req, res) => {
    // Get priority level from request parameters
    const data = readTasks();
    // Filter tasks based on priority level
    const priorityTasks = data.tasks.filter(task => task.priority === req.params.level);
    res.json(priorityTasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
    // Get task data from request body
    console.log('POST /tasks: Creating new task');
    const { title, description, completed, priority = 'low' } = req.body;
    
    // Check if task data is valid
    if (!title || !description || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid task data' });
    }
    
    // Create new task
    const data = readTasks();
    const newTask = {
        id: data.tasks.length + 1,
        title,
        description,
        completed,
        priority
    };
    data.tasks.push(newTask);
    writeTasks(data);
    
    // Log new task and send response
    console.log('New task created:', newTask);
    res.status(201).json({ message: 'Task created successfully', task: newTask });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    // Get task id from request parameters
    console.log('PUT /tasks/:id: Updating task with id:', req.params.id);
    const taskId = parseInt(req.params.id);
    // Get task data from request body
    const { title, description, completed , priority = 'Not Assigned'} = req.body;
    
    // Check if task data is valid
    if (!title || !description || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid task data' });
    }
    
    // Find task index
    const data = readTasks();
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    
    // Check if task exists
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Update task
    const updatedTask = {
        id: taskId,
        title,
        description,
        completed,
        priority: data.tasks[taskIndex].priority || priority
    };
    data.tasks[taskIndex] = updatedTask;
    writeTasks(data);

    // Log updated task and send response
    console.log('Task updated:', updatedTask);
    res.json({ message: 'Task updated successfully', task: updatedTask });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    // Get task id from request parameters
    console.log('DELETE /tasks/:id: Deleting task with id:', req.params.id);
    const taskId = parseInt(req.params.id);
    // Get task index
    const data = readTasks();
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);

    // Check if task exists
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Delete task
    const deletedTask = data.tasks.splice(taskIndex, 1)[0];
    writeTasks(data);
    console.log('Task deleted:', deletedTask);  
    res.json({ message: 'Task deleted successfully', task: deletedTask });
});

app.get('/', (req, res) => {
    // Check if Server is running
    res.send('Server is running on port: 3000');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;