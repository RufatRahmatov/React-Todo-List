import React, { useState } from 'react';
import './TodoList.scss';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleAddTask = () => {
        if (task) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    const handleToggleTask = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const handleEditTask = (index) => {
        setCurrentTask({ text: tasks[index].text, index });
        setTask(tasks[index].text);
        setIsEditing(true);
    };

    const handleUpdateTask = () => {
        if (task) {
            const newTasks = tasks.map((t, index) =>
                index === currentTask.index ? { ...t, text: task } : t
            );
            setTasks(newTasks);
            setTask('');
            setIsEditing(false);
            setCurrentTask(null);
        }
    };

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <input type="text" value={task} onChange={handleChange} />
            {isEditing ? (
                <button onClick={handleUpdateTask}>Update </button>
            ) : (
                <button onClick={handleAddTask}>Add </button>
            )}
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <span onClick={() => handleToggleTask(index)}>
                            {task.text}
                        </span>
                        <button onClick={() => handleEditTask(index)}>Edit</button>
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
