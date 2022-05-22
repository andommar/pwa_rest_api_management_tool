import { renderSlot } from "vue"

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
        }

    },
    actions: {
        async fetchProject ({commit}, projectId) {
            try {
                const res = await fetch("http://localhost:3000/projects/get/"+projectId)
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
                const res = await fetch("http://localhost:3000/projects/get/bytask/"+taskId)
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
                const res = await fetch("http://localhost:3000/projects")
                const data = await res.json()
                commit('setProjects', data)
            }
            catch(error) {
                console.log(error)
            }
        },
        async fetchProjectTasks ({commit}, projectId) {
            try {
                const res = await fetch("http://localhost:3000/projects/get/"+projectId+"/tasks")
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
                const res = await fetch("http://localhost:3000/projects/new", requestOptions)
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
                        "auth-token": localToken
                    },
                    body: JSON.stringify({
                        projectTasks: params.tasksID
                    })
                }
                const res = await fetch("http://localhost:3000/projects/update/"+params.id, requestOptions)
                const data = res.json()
                console.log(data)
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
                        "auth-token": localToken
                    }
                }
                const res = await fetch('http://localhost:3000/projects/delete/'+projectId, requestOptions)
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