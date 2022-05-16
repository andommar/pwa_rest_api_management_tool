<template>
<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar-bg sidebar collapse ">
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
                <i class="bi bi-house-door-fill"></i>
                <span class="mx-1" data-feather="home">Dashboard</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="bi bi-clipboard2-data-fill"></i>
                <span class="mx-1" data-feather="file">Projects</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="bi bi-list-task"></i>
                <span class="mx-1" data-feather="task">Tasks</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="bi bi-people"></i>
                <span class="mx-1" data-feather="users">Users</span>
            </a>
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
</style>