<template>
<div class="center d-flex flex-column">
  <h1 class="logo">Jrello</h1>
  <div class="form-box">
    <form @submit.prevent="processLogin" class="d-flex flex-column justify-content-center" >
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        class="form-control"
        placeholder="Email"
        v-model.trim="user.email"
      />
      <!-- Password -->
      <label for="email">Password</label>
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model.trim="user.password"
      />

      <!-- Sign in button -->
        <button class="btn btn-warning btn-block my-2" type="submit">
          Sign in
        </button>
        <div class="login-footer">
        <span> Dont have an account?  Click</span>
        <span class="login-link">
          <router-link to="/register">   here  </router-link>
        </span>
      </div>
    </form>
  </div>

</div>

</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
export default {
    setup(){
        const user = ref({email: 'HappyMan@gmail.com', password: '1234567'})
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

<style scoped>
.logo{
  font-size: 4rem;
  color: white
}
label {
  font-size: 1.2rem;
  color: white;
  margin: 2px 0px

}
.center {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form-box{
  height: 220px;
  width: 350px;
}
.login-footer{
  color:white;
  margin: 5px 0px;
}
.login-link{
  font-weight: 800;
}
</style>