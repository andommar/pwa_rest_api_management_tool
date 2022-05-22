<template>
<div class="flex-fill">
    <div class="task-card shadow-bottom rounded p-2 m-2 bg-white flex-fill">
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
    </div>
</div>
</template>

<script>
import  { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'

export default {
    props:['task'],
    setup (props){
        const route = useRoute()
        const projectId = route.params.id

        const snippet = computed(()=>{
            if(props.task.description == '' )
                return 'No description'
            else
                return props.task.description.substring(0,100) + '...'
        })
        console.log('projectId', projectId)

        return {projectId, snippet}
    }

}
</script>

<style scoped>

</style>