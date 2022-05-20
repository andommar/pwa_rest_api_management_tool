import store from '../store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {protectedRoute: true}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectView.vue')
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import(/* webpackChunkName: "about" */ '../views/TaskView.vue')
  },
  {
    path: '/newproject',
    name: 'newproject',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewProject.vue')
  },
  {
    path: '/newtask',
    name: 'newtask',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewTask.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersView.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/TasksView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  // console.log(to.meta.protectedRoute)
  if(to.meta.protectedRoute){
    console.log('Entra')
    if(store.getters.userAuthenticated){
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
