<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <form @submit.prevent="processForm">
        <modal :show="showModal" @close="showModal = false" :namePaco="name">
        <template #header>
            <h3>custom header</h3>
        </template>
        </modal>
    </form>
  </Teleport>
</template>

<script>
import { ref } from 'vue';
import Modal from '../components/FormPopUp.vue';

export default {
    components: {
        Modal
    },
    setup() {
        const showModal = ref(false)
        const name = ref('')
        name.value = 'Paco'

        const processForm  = () =>{
            console.log('prop', name)
        }
        return {
        showModal, processForm,name
        }
    }
}
</script>

<style >


</style>