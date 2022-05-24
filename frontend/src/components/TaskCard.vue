<template>
<div class="flex-fill">
    <div class="task-card shadow-bottom rounded p-2 m-2 bg-white flex-fill">
        <div class="d-flex flex-column outerdiv">
            <div class="col-md-12">
                <router-link :to="{name: 'task', params: {id: task._id, project: projectId}}">
                    <h5>{{ task.title }}</h5>
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-12">
                <p>{{ snippet }}</p>
                </div>
            </div>
            <div v-if="taskReporter" class="bottom-avatar d-flex align-items-center">
                <img class="member-avatar" :src="taskReporter.avatar" alt="">
                <span class="memeber-name px-2">{{taskReporter.name}} {{taskReporter.surname}}</span>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import  { useRoute } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import {useStore} from 'vuex'


export default {
    props:['task'],
    setup (props){
        const route = useRoute()
        const store = useStore()
        const projectId = route.params.id

        const snippet = computed(()=>{
            if(props.task.description == '' )
                return 'No description'
            else
                return props.task.description.substring(0,100) + '...'
        })

        const taskReporter = computed(()=>{
            return store.getters.getMember
        })

        onMounted(async()=>{
            await store.dispatch('fetchMember', props.task.taskReporter)
        })

        return {projectId, snippet, taskReporter}
    }

}
</script>

<style scoped>
.outerdiv{
    height: 100%
}
.bottom-avatar{
    margin-top:auto
}
.memeber-name{
    font-weight: bold;
}
.member-avatar{
    height: 32px;
    width: auto;
    background-color: rgb(253,104,20);
    border-radius: 50%;
    margin: 0px 2px
}

</style>