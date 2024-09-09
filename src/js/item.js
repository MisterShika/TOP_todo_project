const { v4: uuidv4 } = require('uuid');

export default class Item{
    constructor({title, dueDate, priority, description}){
        this.title = title;
        this.creationDate = Date.now();
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;

        this.id = uuidv4();
        this.complete = false;
        this.itemType;
    }

    markComplete = () => {
        this.complete = true;
    }

    printClassName = () => {
        return this.itemType;
    }

    getID = () => {
        return this.id;
    }

    getTitle = () => {
        return this.title;
    }

    getPriority = () => {
        return this.priority;
    }

    getDueDate = () => {
        return this.dueDate;
    }

    getDescription = () => {
        return this.description;
    }

}