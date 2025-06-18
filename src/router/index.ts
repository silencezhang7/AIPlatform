import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ModelManage from '../views/ModelManage.vue'
import ModelDeploy from '../views/ModelDeploy.vue'
import ModelFinetune from '../views/ModelFinetune.vue'
import Dashboard from '../views/Dashboard.vue'
import AnXiaoSheng from '../views/AnXiaoSheng.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/model-manage', name: 'ModelManage', component: ModelManage },
  { path: '/model-deploy', name: 'ModelDeploy', component: ModelDeploy },
  { path: '/model-finetune', name: 'ModelFinetune', component: ModelFinetune },
  {
    path: '/anxiaosheng',
    name: 'AnXiaoSheng',
    component: AnXiaoSheng,
    meta: { title: '安小盛', fullPage: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router