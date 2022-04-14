import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/project/:id',
    name: 'project single',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectView.vue'),
  },
  {
    path: '/project/:projectid/task/:taskid',
    name: 'project task',
    component: () => import(/* webpackChunkName: "about" */ '../views/TaskView.vue'),
  },
  {
    path: '/newproject',
    name: 'new project',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewProjectView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
