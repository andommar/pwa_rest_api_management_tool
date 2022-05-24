<template>
    <div class="rounded project-card p-4 m-2">
        <div class="d-flex flex-column outerdiv">
        <div>
                <router-link :to="{name: 'project', params: {id: project._id}}">
                    {{ project.name }}
                </router-link>
            </div>
            <div>
                {{ snippet }}
            </div>
            <div v-if="projectLeader" class="bottom-avatar d-flex align-items-center">
                <img class="member-avatar" :src="projectLeader.avatar" alt="">
                <span class="memeber-name px-2">{{projectLeader.name}} {{projectLeader.surname}}</span>
            </div>
        </div>

    </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import {useStore} from 'vuex'
export default {
    props: ['project'],
    setup(props){
        const store = useStore()
        const projectLeaderId = props.project.projectLeader

        const snippet = computed(()=>{
        if(props.project.description == '' )
            return 'No description'
        else
            return props.project.description.substring(0,100) + '...'
        })

        const projectLeader = computed(()=>{
            return store.getters.getMember
        })
        console.log(projectLeader.value)

        onMounted(async ()=>{
            await store.dispatch('fetchMember', projectLeaderId)
        })
        return {snippet,projectLeader}
    }

}
</script>

<style scoped>
.project-card{
    border-left: 6px rgb(240,181,45) solid;
    box-shadow: 5px 5px 3px grey;
    background-color: white;
    height: 180px;
    width: 280px;
}
a{
    color: black !important;
    font-weight: bold;
    font-size: 1.1rem;
}
.member-avatar{
    height: 32px;
    width: auto;
    background-color: rgb(253,104,20);
    border-radius: 50%;
    margin: 0px 2px
}
.outerdiv{
    height: 100%
}
.bottom-avatar{
    margin-top:auto
}
.memeber-name{
    font-weight: bold;
}

</style>