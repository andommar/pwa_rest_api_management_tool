<template>

<div class="center d-flex flex-column">
  <h1 class="logo">Jrello</h1>
        <div class="user-avatar">
        <img :src="userAvatar" alt="">
      </div>
      <div class="greetings-text">
        Hello there {{ user.username }}!
      </div>
  <div class="form-box">
    <form @submit.prevent="processForm" class="d-flex flex-column justify-content-center" >
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          class="form-control"
          placeholder="Name"
          v-model.trim="user.name"
        />
        <label for="email">Surname</label>
        <input
          type="text"
          id="surname"
          class="form-control"
          placeholder="Surname"
          v-model.trim="user.surname"
        />
        <label for="email">Username</label>
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Username"
          v-model.trim="user.username"
        />

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="Email"
          v-model.trim="user.email"
        />
        <label for="email">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Password"
          v-model.trim="user.password"
        />

      <!-- Sign in button -->
        <button class="btn btn-warning btn-block my-2" type="submit">
          Register
        </button>
        <div v-if=errors class="alert alert-danger" role="alert">{{errors}}</div>
    </form>
  </div>

</div>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
export default {
    setup(){
      const store = useStore()
      const user = ref([])

      const errors = computed(()=>{
        return store.getters.getRegisterError
      })

      const userAvatar = computed(()=>{
        user.value.avatar = 'https://anonymous-animals.azurewebsites.net/avatar/'+user.value.username
        return user.value.avatar
      })


      const processForm = () => {
          console.log(user.value)
          store.dispatch('registerUser', user.value)
      }

      return {user,processForm, userAvatar, errors}
    }

}
</script>

<style scoped>
label {
  font-size: 0.95rem;
  color: white;
  margin: 2px 0px

}
.greetings-text{
  font-size: 2.5rem;
  color: white;
}
.logo{
  font-size: 3.5rem;
  color: white
}
.center {
    height: 100vh;
    display: flex;
    align-items: center;
}
.form-box{
  height: 150px;
  width: 350px;
}
.login-footer{
  color:white;
  margin: 5px 0px;
}
</style>