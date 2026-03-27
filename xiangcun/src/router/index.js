import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndustryLayout from '../views/industry/IndustryLayout.vue'
import IndustryOverview from '../views/industry/IndustryOverview.vue'
import IndustryChain from '../views/industry/IndustryChain.vue'
import IndustryHeritage from '../views/industry/IndustryHeritage.vue'
import EcologyLayout from '../views/ecology/EcologyLayout.vue'
import EcologyRealtime from '../views/ecology/EcologyRealtime.vue'
import EcologyProtection from '../views/ecology/EcologyProtection.vue'
import EcologyGovernance from '../views/ecology/EcologyGovernance.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/industry',
    component: IndustryLayout,
    redirect: '/industry/overview',
    children: [
      { path: 'overview', name: 'industry-overview', component: IndustryOverview },
      { path: 'chain', name: 'industry-chain', component: IndustryChain },
      { path: 'heritage', name: 'industry-heritage', component: IndustryHeritage },
    ],
  },
  {
    path: '/ecology',
    component: EcologyLayout,
    redirect: '/ecology/realtime',
    children: [
      { path: 'realtime', name: 'ecology-realtime', component: EcologyRealtime },
      { path: 'protection', name: 'ecology-protection', component: EcologyProtection },
      { path: 'governance', name: 'ecology-governance', component: EcologyGovernance },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
