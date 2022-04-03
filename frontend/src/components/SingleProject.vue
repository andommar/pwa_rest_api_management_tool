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

    <div class="flex my-3 rounded-2xl shadow-md">
        <div class="flex">
            <div class="flex flex-col p-2 m-4 mx-10">
                <h3>{{project.name}}</h3>
                <p>{{ project.template }}</p>
            </div>
            <div class="flex p-2 m-4 mx-10">
                <h2>User</h2>
            </div>
            <div class="p-2 m-4 mx-10">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Overdue</button>
            </div>
        </div>
    </div>
        <!-- Name:<h4>{{ project.name }}</h4>
        <p>Template project:{{ project.template }}</p> -->
</template>

<script>
export default {
props: ['project']
}
</script>

<style>

</style>