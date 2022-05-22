<template>
<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar-bg sidebar collapse ">
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
        <li class="nav-item">
            <router-link to="/">
                <i class="bi bi-house-door-fill"></i>
                <span class="mx-1" data-feather="home">Dashboard</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/projects">
                <i class="bi bi-clipboard2-data-fill"></i>
                <span class="mx-1" data-feather="file">Projects</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/tasks">
                <i class="bi bi-list-task"></i>
                <span class="mx-1" data-feather="task">Tasks</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/users">
                <i class="bi bi-people"></i>
                <span class="mx-1" data-feather="users">Users</span>
            </router-link>
        </li>
        </ul>

    </div>
</nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.sidebar-bg{
    background-color: rgb(25,146,212);
}
nav a {
    font-size: 1.2rem;
}
.nav-item{
    margin: 0.7rem 0.8rem
}
</style>