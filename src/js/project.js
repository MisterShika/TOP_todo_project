import Item from './item.js';

export default class Project extends Item{
    constructor({title, dueDate, priority, description}){
        super({title, dueDate, priority, description});
        this.tasks = [];
    }

    listTasks = () => {
        return this.tasks;
    }

    addTask = (task) => {
        this.tasks.push(task);
    }

    removeTask = (task) => {
        this.tasks = this.tasks.filter(element =>
            element !== task
        );
    }


}