import { createMemoryHistory, createRouter } from 'vue-router'

import SignInView from '../views/SignInView.vue'
import DashboardView from '../views/DashboardView.vue'
import ExpensesView from '../views/ExpensesView.vue'

const routes = [
  { path: '/signin', name: 'signin', component: SignInView },
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/expenses', name: 'expenses', component: ExpensesView, props: route => ({ date: route.query.date }) },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
