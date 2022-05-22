<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="processForm"
        >
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Name"
            v-model.trim="name"
          />
          <input
            type="text"
            id="surname"
            class="form-control mb-5"
            placeholder="Surname"
            v-model.trim="surname"
          />
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model.trim="email"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model.trim="password"
          />
          <p>
            Dont have an account?<router-link to="/register"
              >click here</router-link
            >
          </p>
          <!-- Sign in button -->
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
export default {
    setup(){
        const name = ref('')
        const surname = ref('')
        const email = ref('')
        const password = ref('')
        const store = useStore()

        const processForm = () => {
            const user = {name: name.value, surname: surname.value, email: email.value, password: password.value}
            console.log(user)
            store.dispatch('registerUser', user)
        }

        return {name, surname,email, password,processForm}
    }

}
</script>

<style>

</style>