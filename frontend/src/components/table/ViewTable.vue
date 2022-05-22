<template>
<table class="table table-responsive-xl bg-white rounded shadow-card">
    <thead>
        <tr>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th >Name</th>
            <th >Surname</th>
            <th >Email</th>
            <th >Role</th>
            <th >Joined</th>
            <th>&nbsp;</th>

        </tr>
    </thead>
    <tbody>
        <tr v-for="user in users" :key="user._id">
            <td>
                <label class="checkbox-wrap checkbox-primary">
                    <input type="checkbox" :value="user._id">
                    <span class="checkmark"></span>
                </label>
            </td>
            <TableTdImg class="user-icon" :image="`https://anonymous-animals.azurewebsites.net/avatar/`+user.name"/>
            <TableTdText :params="user.name"/>
            <TableTdText :params="user.surname"/>
            <TableTdText :params="user.email"/>
            <TableTdText :params="user.role"/>
 
            <td class="status"><span class="active">24/June/2011</span></td>
            <td>
                <div class="d-flex action-btns">
                    <btnTableIcon class="btn btn-info text-white btn-sm" text='View' icon='person' @action="$router.push('/user/'+user._id)"/>
                    <btnTableIcon class="btn btn-danger btn-sm" text='Delete' icon='trash' @action="deleteMember(user._id)"/>
                </div>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
import { computed,onMounted } from '@vue/runtime-core'
import {ref} from 'vue'
import {useStore} from 'vuex'
import TableTdText from './TableTdText.vue'
import TableTdImg from './TableTdImg.vue'
import btnTableIcon from '../input/btnIcon.vue'

export default {
    components:{
        TableTdText,
        TableTdImg,
        btnTableIcon
    },
    async setup(){
        const store = useStore()

        const users = computed(()=>{
            return store.getters.getMembers
        })

        onMounted(async ()=>{
            await store.dispatch('fetchMembers')
        })

        const deleteMember = async (memberId) =>{
            await store.dispatch('deleteMember', memberId)
            await store.dispatch('fetchMembers')
        }

        return {users, deleteMember}
    }
    

}
</script>

<style scoped>
.action-btns button{
    margin: 0rem 0.2rem
}
table{
    border-left: 6px rgb(240,181,45) solid;
}
.checkmark{
    height: 1.2rem;
    width: 20px;
}
th{
    font-size: 1.2rem;

}
td {
    border-bottom: 2px rgb(226,232,240) solid;
    vertical-align: middle;
    font-size: 1.1rem;
}




</style>