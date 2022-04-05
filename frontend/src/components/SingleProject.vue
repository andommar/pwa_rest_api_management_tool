<template>
    <!-- <div class="p-8 sm:p-14 bg-[#2E2E41] rounded-2xl shadow-2xl my-8">
        <div class="flex justify-between items-center">
            <h3 class="text-[#D0CAE5] text-[22px] font-bold">
                {{project.name}}
            </h3>
            <a href="#" class="text-[#F09666] font-bold hover:underline">
               {{ project.template }}
            </a>
        </div>
        <p class="mt-5 text-[#D0CAE5] max-w-lg">
        Group your projects into separate folders. When you are uploading use the “Add to folder” checkbox.
        </p>
        <button type="button" class="font-bold text-lg mt-2 bg-[#F09666] rounded text-white py-4 px-7 border border-transparent hover:bg-transparent hover:border-[#F09666] hover:text-[#F09666] focus:outline-none focus:ring-2 focus:ring-[#F09666]">
        View projects
        </button>
    </div>  -->

        <div class="row">
                <div class="col-md-7 m-1">
                    <div class="row">
                        <router-link :to="{name: 'project single', params: {id: project._id}}">
                            <div class="rounded border p-4 m-2">
                                <div>
                                {{ project.name }}
                                </div>
                                <div>
                                {{ project.template }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            <div class="col-md-3 p-2 m-1">
                <div>
                    {{ project.template }}
                </div>
                <div>
                    Owner
                </div>
                <div>
                    Filter options
                </div>
            </div>
        </div>

    <!-- component -->
</template>

<script>
export default {
props: ['project']
}
</script>

<style>

</style>