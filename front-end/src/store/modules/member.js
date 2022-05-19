
export default ({
    state: {
        member: [],
        members: []
    },
    getters: {
        getMember(state){
            return state.member
        },
        getMembers(state){
            return state.members
        }
    },
    mutations: {
        setMember(state, payload) {
            state.member = payload
        },
        setMembers(state, payload) {
            state.members = payload
        }
    },
    actions: {
        async fetchMember ({commit}, memberId){
            try {
                const res = await fetch("http://localhost:3000/users/get/"+memberId)
                const data = await res.json()
                commit('setMember', data)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        },
        async fetchMembers ({commit}){
            try {
                const res = await fetch("http://localhost:3000/users")
                const data = await res.json()
                commit('setMembers', data)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        },
        async deleteMember ({commit}, memberId) {
            try {
                const localToken = localStorage.getItem('token')
                const requestOptions = {
                    method: "DELETE",
                    headers : {
                        "Content-type": "application/json",
                        "auth-token": localToken
                    }
                }
                const res = await fetch("http://localhost:3000/users/delete/"+memberId, requestOptions)
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