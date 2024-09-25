import Project from './js/project.js';
import Task from './js/task.js';
import {projectList, regenerateProjectList, regenerateTaskList, regenerateSingleProject} from './index.js';

const popUpWindow = document.getElementById('popUp');
const popUpWindowFormArea = document.getElementById('popUpFormArea');

function generateEditForm (itemID) {

    popUpWindow.classList.remove('hidePop');

    let editItem = projectList.findProject(itemID)
    
    console.log(editItem.getTitle());

    const editForm = document.createElement('form');
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


    priorityField.value = editItem.getPriority();
    itemTitle.value = editItem.getTitle();
    itemDue.value = editItem.getDueDate();
    itemDesc.value = editItem.getDescription();

    editForm.appendChild(priorityField);
    editForm.appendChild(itemTitle);
    editForm.appendChild(itemDue);
    editForm.appendChild(itemDesc);
    editForm.appendChild(itemSubmit);

    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const formData = new FormData(this);

        const title = formData.get('itemName');
        const dueDate = formData.get('itemDue');
        const priority = formData.get('itemPriority');
        const description = formData.get('itemDesc');

        editItem.editTitle(title);
        editItem.editPriority(priority);
        editItem.editDueDate(dueDate);
        editItem.editDescription(description);

        regenerateProjectList(editItem.getID());
        regenerateSingleProject(editItem.getID());
        regenerateTaskList(editItem.getID());
        popUpWindow.classList.add('hidePop');
    });

    editForm.classList.add('editForm');

    return editForm;

}

export default generateEditForm;