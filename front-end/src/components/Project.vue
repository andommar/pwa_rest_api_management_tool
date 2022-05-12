<template>
    <div class="row">
            <div class="col-md-7 m-1">
                <div class="row">
                    <router-link :to="{name: 'project', params: {id: project._id}}">
                        <div class="rounded border p-4 m-2">
                            <div>
                            {{ project.name }}
                            </div>
                            <div>
                            {{ project.description }}
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        <div class="col-md-3 p-2 m-1">
            <div>
                {{ project.description }}
            </div>
            <div>
                Owner
            </div>
            <div>
                Filter options
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['project']

}
</script>

<style>

</style>