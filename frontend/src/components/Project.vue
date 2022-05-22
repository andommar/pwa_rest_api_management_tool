<template>
    <div class="rounded project-card p-4 m-2">
        <div>
            <router-link :to="{name: 'project', params: {id: project._id}}">
                {{ project.name }}
            </router-link>
        </div>
        <div>
            {{ project.description }}
        </div>
    </div>
        <!-- <div class="col-md-3 p-2 m-1">
            <div>
                {{ project.description }}
            </div>
            <div>
                Owner
            </div>
            <div>
                Filter options
            </div>
        </div> -->
</template>

<script>
export default {
    props: ['project']

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

</style>