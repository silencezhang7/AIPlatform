<template>
  <el-card>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <span style="font-size:18px;font-weight:bold;">模型管理</span>
      <el-button type="primary" @click="handleAdd">新增模型</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;">
      <el-table-column prop="id" label="模型ID" width="100" />
      <el-table-column prop="name" label="模型名称" />
      <el-table-column prop="type" label="模型类型" />
      <el-table-column prop="version" label="版本" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tableData = ref([
  { id: 1, name: 'LLM-Base', type: '大语言模型', version: 'v1.0', status: '可用' },
  { id: 2, name: 'Vision-Model', type: '视觉模型', version: 'v2.1', status: '训练中' }
])
function handleAdd() { /* 弹窗新增 */ }
function handleEdit(row: any) { /* 编辑操作 */ }
function handleDelete(row: any) { /* 删除操作 */ }
</script>