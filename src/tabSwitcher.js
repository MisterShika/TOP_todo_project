const header = document.querySelector('header');
const childTabs = document.querySelectorAll('header>div');

const controlArea = document.getElementById('controlContainer');
const projectArea = document.getElementById('projectArea');
const taskArea = document.getElementById('taskArea');
const childAreas = document.querySelectorAll('#content>div');

function tabSwitch(tab){
    const tabID = tab.id;
    childTabs.forEach(eachDiv => {
        eachDiv.classList.remove('currentTab');
    });
    childAreas.forEach(eachDiv => {
        eachDiv.classList.remove('currentBlock');
    });
    tab.classList.add('currentTab');
    switch(tabID){
        case 'controlButtonArea':
            controlArea.classList.add('currentBlock');
            break;
        case 'projectButtonArea':
            projectArea.classList.add('currentBlock');
            break;
        case 'taskButtonArea':
            taskArea.classList.add('currentBlock');
            break;

    }
}

header.addEventListener('click', function(event) {
    if (event.target && event.target.matches('header>div')) {
        tabSwitch(event.target);
    }
});