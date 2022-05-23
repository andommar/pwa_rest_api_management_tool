
export default ({
    state: {
        member: [],
        members: [],
        filteredMembers: []
    },
    getters: {
        getMember(state){
            return state.member
        },
        getMembers(state){
            return state.members
        },
        getFilteredMembers(state){
            return state.filteredMembers
        }
    },
    mutations: {
        setMember(state, payload) {
            state.member = payload
        },
        setMembers(state, payload) {
            state.members = payload
        },
        setFilteredMembers(state, payload){
            state.filteredMembers = payload
        }
    },
    actions: {
        filterMember ({commit, state}, text){
            console.log(text)
            const textClient = text.toLowerCase()
            const filter = state.members.filter(member =>{
                const textServerName = member.name.toLowerCase()
                const textServerSurname = member.surname.toLowerCase()
                const textFullName = textServerName+' '+textServerSurname
                if(textFullName.includes(textClient)){
                    return member
                }
            })
            commit ('setFilteredMembers', filter)
        },
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
                commit('setFilteredMembers', data)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        },
        async updateMember ({commit}, member){
            try {
                const localToken = localStorage.getItem('token')
                const requestOptions ={
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "auth-token": localToken
                    },
                    body: JSON.stringify({
                        name: member.name,
                        surname: member.surname,
                        email: member.email
                    })
                }
                const res = await fetch("http://localhost:3000/users/update/"+member.id, requestOptions)
                const data = await res.json()
                console.log(data)
                if(!data.error)
                    commit('setMember', data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateProjectMember({commit}, params) {
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
                        projectsAssigned: params.projectsAssigned
                    })
                }
                const res = await fetch("http://localhost:3000/users/update/"+params.id, requestOptions)
                const data = await res.json()
                console.log(data)

            } catch (error) {
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