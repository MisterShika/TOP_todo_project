import {projectList, regenerateProjectList, regenerateTaskList, regenerateSingleProject} from './index.js';

const popUpWindow = document.getElementById('popUp');
// const popUpWindowFormArea = document.getElementById('popUpFormArea');

function generateEditForm (projectID, taskID) {

    // Display popup window by removing class that hides it
    popUpWindow.classList.remove('hidePop');

    let editItem;

    // If edit form was given a taskID, find task via
    // its associated projectID, otherwise just grab the project
    if(taskID){
        let parentProject = projectList.findProject(projectID);
        editItem = parentProject.getTask(taskID);
    }else{
        editItem = projectList.findProject(projectID);
    }
    
    const editForm = document.createElement('form');
    const priorityLabel = document.createElement('label');
        priorityLabel.htmlFor = 'itemPriority';
        priorityLabel.innerText = 'Priority: '; 
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
    const itemTitleLabel = document.createElement('label');
        itemTitleLabel.htmlFor = 'itemName';
        itemTitleLabel.innerText = 'Name: '; 
    const itemTitle = document.createElement('input');
        itemTitle.id = 'itemName';
        itemTitle.setAttribute('type', 'text');
        itemTitle.setAttribute('placeholder', 'Enter Title');
        itemTitle.setAttribute('name', 'itemName');
    const itemDueLabel = document.createElement('label');
        itemDueLabel.htmlFor = 'itemDue';
        itemDueLabel.innerText = 'Due By: '; 
    const itemDue = document.createElement('input');
        itemDue.id = 'itemDue';
        itemDue.setAttribute('type', 'text');
        itemDue.setAttribute('placeholder', 'Enter Due Date');
        itemDue.setAttribute('name', 'itemDue');
    const itemDescLabel = document.createElement('label');
        itemDescLabel.htmlFor = 'itemDesc';
        itemDescLabel.innerText = 'Description: '; 
    const itemDesc = document.createElement('textarea');
        itemDesc.id = 'itemDesc';
        itemDesc.setAttribute('name', 'itemDesc');
        itemDesc.setAttribute('placeholder', 'Enter Description');
    const itemSubmit = document.createElement('input');
        itemSubmit.setAttribute('type', 'submit');
        itemSubmit.setAttribute('value', 'Submit');

    // Form values are retrieved from the object and displayed
    // in order to be edited
    priorityField.value = editItem.getPriority();
    itemTitle.value = editItem.getTitle();
    itemDue.value = editItem.getDueDate();
    itemDesc.value = editItem.getDescription();

    editForm.appendChild(priorityLabel);
    editForm.appendChild(priorityField);
    editForm.appendChild(itemTitleLabel);
    editForm.appendChild(itemTitle);
    editForm.appendChild(itemDueLabel);
    editForm.appendChild(itemDue);
    editForm.appendChild(itemDescLabel);
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

        // After editing, regenerate project list, as well as the single
        // project and task list that was associated with the given projectID
        // and then close the popup window by re-adding the hide class.
        regenerateProjectList();
        regenerateSingleProject(projectID);
        regenerateTaskList(projectID);
        popUpWindow.classList.add('hidePop');
    });

    editForm.classList.add('editForm', 'defaultForm');

    return editForm;

}

export default generateEditForm;