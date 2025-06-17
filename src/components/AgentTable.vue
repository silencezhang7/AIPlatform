<template>
  <el-card>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%"
      border
    >
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
      />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Agent {
  [key: string]: any
  id: number | string
  name: string
  // 根据实际返回字段补充
}

// 表头定义
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '名称', width: 120 },
  // 可根据实际接口返回字段增删
]

const tableData = ref<Agent[]>([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await axios.get('/aiplatformback/agent/list')
    // 假设数据在 res.data.data
    tableData.value = res.data.data || []
  } catch (e) {
    tableData.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>