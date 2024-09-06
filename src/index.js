import './style/reset.css';
import './style/style.css';

import ProjectListClass from './js/projectList.js';
import Project from './js/project.js';
import Task from './js/task.js';
import generateAddForm from './addForm.js';

const mainContainer = document.getElementById('content');
mainContainer.appendChild(generateAddForm());

const projectBox = document.createElement('div');
mainContainer.appendChild(projectBox);

export const projectList = new ProjectListClass;

export function regenerateProjectList () {
    projectBox.innerHTML = '';
    let projectArray = projectList.listProjects();
    projectArray.forEach(project => {
        console.log("hi!");
        let newDiv = document.createElement('div');
        let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function(){
                projectList.removeProject(project.getID());
                regenerateProjectList();
            });
        newDiv.textContent = `Testing: ${project.getID()}`;
        newDiv.appendChild(deleteButton);
        projectBox.appendChild(newDiv);
    });
};














// const testProject = new Project({
//     title: 'Sample Project 1',
//     dueDate: 'Future',
//     priority: 'High',
//     description: 'This is a sample project description'
// });

// const testTask = new Task({
//     title: 'Sample Task 1',
//     dueDate: 'Future',
//     priority: 'High',
//     description: 'This is a sample task description'
// });

// testProject.addTask(testTask.getID());

// console.log(testProject.listTasks());

// testProject.removeTask(testTask.getID());

// console.log(testProject.listTasks());

// console.log(testTask);
