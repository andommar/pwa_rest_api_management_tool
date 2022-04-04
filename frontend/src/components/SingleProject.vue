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



    <!-- component -->
	<div class="px-10 mt-10">
		<div class="bg-white rounded-md max-w-4xl mx-auto p-4 space-y-4 shadow-lg">
			<h3 class="mb-2 font-semibold">Title: <span class="font-thin">{{project.name}}</span></h3>
				<div class="pt-2">
					<h3 class="font-semibold">Description: </h3>
						<p class="font-thin mt-2">{{ project.template }}</p>
				</div>
				<h3 class="border-t mb-2 pt-3 font-semibold">Name <span class="font-thin">Joker Banny</span></h3>
					<h3 class="border-t mb-2 pt-3 font-semibold">Email </h3>
						<span class="font-thin">jokerbanny@gmail.com</span>
						<div class="flex justify-end space-x-2">
                            <router-link :to="{name: 'project single', params: {id: project._id}}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 cursor-pointer" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </router-link>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 cursor-pointer"
								fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 cursor-pointer"
								fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
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