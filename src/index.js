import './style/reset.css';
import './style/style.css';

import Project from './js/project.js';
import Task from './js/task.js';

const testProject = new Project({
    title: 'Sample Project 1',
    dueDate: 'Future',
    priority: 'High',
    description: 'This is a sample project description'
});

const testTask = new Task({
    title: 'Sample Task 1',
    dueDate: 'Future',
    priority: 'High',
    description: 'This is a sample task description'
});

testProject.addTask(testTask.getID());

console.log(testProject.listTasks());

testProject.removeTask(testTask.getID());

console.log(testProject.listTasks());

console.log(testTask);
