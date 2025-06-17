<template>
  <el-card>
    <h2>数据表格</h2>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="role" label="角色" width="120" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tableData = ref([
  { id: 1, name: '张三', role: '管理员' },
  { id: 2, name: '李四', role: '用户' }
])
</script>