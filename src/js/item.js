const { v4: uuidv4 } = require('uuid');

// Item class which is extended to projects and tasks.
// Some functions are not used in this application, but are still here
// because I see value in them if I need to add or debug something in
// the future.

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

    editTitle = (data) => {
        this.title = data;
    }

    editPriority = (data) => {
        this.priority = data;
    }

    editDueDate = (data) => {
        this.dueDate = data;
    }

    editDescription = (data) => {
        this.description = data;
    }

}