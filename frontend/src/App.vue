<template>
  <div class="container-fluid">
    <router-view/>
  </div>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
</template>

<style>
#app {
  font-family: 'Roboto', sans-serif;
}
h1,h2,h3,h4,h5,h6{
  font-family: 'Archivo', sans-serif;
  color:black
}
main {
  background-color: rgb(226,232,240);
}
.shadow-card{
    box-shadow: 5px 5px 3px grey;
}
.shadow-bottom{
    box-shadow: 1px 2px 2px grey;
}
.border-left-yellow{
    border-left: 6px rgb(240,181,45) solid;
}
.background-yellow{
  background-color:rgb(240,181,45)
}

.sidebar{
  min-height: calc(100vh - 50px);
}
header {
  min-height: 50px;
}

a { 
  text-decoration: none !important;
  color: white !important;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
