<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <span style="font-size:18px;font-weight:bold;">模型微调</span>
      <el-button type="primary" @click="handleFinetune">发起微调</el-button>
    </div>
    <el-table :data="finetuneData" border style="width:100%;">
      <el-table-column prop="taskId" label="任务ID" width="100" />
      <el-table-column prop="modelName" label="模型名称" />
      <el-table-column prop="dataset" label="数据集" />
      <el-table-column prop="progress" label="进度" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleView(scope.row)">详情</el-button>
          <el-button size="small" type="danger" @click="handleStop(scope.row)">停止</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const finetuneData = ref([
  { taskId: 201, modelName: 'LLM-Base', dataset: '语料A', progress: '80%', status: '进行中' },
  { taskId: 202, modelName: 'Vision-Model', dataset: '图像B', progress: '100%', status: '已完成' }
])
function handleFinetune() { /* 发起微调 */ }
function handleView(row: any) { /* 查看详情 */ }
function handleStop(row: any) { /* 停止微调 */ }
</script>