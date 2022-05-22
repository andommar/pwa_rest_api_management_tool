import { createStore } from 'vuex'
import user from './modules/user'
import project from './modules/project'
import task from './modules/task'
import member from './modules/member'

export default createStore({
  modules: {
    user,
    project,
    task,
    member
  }
})
