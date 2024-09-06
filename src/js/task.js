import Item from './item.js';

export default class Task extends Item{
    constructor({title, dueDate, priority, description, notes}){
        super({title, dueDate, priority, description});
        this.notes = notes;
    }


}