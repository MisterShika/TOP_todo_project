import './style/reset.css';
import './style/style.css';

import './tabSwitcher.js';

import ProjectListClass from './js/projectList.js';
import generateAddForm from './addForm.js';
import generateEditForm from './editform.js';

// Interactables generation
const controlContainer = document.getElementById('controlContainer');
controlContainer.appendChild(generateAddForm());

const projectBox = document.createElement('div');
projectBox.classList.add('projectBox');
controlContainer.appendChild(projectBox);

const projectArea = document.getElementById('projectArea');
const taskArea = document.getElementById('taskArea');
const popUpWindowFormArea = document.getElementById('popUpFormArea');

// List of all projects and related tasks
export const projectList = new ProjectListClass;

export function regenerateTaskList (projectID) {
    // Clear and generate list of all tasks belonging to projectID
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
                        // Task is removed from project object's task array
                        taskDelete(projectID, task.getID());
                    });
                    singleTask.appendChild(deleteButton);
                let editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', function(){
                        // Clear popup and add form. First navigating to project and then using
                        // a function of the project object to grab task from array.
                        popUpWindowFormArea.innerHTML = '';
                        popUpWindowFormArea.appendChild(generateEditForm(projectID, task.getID()))
                    });
                    singleTask.appendChild(editButton);
                taskArea.appendChild(singleTask);
        });
    }
}

export function regenerateSingleProject (projectID) {
    // On generation, clears single project area and populates it with data
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
        // Form to add tasks is also added
        projectBox.appendChild(generateAddForm(projectID));
        // Current project is switched to the one being displayed
        projectList.changeCurrentProject(projectID);
        projectArea.appendChild(projectBox);
    }
}

// Searches project list for project, then searches project for task
// Remove task when found and regenerate task list
function taskDelete (projectID, taskID) {
    let searchedProject = projectList.findProject(projectID);
    searchedProject.removeTask(taskID);
    regenerateTaskList(projectID);
}

// Remove project from project list
// If it's the current project then clear the project and task tabs
function projectDelete (projectID) {
    projectList.removeProject(projectID);
    regenerateProjectList();
    if(projectID == projectList.getCurrentProject()){
        regenerateSingleProject();
        regenerateTaskList();
    }
}

export function regenerateProjectList () {
    // Clear list of projects and repopulate
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
                // Delete project (obviously)
                projectDelete(project.getID());
            });
        projectTitle.textContent = project.getTitle();
        projectTitle.addEventListener('click', function(event){
            // Display project and associated tasks on click
            regenerateTaskList(event.target.parentElement.id);
            regenerateSingleProject(event.target.parentElement.id);
        });
        newDiv.appendChild(projectTitle);
        newDiv.appendChild(deleteButton);
        projectBox.appendChild(newDiv);
    });
};