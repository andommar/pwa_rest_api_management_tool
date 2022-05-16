<template>
<div class="flex-fill">
    <div class="task-card shadow-bottom rounded p-2 m-2 bg-white flex-fill">
        <div class="col-md-12">
            <router-link :to="{name: 'task', params: {id: task._id}}">
                <h5>{{ task.title }}</h5>
            </router-link>
        </div>
        <div class="row">
            <div class="col-md-12">
            <p>{{ task.description }}</p>
            </div>
        </div>
    </div>
</div>

        <!-- <div class="d-flex justify-content-end">
            <div class="task-icon px-2">
                <a>
                    <fa icon="user" size="lg" />
                </a>
            </div>
            <div class="task-icon px-2">
                <a>
                    <fa icon="pen-to-square" size="lg" />
                </a>
            </div>
            <div class="task-icon px-2">
                <a>
                    <fa icon="trash" size="lg" />
                </a>
            </div>
        </div> -->
</template>

<script>
export default {
    props:['task']

}
</script>

<style scoped>

</style>