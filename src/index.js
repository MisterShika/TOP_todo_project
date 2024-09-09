import './style/reset.css';
import './style/style.css';

import ProjectListClass from './js/projectList.js';
import Project from './js/project.js';
import Task from './js/task.js';
import generateAddForm from './addForm.js';

const controlContainer = document.getElementById('controlContainer');
controlContainer.appendChild(generateAddForm());

const projectBox = document.createElement('div');
controlContainer.appendChild(projectBox);


const projectArea = document.getElementById('projectArea');

const taskArea = document.getElementById('taskArea');

export const projectList = new ProjectListClass;

export function regenerateTaskList (projectID) {
    taskArea.innerHTML = '';
    const taskList = projectList.findProject(projectID).listTasks();
    taskList.forEach(task => {
        let singleTask = document.createElement('div');
            let taskTitle = document.createElement('h3');
                taskTitle.innerHTML = task.getTitle();
                singleTask.appendChild(taskTitle);
            let taskPriority = document.createElement('span');
                taskPriority.innerHTML = task.getPriority();
                singleTask.appendChild(taskPriority);
            let taskDue = document.createElement('span');
                taskDue.innerHTML = task.getDueDate();
                singleTask.appendChild(taskDue);
            let taskDesc = document.createElement('span');
                taskDesc.innerHTML = task.getDescription();
                singleTask.appendChild(taskDesc);
            taskArea.appendChild(singleTask);
    });
}

function displayProject (projectID) {
    projectArea.innerHTML = '';
    const projectBox = document.createElement('div');
        const theProject = projectList.findProject(projectID);
        const projectTitle = document.createElement('h2');
            projectTitle.textContent = theProject.getTitle();
            projectBox.appendChild(projectTitle);
        const projectPriority = document.createElement('span');
            projectPriority.textContent = theProject.getPriority();
            projectBox.appendChild(projectPriority);
        const projectDue = document.createElement('span');
            projectDue.textContent = theProject.getDueDate();
            projectBox.appendChild(projectDue);
        const projectDesc = document.createElement('span');
            projectDesc.textContent = theProject.getDescription();
            projectBox.appendChild(projectDesc);
    projectBox.appendChild(generateAddForm(projectID));
    projectArea.appendChild(projectBox);
}

// function deleteItem (projectID) {

// }

export function regenerateProjectList () {
    projectBox.innerHTML = '';
    const projectArray = projectList.listProjects();
    projectArray.forEach(project => {
        let newDiv = document.createElement('div');
        newDiv.id = project.getID();
        newDiv.classList.add('projectID');
        let projectTitle = document.createElement('span');
        let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function(){
                projectList.removeProject(project.getID());
                regenerateProjectList();
            });
        projectTitle.textContent = project.getTitle();
        projectTitle.addEventListener('click', function(event){
            regenerateTaskList(event.target.parentElement.id);
            displayProject(event.target.parentElement.id);
        });
        newDiv.appendChild(projectTitle);
        newDiv.appendChild(deleteButton);
        projectBox.appendChild(newDiv);
    });
};