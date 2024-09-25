import './style/reset.css';
import './style/style.css';

import ProjectListClass from './js/projectList.js';
import generateAddForm from './addForm.js';
import generateEditForm from './editform.js';

const controlContainer = document.getElementById('controlContainer');
controlContainer.appendChild(generateAddForm());

const projectBox = document.createElement('div');
controlContainer.appendChild(projectBox);


const projectArea = document.getElementById('projectArea');

const taskArea = document.getElementById('taskArea');

const popUpWindowFormArea = document.getElementById('popUpFormArea');

export const projectList = new ProjectListClass;

export function regenerateTaskList (projectID) {
    taskArea.innerHTML = '';
    if(projectID){
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
                let deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', function(){
                        taskDelete(projectID, task.getID());
                    });
                    singleTask.appendChild(deleteButton);
                let editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', function(){
                        popUpWindowFormArea.innerHTML = '';
                        popUpWindowFormArea.appendChild(generateEditForm(projectID))
                    });
                    singleTask.appendChild(editButton);
                taskArea.appendChild(singleTask);
        });
    }
}

export function regenerateSingleProject (projectID) {
    projectArea.innerHTML = '';
    if(projectID){
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
        const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function(){
                popUpWindowFormArea.innerHTML = '';
                popUpWindowFormArea.appendChild(generateEditForm(projectID))
            });
            projectBox.appendChild(editButton);
        projectList.changeCurrentProject(projectID);
        projectBox.appendChild(generateAddForm(projectID));
        projectArea.appendChild(projectBox);
    }
}

function taskDelete (projectID, taskID) {
    let searchedProject = projectList.findProject(projectID);
    searchedProject.removeTask(taskID);
    regenerateTaskList(projectID);
}

function projectDelete (projectID) {
    projectList.removeProject(projectID);
    regenerateProjectList();
    if(projectID == projectList.getCurrentProject()){
        regenerateSingleProject();
        regenerateTaskList();
    }
}

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
                projectDelete(project.getID());
            });
        projectTitle.textContent = project.getTitle();
        projectTitle.addEventListener('click', function(event){
            regenerateTaskList(event.target.parentElement.id);
            regenerateSingleProject(event.target.parentElement.id);
        });
        newDiv.appendChild(projectTitle);
        newDiv.appendChild(deleteButton);
        projectBox.appendChild(newDiv);
    });
};