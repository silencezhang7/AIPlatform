<template>
  <el-container style="height: 100vh;">
    <!-- Sidebar -->
    <el-aside width="240px" class="aside">
      <!-- Logo & Title -->
      <div class="logo-bar">
        <img src="https://iapps.axa.cn/aiplatform/assets/images/logo.jpg" alt="logo" class="logo-img" />
        <span class="logo-title">安盛 AI运维中台</span>
      </div>
      <!-- Menu -->
      <el-menu
          :default-active="activeMenu"
          class="aside-menu"
          background-color="#fff"
          text-color="#23272E"
          active-text-color="#4A72FF"
          router
          :unique-opened="true"
      >
        <el-menu-item index="/dashboard">
          <el-icon><House /></el-icon>
          <span class="menu-text">首页看板</span>
        </el-menu-item>

        <div class="menu-label">样本中心</div>
        <el-sub-menu index="sample-center">
          <template #title>
            <el-icon><Box /></el-icon>
            <span class="menu-text">样本中心</span>
          </template>
          <el-menu-item index="/sample">样本管理</el-menu-item>
        </el-sub-menu>

        <div class="menu-label">算法中心</div>
        <el-sub-menu index="algo-center">
          <template #title>
            <el-icon><Cpu /></el-icon>
            <span class="menu-text">算法中心</span>
          </template>
          <el-menu-item index="/algorithm">算法管理</el-menu-item>
        </el-sub-menu>

        <div class="menu-label">AI模型运维</div>
        <el-sub-menu index="model-center">
          <template #title>
            <el-icon><Coin /></el-icon>
            <span class="menu-text">模型中心</span>
          </template>
          <el-menu-item index="/model-deploy">模型部署</el-menu-item>
          <el-menu-item index="/model-manage">模型管理</el-menu-item>
          <el-menu-item index="/model-finetune">模型微调</el-menu-item>
        </el-sub-menu>

        <div class="menu-label">AGENT管理</div>
        <el-sub-menu index="agent-center">
          <template #title>
            <el-icon><User /></el-icon>
            <span class="menu-text">Agent管理</span>
          </template>
          <el-menu-item index="/agent">Agent列表</el-menu-item>
        </el-sub-menu>

        <div class="menu-label">FASTGPT权限控制</div>
        <el-menu-item index="/fastgpt">
          <el-icon><Lock /></el-icon>
          <span class="menu-text">FastGPT</span>
        </el-menu-item>

        <div class="menu-label">资源监测</div>
        <el-menu-item index="/resource-monitor">
          <el-icon><Monitor /></el-icon>
          <span class="menu-text">资源监测</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- Main Content -->
    <el-container>
      <el-header class="main-header">
        <span class="main-header-title">AI运维中台</span>
      </el-header>
      <el-main style="background:#f6f7fb;">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
// 使用 Element Plus 官方图标
import {
  House, Box, Cpu, Coin, User, Lock, Monitor
} from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Noto+Sans+SC:wght@400;600&display=swap');

.aside {
  background: #fff;
  border-right: 1px solid #f0f0f0;
  min-height: 100vh;
  padding-top: 0;
  font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
}

.logo-bar {
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.logo-title {
  font-weight: bold;
  font-size: 20px;
  color: #23272E;
  font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
  letter-spacing: 1px;
}

.menu-label {
  font-size: 12px;
  color: #B0B6C3;
  font-weight: 600;
  margin: 14px 0 2px 32px;
  letter-spacing: 1px;
  font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
}

.el-menu.aside-menu {
  border-right: none;
  font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
}

.menu-text {
  font-size: 15px;
  font-weight: 500;
  font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
}

.el-menu-item, .el-sub-menu__title {
  height: 48px !important;
  line-height: 48px;
  font-size: 15px !important;
  font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
}

.el-menu-item .el-icon, .el-sub-menu__title .el-icon {
  margin-right: 12px;
  font-size: 20px;
}

.el-menu-item.is-active, .el-sub-menu__title.is-active {
  background: #F6F8FF !important;
  border-radius: 8px 0 0 8px;
  color: #4A72FF !important;
}

.el-menu-item:hover, .el-sub-menu__title:hover {
  background: #F6F8FF !important;
  color: #4A72FF !important;
}

.main-header {
  background: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.main-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  color: #23272E;
  font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
}
</style>