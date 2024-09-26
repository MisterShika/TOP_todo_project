import Item from './item.js';

export default class Project extends Item{
    constructor({title, dueDate, priority, description}){
        super({title, dueDate, priority, description});
        this.tasks = [];
        this.itemType = 'project';
    }

    listTasks = () => {
        return this.tasks;
    }

    addTask = (task) => {
        this.tasks.push(task);
    }

    removeTask = (taskID) => {
        const index = this.tasks.findIndex(task => task.id === taskID);
        this.tasks.splice(index, 1);
    }

    getTask = (taskID) => {
        return this.tasks.find(task => task.id === taskID);
    }


}