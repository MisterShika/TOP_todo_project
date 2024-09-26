import Project from './js/project.js';
import Task from './js/task.js';
import {projectList, regenerateProjectList, regenerateTaskList} from './index.js';

function generateAddForm (projectID) {
    const mainForm = document.createElement('form');
    const priorityField = document.createElement('select');
        priorityField.id = 'itemPriority';
        const priorityNone = document.createElement('option');
            priorityNone.value = 'none';
            priorityNone.text = '';
            priorityField.appendChild(priorityNone);
        const priorityLow = document.createElement('option');
            priorityLow.value = 'low';
            priorityLow.text = 'Low';
            priorityField.appendChild(priorityLow);
        const priorityMed = document.createElement('option');
            priorityMed.value = 'medium';
            priorityMed.text = 'Medium';
            priorityField.appendChild(priorityMed);
        const priorityHigh = document.createElement('option');
            priorityHigh.value = 'high';
            priorityHigh.text = 'High';
            priorityField.appendChild(priorityHigh);
        priorityField.setAttribute('name', 'itemPriority');
    const itemTitle = document.createElement('input');
        itemTitle.id = 'itemName';
        itemTitle.setAttribute('type', 'text');
        itemTitle.setAttribute('placeholder', 'Enter Title');
        itemTitle.setAttribute('name', 'itemName');
    const itemDue = document.createElement('input');
        itemDue.id = 'itemDue';
        itemDue.setAttribute('type', 'text');
        itemDue.setAttribute('placeholder', 'Enter Due Date');
        itemDue.setAttribute('name', 'itemDue');
    const itemDesc = document.createElement('textarea');
        itemDesc.id = 'itemDesc';
        itemDesc.setAttribute('name', 'itemDesc');
        itemDesc.setAttribute('placeholder', 'Enter Description');
    const itemSubmit = document.createElement('input');
        itemSubmit.setAttribute('type', 'submit');
        itemSubmit.setAttribute('value', 'Submit');

    mainForm.appendChild(priorityField);
    mainForm.appendChild(itemTitle);
    mainForm.appendChild(itemDue);
    mainForm.appendChild(itemDesc);
    mainForm.appendChild(itemSubmit);

    mainForm.classList.add('addForm', 'defaultForm');


    mainForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Use FormData to extract values from the form
        const formData = new FormData(this);

        // Get individual values from the form
        const title = formData.get('itemName');
        const dueDate = formData.get('itemDue');
        const priority = formData.get('itemPriority');
        const description = formData.get('itemDesc');

        this.querySelector('#itemPriority').selectedIndex = 0;
        this.querySelector('#itemName').value = '';
        this.querySelector('#itemDue').value = '';
        this.querySelector('#itemDesc').value = '';

        // If a projectID exists in this form, then it's a task, and it
        // needs to be added to the array of projectID
        if(projectID){
            let addedTask = new Task({
                title: title,
                dueDate: dueDate,
                priority: priority,
                description: description,
                parentID: projectID
            });
            projectList.findProject(projectID).addTask(addedTask);
            regenerateTaskList(projectID);
        // Otherwise it's a project and just add it to the list.
        }else{
            let addedProject = new Project({
                title: title,
                dueDate: dueDate,
                priority: priority,
                description: description
            });
            projectList.addProject(addedProject);
            regenerateProjectList();
        }
        
    })


    return mainForm;
}

export default generateAddForm;