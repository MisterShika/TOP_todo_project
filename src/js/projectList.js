
export default class ProjectListClass{
    constructor(){
        this.projects = [];
        this.currentProject;
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

    findProject = (projectID) => {
        return this.projects.find(project => project.id === projectID);
    }

    changeCurrentProject = (projectID) =>{
        this.currentProject = projectID;
    }

    getCurrentProject = () => {
        return this.currentProject;
    }

}