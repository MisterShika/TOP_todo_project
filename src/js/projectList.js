
export default class ProjectListClass{
    constructor(){
        this.projects = [];
    }

    listProjects = () => {
        return this.projects;
    }

    addProject = (project) => {
        this.projects.push(project);
    }

    removeProject = (projectID) => {
        const index = this.projects.findIndex(project => project.id === projectID);
        this.projects.splice(index, 1);
    }

}