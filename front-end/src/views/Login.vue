<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="processLogin"
        >
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model.trim="user.email"
          />
          <!-- Password -->
          <input
            type="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model.trim="user.password"
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
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
export default {
    setup(){
        const user = ref({email: 'projectMan@gmail.com', password: '1234567'})
        const store = useStore()

        const processLogin = () => {
            store.dispatch('loginUser', user.value)
        }

        // const state = computed(()=> {return store.getters.getUser})
        // console.log(state)

        return {user, processLogin}
    }

}
</script>

<style>

</style>