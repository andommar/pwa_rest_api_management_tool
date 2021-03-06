const URL = 'https://jrelloapp.herokuapp.com/'
//http://localhost:3000/
export default ({
    state: {
        project: {},
        projects: [],
        filteredProjects: [],
        projectTasks: [],
        filteredTasks: {Backlog:[], Todo:[]}
    },
    getters: {
        getProject(state) {
            return state.project
        },
        getProjects (state) {
            return state.projects
        },
        getProjectTasks(state) {
            return state.projectTasks
        },
        getFilteredTasks(state) {
            return state.filteredTasks
        },
        getFilteredProjects(state){
            return state.filteredProjects
        },
        getProjectMembers(state){
            return state.project.projectMembers
        }
    },
    mutations: {
        setProject(state, payload) {
            state.project = payload
        },
        setProjects(state, payload) {
            state.projects = payload
        },
        setTasks(state, payload) {
            state.projectTasks = payload
        },
        setFilteredTasks(state, payload) {
            state.filteredTasks = payload
        },
        setFilteredProjects(state, payload){
            state.filteredProjects = payload
        }

    },
    actions: {
        filterProject ({commit, state}, text){
            console.log(text)
            const textClient = text.toLowerCase()
            console.log(textClient)
            const filter = state.projects.filter(project =>{
                const textServer = project.name.toLowerCase()
                if(textServer.includes(textClient)){
                    return project
                }
            })
            commit ('setFilteredProjects', filter)
        },
        async fetchProject ({commit}, projectId) {
            try {
                const res = await fetch(URL+"projects/get/"+projectId)
                const data = await res.json()
                console.log(data)
                commit('setProject', data)
            }
            catch(error) {
                console.log(error)
            }
        },
        async fetchProjectbyTask ({commit}, taskId) {
            try {
                const res = await fetch(URL+"projects/get/bytask/"+taskId)
                const data = await res.json()
                console.log(data)
                commit('setProject', data)
            }
            catch(error) {
                console.log(error)
            }
        },
        async fetchProjects ({commit}) {
            try {
                const res = await fetch(URL+"projects")
                const data = await res.json()
                commit('setProjects', data)
                commit('setFilteredProjects', data)
            }
            catch(error) {
                console.log(error)
            }
        },
        async fetchProjectTasks ({commit}, projectId) {
            try {
                const res = await fetch(URL+"projects/get/"+projectId+"/tasks")
                const data = await res.json()
                console.log(data.projectTasks)
                commit('setTasks', data.projectTasks)

            }
            catch (error) {
                console.log(error)
            }
        },
        filterTasks ({commit, state}, status){
            const filtered = state.projectTasks.filter(task=> task.taskKanbanStatus === status)
            commit('setFilteredTasks', filtered)
        },
        async newProject({commit}, project) {
            try{
                const localToken = localStorage.getItem('token')
                console.log('localUser', localToken)
                const requestOptions = {
                    method: "POST",
                    headers: {
                        //if we dont put this in sometimes it might not accept the data
                        "Content-Type": "application/json",
                        // "Host": 'https://*.herokuapp.com',
                        "auth-token": localToken
                    },
                    body: JSON.stringify({ //stringify gets the data and converts it into json instance
                        name: project.name,
                        description: project.description,
                        // projectTasks: project.tasks
                        projectMembers: project.projectMembers,
                        projectTotalHoursAllocated: project.totalhours,
                        projectStartDate: project.projectStartDate,
                        projectEndDate: project.projectEndDate,
                        projectLeader: project.projectLeader
                    })
                }
                const res = await fetch(URL+"projects/new", requestOptions)
                const projectDB = await res.json()
                console.log(projectDB)
                if(!projectDB.error)
                    commit('setProject', projectDB)
            } catch (error) {
                console.log(error)
            }
        },
        async updateProjectTask ({commit}, params){
            try {
                const localToken = localStorage.getItem('token')
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        // "Host": 'https://*.herokuapp.com',
                        "auth-token": localToken
                    },
                    body: JSON.stringify({
                        projectTasks: params.tasksID
                    })
                }
                const res = await fetch(URL+"projects/update/"+params.id, requestOptions)
                const data = res.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateProject ({commit}, params){
            try {
                const localToken = localStorage.getItem('token')

                const updatedProject = params.updatedProject
                console.log(updatedProject)
                const result ={}

                if(updatedProject.name)
                    result.name= updatedProject.name
                if(updatedProject.description)
                    result.description= updatedProject.description
                if(updatedProject.projectStartDate)
                    result.projectStartDate= updatedProject.projectStartDate
                if(updatedProject.projectEndDate)
                    result.projectEndDate= updatedProject.projectEndDate
                if(updatedProject.projectMembers)
                    result.projectMembers= updatedProject.projectMembers


                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        // "Host": 'https://*.herokuapp.com',
                        "auth-token": localToken
                    },
                    body: JSON.stringify(result)
                }
                const res = await fetch(URL+"projects/update/"+params.id, requestOptions)
                const data = res.json()
                data.then(res=>{
                    if(!res.error){
                        commit('setProject', res)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        async deleteProject ({commit}, projectId){
            try {
                const localToken = localStorage.getItem('token')
                const requestOptions = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        // "Host": 'https://*.herokuapp.com',
                        "auth-token": localToken
                    }
                }
                const res = await fetch(URL+'projects/delete/'+projectId, requestOptions)
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

    },
    modules: {

    }
  })