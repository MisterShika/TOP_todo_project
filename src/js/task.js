import Item from './item.js';

export default class Task extends Item{
    constructor({title, dueDate, priority, description, notes, parentID}){
        super({title, dueDate, priority, description});
        this.notes = notes;
        this.parentID = parentID;
        this.itemType = 'task';
    }

    getParentID = () => {
        return this.parentID;
    }

}