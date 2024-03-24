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
    }

    markComplete = () => {
        this.complete = true;
    }

    getID = () => {
        return this.id;
    }
}