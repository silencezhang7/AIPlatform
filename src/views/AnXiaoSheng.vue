<template>
  <div class="app-layout">
    <!-- 顶部栏 -->
    <header class="header">
      <img class="header-logo" src="../assets/image/AIShortcut/logo.png" alt="logo"/>
      <div class="header-right">
        <div class="header-user">
          <span class="header-user-name">你好,欢迎使用安小盛</span>
          <img class="header-user-icon" src="../assets/image/AIShortcut/avatar.png" alt="用户"/>
        </div>
      </div>
    </header>

    <div class="main-area">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <img src="../assets/image/AIShortcut/ai_logo.png" alt="logo" class="header-logo"/>
          <span class="header-title">AI智能助手-安小盛</span>
        </div>
        <div class="sidebar-newchat" @click="onCreateNewChat">
          <img src="../assets/image/AIShortcut/new_chat.png" alt="新建对话"/>
          新建对话
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-title sidebar-recent-toggle" @click="showRecent = !showRecent">
            <img class="sidebar-section-icon" src="../assets/image/AIShortcut/recent_used.png" alt="最近使用"/>
            最近使用
            <img class="arrow" :class="{ rotated: showRecent }" src="../assets/image/AIShortcut/arrow_down.png"
                 alt="arrow_down"/>
          </div>
          <div class="sidebar-recent-list" v-show="showRecent">
            <div
                class="sidebar-recent-item"
                v-for="name in recentUsed"
                :key="name"
                @click="onClickRecentUsed(name)"
            >
              <img class="recent-icon" :src="findFeature(name)?.icon" alt=""/>
              <span class="recent-title">{{ name }}</span>
            </div>
          </div>
          <div class="sidebar-section-title sidebar-recent-toggle">
            <img class="sidebar-section-icon" src="../assets/image/AIShortcut/AI_dashboard.png" alt="AI Dashboard"/>
            <a href="https://ureport.axa.cn/webroot/decision/link/R9tv" target="_blank">AI Dashboard</a>
          </div>
        </div>
        <div class="sidebar-section conversation-group">
          <div class="sidebar-section-title conversation-group-title">对话</div>
          <div class="conversation-group-content">
            <div class="sidebar-conversation-list">
              <template v-for="(group, groupName) in chatGroups" :key="groupName">
                <div v-if="group.length" class="chat-group-title">
                  {{
                    groupName === 'today' ? '今天' : groupName === 'yesterday' ? '昨天' : groupName.replace(/-/g, '年').replace(/-(\d{2})$/, '月$1日')
                  }}
                </div>
                <div
                    v-for="chat in group"
                    :key="chat.id"
                    :class="['sidebar-conversation-item', { active: chat.id === currentChatId }]"
                    @click="selectChat(chat.id)"
                >
                  <span class="conversation-title"
                        :class="{ 'pending-title': chat.title === '新对话进行中' }">{{ chat.title }}</span>
                  <span v-if="chat.title !== '新对话进行中'"
                        class="conversation-intro">{{ chat.intro || findAiIntro(chat) }}</span>
                </div>
              </template>
            </div>
            <div class="sidebar-more-btn" v-if="showMoreBtn" @click="toggleShowAllConversations">
              <span class="more-text">{{ showAllConversations ? '收起' : '查看更多' }}</span>
              <img class="more-icon" src="../assets/image/AIShortcut/arrow_down.png"
                   :style="{ transform: showAllConversations ? 'rotate(180deg)' : '' }"/>
            </div>
          </div>
          <div class="sidebar-empty" v-if="chatList.length === 0">
            <img class="empty-icon" src="../assets/image/AIShortcut/empty_chat.png" alt="暂无对话"/>
            <div class="empty-text">暂无对话</div>
          </div>
        </div>
      </aside>

      <section class="main-content" :class="{ 'show-more': showMoreFeature }">
        <div class="main-container">
          <div class="chat-list">
            <template v-for="(msg, idx) in currentMessages" :key="idx">
              <div v-if="msg.role === 'user'" class="chat-row user">
                <div class="chat-bubble user">{{ msg.content }}</div>
                <div v-if="msg.files && msg.files.length" class="chat-file-list">
                  <div class="chat-file-item" v-for="file in msg.files" :key="file.name">
                    <div class="chat-file-info">
                      <div class="chat-file-name" :title="file.name">
                        <img class="chat-file-icon" :src="fileIcon(file.name)"/>
                        <div class="chat-file-name-text">{{ file.name }}</div>
                      </div>
                      <div class="chat-file-meta">
                        <div class="chat-file-meta-text">{{ fileType(file.name) }}</div>
                        <div class="chat-file-meta-text">{{ fileSize(file.size) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="msg.role === 'ai'" class="chat-row ai">
                <img class="chat-avatar" src="../assets/image/AIShortcut/ai_avatar.png" alt="AI头像"/>
                <div style="flex:1">
                  <div class="chat-bubble ai" v-html="parseAIContent(msg.content)"></div>
                  <div class="chat-actions">
                    <div class="chat-action-btn" @click="copyAi(msg.content)">
                      <img class="chat-action-btn-icon" src="../assets/image/AIShortcut/copy.png" alt="复制"/>复制
                    </div>
                    <div class="chat-action-btn" @click="downloadAi(msg.content)">
                      <img class="chat-action-btn-icon" src="../assets/image/AIShortcut/download.png" alt="下载"/>下载
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="welcome-title" v-if="!currentMessages.length">
            Hi，我是您的<span class="welcome-title-highlight">AI智能助手-安小盛</span><br>
            是你工作中的好帮手，有任何需求都来找我呀！
          </div>
          <div class="feature-cards" v-if="!currentMessages.length">
            <div class="feature-card-list">
              <div
                  v-for="feature in featureList"
                  :key="feature.name"
                  class="feature-card"
                  :class="{ comingsoon: feature.label === 'coming soon' }"
                  @click="onFeatureCardClick(feature)"
              >
                <img class="feature-icon" :src="feature.icon" :alt="feature.name"/>
                <div class="feature-title">{{ feature.name }}</div>
                <div v-for="d in feature.desc" class="feature-desc">{{ d }}</div>
                <div v-if="feature.label" class="feature-label">{{ feature.label }}</div>
              </div>
            </div>
            <div class="more-feature" @click="showMoreFeature = !showMoreFeature">
              更多技能
              <img class="more-feature-icon" src="../assets/image/AIShortcut/arrow_more.png" alt="更多技能">
            </div>
          </div>
        </div>
        <!-- 底部输入区 -->
        <div class="input-container" :class="{ 'show-more': showMoreFeature }">
          <div class="input-feature-list">
            <div
                v-for="feature in featureList.slice(0, 4)"
                :key="feature.name"
                class="input-feature-item tools-item"
                :class="{ active: currentTool === feature.name, comingsoon: feature.label === 'coming soon' }"
                @click="selectTool(feature)"
            >
              <img class="input-feature-icon" :src="feature.icon" alt=""/>
              {{ feature.name }}
            </div>
          </div>
          <div class="input-bar">
            <div class="input-bar-content">
              <textarea
                  placeholder="需要我做什么？"
                  v-model="inputText"
                  @keydown.enter.prevent.exact="onSend"
                  @input="onInputChange"
              ></textarea>
              <div class="input-bar-actions">
                <div class="input-actions-btns">
                  <div class="btn-group">
                    <div class="custom-select" @click="toggleDeepThinkOptions">
                      <div id="deep-think-btn" class="custom-select-selected" :class="{ checked: deepThinkChecked }">
                        <img class="custom-select-icon"
                             :src="deepThinkChecked ? 'src/assets/image/AIShortcut/deepseek_checked.png' : 'src/assets/image/AIShortcut/deepseek.png'"
                             alt=""/>
                        <span class="custom-select-text">DeepSeek-R1</span>
                      </div>
                      <div class="custom-select-options" v-show="showDeepThinkOptions">
                        <div class="custom-select-option" @click="selectDeepThink('DeepSeek-R1')">DeepSeek-R1</div>
                        <div class="custom-select-option" @click="selectDeepThink('DeepSeek-R2')">DeepSeek-R2</div>
                        <div class="custom-select-option" @click="selectDeepThink('DeepSeek-R3')">DeepSeek-R3</div>
                      </div>
                    </div>
                    <div id="web-search-btn" class="online-search" :class="{ checked: webSearchChecked }"
                         @click="toggleWebSearch">
                      <img class="online-search-icon"
                           :src="webSearchChecked ? 'src/assets/image/AIShortcut/online_search_checked.png' : 'src/assets/image/AIShortcut/online_search.png'"
                           alt=""/>
                      自研联网搜索
                    </div>
                    <div id="ai-web-search-btn" class="online-search" :class="{ checked: aiWebSearchChecked }"
                         @click="toggleAiWebSearch">
                      <img class="online-search-icon ai-online-search-icon"
                           :src="aiWebSearchChecked ? 'src/assets/image/AIShortcut/online_search_checked.png' : 'src/assets/image/AIShortcut/online_search.png'"
                           alt=""/>
                      SaaS联网搜索
                    </div>
                  </div>
                  <div class="btn-send">
                    <input type="file" id="fileInput" multiple style="display:none;" @change="handleFileChange"/>
                    <img class="btn-upload-icon" src="../assets/image/AIShortcut/upload.png" alt="上传文件"
                         id="uploadBtn" @click="triggerFileUpload"/>
                    <img class="input-send-btn" :class="{ disabled: !inputText }"
                         src="../assets/image/AIShortcut/send_btn.png" alt="发送" @click="onSend"/>
                  </div>
                </div>
              </div>
              <div class="file-list" v-if="selectedFiles.length">
                <div class="file-item" v-for="(file, idx) in selectedFiles" :key="file.name + idx">
                  <div class="file-info">
                    <div class="file-name" :title="file.name">
                      <img class="file-icon" :src="fileIcon(file.name)" alt=""/>
                      <div class="file-name-text">{{ file.name }}</div>
                    </div>
                    <div class="file-meta">
                      <div class="file-meta-text">{{ fileType(file.name) }}</div>
                      <div class="file-meta-text">{{ fileSize(file.size) }}</div>
                    </div>
                  </div>
                  <div class="file-remove" @click="removeFile(idx)">
                    <img class="file-remove-icon" src="../assets/image/AIShortcut/file_remove.png" alt="删除"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue'

// ====== 数据定义 ======
const featureList = [
  {
    name: "翻译专家",
    icon: "src/assets/image/AIShortcut/translation_expert.png",
    intro: "我是翻译专家，可以为你提供中英文互译、润色和多语种翻译服务。",
    desc: ['中英文翻译'],
    label: '',
    link: ''
  },
  {
    name: "写作及润色",
    icon: "src/assets/image/AIShortcut/writing_polishing.png",
    intro: "我是写作及润色助手，帮你优化文案、提升表达、润色各类文本。",
    desc: ['优化文案', '提升文字表达'],
    label: '',
    link: ''
  },
  {
    name: "会议纪要",
    icon: "src/assets/image/AIShortcut/meeting_summary.png",
    intro: "我是会议纪要助手，可以帮你整理会议要点、生成会议纪要。",
    desc: ['会议录音及', '会议纪要生成'],
    label: '',
    link: ''
  },
  {
    name: "企业知识库",
    icon: "src/assets/image/AIShortcut/enterprise_knowledge_base.png",
    intro: "我是企业知识库助手，支持知识查询和问答。",
    desc: ['提供AXATP通用', '知识查询和问答'],
    label: 'coming soon',
    link: ''
  },
  // ... 其余同你的JS ...
]

const showRecent = ref(true)
const showMoreFeature = ref(false)
const showAllFeatureModal = ref(false)
const deepThinkChecked = ref(false)
const showDeepThinkOptions = ref(false)
const webSearchChecked = ref(false)
const aiWebSearchChecked = ref(false)
const currentTool = ref('')
const inputText = ref('')
const selectedFiles = ref<any[]>([])
const agentData = ref<any>({})
const tools = ref('[]')

const chatList = ref<any[]>([])
const currentChatId = ref<string | null>(null)
const recentUsed = ref<string[]>([])

function findFeature(n: string) {
  return featureList.find(f => f.name === n)
}

function saveChats() {
  localStorage.setItem('chatList', JSON.stringify(chatList.value))
  localStorage.setItem('currentChatId', currentChatId.value || '')
}

function loadChats() {
  const data = localStorage.getItem('chatList')
  if (data) chatList.value = JSON.parse(data)
  currentChatId.value = localStorage.getItem('currentChatId') || (chatList.value[0] && chatList.value[0].id) || null
}

function saveRecentUsed(name: string) {
  let recent = [...recentUsed.value]
  recent = recent.filter(item => item !== name)
  recent.unshift(name)
  if (recent.length > 5) recent = recent.slice(0, 5)
  recentUsed.value = recent
  localStorage.setItem('recentUsed', JSON.stringify(recent))
}

function loadRecentUsed() {
  const arr = JSON.parse(localStorage.getItem('recentUsed') || '[]')
  recentUsed.value = arr
}

onMounted(() => {
  loadChats()
  loadRecentUsed()
})

function onCreateNewChat() {
  currentChatId.value = null
  inputText.value = ''
  // 默认选中联网搜索
  webSearchChecked.value = true
  aiWebSearchChecked.value = false
  currentTool.value = ''
  onSend() // 新建空对话
}

function onClickRecentUsed(name: string) {
  handleFeatureClick(name)
}

function handleFeatureClick(name: string) {
  const feature = featureList.find(f => f.name === name)
  if (!feature) return
  const chat = {
    id: 'chat_' + Date.now(),
    title: name,
    pendingTitle: '',
    messages: [{role: 'ai', content: feature.intro, time: new Date().toISOString()}],
    tools: name
  }
  chatList.value.unshift(chat)
  currentChatId.value = chat.id
  saveChats()
  saveRecentUsed(name)
}

function selectChat(id: string) {
  currentChatId.value = id
  saveChats()
}

// ========== 聊天分组 ==========
function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

const chatGroups = computed(() => {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const groups: any = {today: [], yesterday: [], earlier: {}}
  chatList.value.forEach(chat => {
    let time = chat.messages[0]?.time || chat.time || chat.createdAt || chat.updatedAt
    if (!time) time = new Date().toISOString()
    let d = new Date(time)
    if (isSameDay(d, today)) {
      groups.today.push(chat)
    } else if (isSameDay(d, yesterday)) {
      groups.yesterday.push(chat)
    } else {
      let key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
      if (!groups.earlier[key]) groups.earlier[key] = []
      groups.earlier[key].push(chat)
    }
  })
  return groups
})

function findAiIntro(chat: any) {
  const aiMsg = chat.messages.find((m: any) => m.role === 'ai')
  return aiMsg ? aiMsg.content.slice(0, 20) : ''
}

const showMoreBtn = computed(() => {
  const total = chatGroups.value.today.length + chatGroups.value.yesterday.length + Object.values(chatGroups.value.earlier).reduce((a: number, b: any) => a + b.length, 0)
  return total > 5
})
const showAllConversations = ref(false)

function toggleShowAllConversations() {
  showAllConversations.value = !showAllConversations.value
}

const currentMessages = computed(() => {
  const chat = chatList.value.find((c) => c.id === currentChatId.value)
  return chat ? chat.messages : []
})

function onFeatureCardClick(feature: any) {
  if (feature.link) {
    window.open(feature.link, '_blank')
    return
  }
  handleFeatureClick(feature.name)
}

function selectTool(feature: any) {
  if (feature.label === 'coming soon') return
  currentTool.value = feature.name
  const chat = chatList.value.find(c => c.id === currentChatId.value)
  if (chat) {
    chat.tools = feature.name
    saveChats()
  }
}

function selectToolFromModal(feature: any) {
  if (feature.label === 'coming soon') return
  selectTool(feature)
  showAllFeatureModal.value = false
}

function fileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() || ''
  if (ext === 'doc' || ext === 'docx') return 'src/assets/image/AIShortcut/file_word.png'
  if (ext === 'xls' || ext === 'xlsx') return 'src/assets/image/AIShortcut/file_excel.png'
  if (ext === 'pdf') return 'src/assets/image/AIShortcut/file_pdf.png'
  return 'src/assets/image/AIShortcut/file_default.png'
}

function fileType(name: string) {
  return (name.split('.').pop() || '').toUpperCase()
}

function fileSize(size: number) {
  return (size / 1024).toFixed(2) + ' KB'
}

function triggerFileUpload() {
  document.getElementById('fileInput')?.click()
}

function handleFileChange(e: any) {
  const files = Array.from(e.target.files)
  files.forEach((file: any) => {
    if (file.size >= 100 * 1024 * 1024) {
      alert(`文件 "${file.name}" 超过100MB限制`)
      return
    }
    selectedFiles.value.push(file)
  })
}

function removeFile(idx: number) {
  selectedFiles.value.splice(idx, 1)
}

function onInputChange() {
  // 自动高度等
}

function onSend() {
  if (!inputText.value.trim()) return
  if (!currentChatId.value) {
    const chat = {
      id: 'chat_' + Date.now(),
      title: '新对话进行中',
      pendingTitle: '',
      messages: [],
      tools: '联网搜索'
    }
    chatList.value.unshift(chat)
    currentChatId.value = chat.id
  }
  const chat = chatList.value.find(c => c.id === currentChatId.value)
  if (!chat) return
  chat.messages.push({
    role: 'user',
    content: inputText.value,
    time: new Date().toISOString(),
    files: selectedFiles.value.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      url: f.url || ''
    }))
  })
  saveChats()
  inputText.value = ''
  selectedFiles.value = []
}

function parseAIContent(content: string) {
  // 这里仅简单处理，复杂的think块分割逻辑可扩展
  if (!content) return ''
  return content.replace(/\n/g, '<br>')
}

function copyAi(content: string) {
  navigator.clipboard.writeText(content.replace(/<[^>]*>/g, ''))
  alert('已复制')
}

function downloadAi(content: string) {
  const text = content.replace(/<[^>]*>/g, '')
  const blob = new Blob([text], {type: 'text/plain'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'AI回复.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function toggleDeepThinkOptions() {
  showDeepThinkOptions.value = !showDeepThinkOptions.value
}

function selectDeepThink(name: string) {
  showDeepThinkOptions.value = false
  deepThinkChecked.value = true
}

function toggleWebSearch() {
  webSearchChecked.value = !webSearchChecked.value
  if (webSearchChecked.value) aiWebSearchChecked.value = false
}

function toggleAiWebSearch() {
  aiWebSearchChecked.value = !aiWebSearchChecked.value
  if (aiWebSearchChecked.value) webSearchChecked.value = false
}

watch(chatList, saveChats, {deep: true})
</script>

<style scoped>
@import "../assets/css/AnXIaoSheng.css";
/* 你还可以写本地样式 */
</style>