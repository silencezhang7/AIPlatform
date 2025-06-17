<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <span style="font-size:18px;font-weight:bold;">模型部署</span>
      <el-button type="primary" @click="handleDeploy">部署新模型</el-button>
    </div>
    <el-table :data="deployData" border style="width:100%;">
      <el-table-column prop="deployId" label="部署ID" width="100" />
      <el-table-column prop="modelName" label="模型名称" />
      <el-table-column prop="env" label="部署环境" />
      <el-table-column prop="status" label="部署状态" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleView(scope.row)">查看</el-button>
          <el-button size="small" type="danger" @click="handleUndeploy(scope.row)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const deployData = ref([
  { deployId: 101, modelName: 'LLM-Base', env: '生产', status: '已部署' },
  { deployId: 102, modelName: 'Vision-Model', env: '测试', status: '部署中' }
])
function handleDeploy() { /* 部署新模型操作 */ }
function handleView(row: any) { /* 查看部署详情 */ }
function handleUndeploy(row: any) { /* 下线操作 */ }
</script>