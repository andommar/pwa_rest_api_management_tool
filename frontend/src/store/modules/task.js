
export default ({
    state: {
        task: [],
        tasks:[],
        filteredTasks: []
    },
    getters: {
        getTask(state){
            return state.task
        },
        getTasks(state){
            return state.tasks
        },
        getFilteredTask(state){
            return state.filteredTasks
        }
    },
    mutations: {
        setTask(state, payload) {
            state.task = payload
        },
        setTasks(state, payload) {
            state.tasks = payload
        },
        setFilteredTasks(state, payload) {
            state.filteredTasks = payload
        },
    },
    actions: {
        filterTask ({commit, state}, text){
            console.log(text)
            const textClient = text.toLowerCase()
            const filter = state.tasks.filter(task =>{
                const textServer = task.title.toLowerCase()
                if(textServer.includes(textClient)){
                    return task
                }
            })
            commit ('setFilteredTasks', filter)
        },
        async fetchTasks ({commit}){
            try {
                const res = await fetch('http://localhost:3000/tasks')
                const data = await res.json()
                commit('setTasks', data)
                commit('setFilteredTasks', data)

            } catch(error) {
                console.log(error)
            }
        },
        async fetchTask ({commit}, taskId){
            try {
                const res = await fetch("http://localhost:3000/tasks/get/"+taskId)
                const data = await res.json()
                commit('setTask', data)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        },
        async updateTask ({commit}, task) {
            try {
                const localToken = localStorage.getItem('token')
                const updatedTask = task.updatedTask
                console.log('dentro',updatedTask)
                const result ={}

                if(updatedTask.title)
                    result.title= updatedTask.title
                if(updatedTask.description)
                    result.description= updatedTask.description
                if(updatedTask.hoursAllocated)
                    result.hoursAllocated= updatedTask.hoursAllocated
                if(updatedTask.taskStartDate)
                    result.taskStartDate= updatedTask.taskStartDate
                if(updatedTask.taskEndDate)
                    result.taskEndDate= updatedTask.taskEndDate

                const requestOptions = {
                    method: "PUT",
                    headers : {
                        "Content-type": "application/json",
                        "auth-token": localToken
                    },
                    body: JSON.stringify(
                        result
                    )
                }
                const res = await fetch("http://localhost:3000/tasks/update/"+task.id, requestOptions)
                const data = res.json()
                data.then(res=>{
                    if(!res.error)
                        commit('setTask', res)
                })
            } catch (error) {
                console.log(error)
            }
        },
        async updateTaskHours ({commit}, task) {
            try {
                const localToken = localStorage.getItem('token')
                const requestOptions = {
                    method: "PUT",
                    headers : {
                        "Content-type": "application/json",
                        "auth-token": localToken
                    },
                    body: JSON.stringify({
                        hoursLogged: task.hoursLogged,
                        hoursRemainig: task.hoursRemaining
                    })
                }
                const res = await fetch("http://localhost:3000/tasks/update/"+task.id, requestOptions)
                const data = res.json()
                data.then(res=>{
                    if(!res.error)
                        commit('setTask', res)
                })
            } catch (error) {
                console.log(error)
            }
        },
        async updateTaskAsignee({commit}, params) {
            try {
                const localToken = localStorage.getItem('token')
                console.log(params)
                console.log(params.id)
                const requestOptions ={
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "auth-token": localToken
                    },
                    body: JSON.stringify({
                        taskAsignee: params.taskAsignee
                    })
                }
                const res = await fetch("http://localhost:3000/tasks/update/"+params.id, requestOptions)
                const data = await res.json()
                console.log(data)
                if(!data.error)
                    commit('setTask', data)


            } catch (error) {
                console.log(error)
            }
        },
        async updateTaskStatus({commit}, params) {
            try {
                const localToken = localStorage.getItem('token')
                const requestOptions ={
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "auth-token": localToken
                    },
                    body: JSON.stringify({
                        taskKanbanStatus: params.status
                    })
                }
                const res = await fetch("http://localhost:3000/tasks/update/"+params.id, requestOptions)
                const data = await res.json()
                console.log(data)
                if(!data.error)
                    commit('setTask', data)


            } catch (error) {
                console.log(error)
            }
        },
        async newTask ({commit}, task){
            try {
                const localToken = localStorage.getItem('token')
                console.log('task',task)
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localToken
                    },
                    body: JSON.stringify({
                        title:task.title,
                        description:task.description,
                        hoursAllocated:task.hoursAllocated,
                        hoursUsed:task.hoursUsed,
                        taskKanbanStatus:task.taskKanbanStatus,
                        // is_closed:task.is_closed,
                        taskReporter:task.taskReporter,
                        taskAsignee:task.taskAsignee,
                    })

                }
                const res = await fetch('http://localhost:3000/tasks/new',requestOptions)
                const taskDB = await res.json()
                console.log(taskDB)
                if(!taskDB.error){}
                    commit('setTask', taskDB)

            } catch (error) {
                console.log(error)
            }
        },
        async deleteTask({commit}, taskId) {
            try {
                const localToken = localStorage.getItem('token')
                const requestOptions = {
                    method: "DELETE",
                    headers : {
                        "Content-type": "application/json",
                        "auth-token": localToken
                    },
                }
            const res = await fetch('http://localhost:3000/tasks/delete/'+taskId, requestOptions)
            const data = res.json()
            console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    modules: {

    }
  })