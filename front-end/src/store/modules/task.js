
export default ({
    state: {
        task: [],
    },
    getters: {
        getTask(state){
            return state.task
        }
    },
    mutations: {
        setTask(state, payload) {
            state.task = payload
        }
    },
    actions: {
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
        async newTask ({commit}, task){
            try {
                const localToken = localStorage.getItem('token')
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
        }
    },
    modules: {

    }
  })