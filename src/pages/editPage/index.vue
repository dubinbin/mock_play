<template>
  <div class="createpage">
      <div class="createpage_left">
        <textarea name="" id="" cols="30" rows="10" class="main_content_textarea" ref="textValue"></textarea>
      </div>
      <div class="createpage_right">
        <form class="layui-form" action="">
        <div class="createpage_right_form">
          <div class="form_item">
            <input type="text" name="title" required lay-verify="required" placeholder="不需要前缀 /api/xxx/xxx" autocomplete="off" class="layui-input" v-model="urlPrefix">
          </div>

          <div class="form_item">
            <input type="text" name="title" required lay-verify="required" placeholder="输入接口描述" autocomplete="off" class="layui-input" v-model="desc">
          </div>

          <div class="form_item_radio" style="margin-top: 12px">
              <span style="margin-right: 10px"><input type="radio" name="sex" checked value="GET" title="GET" style="margin-right: 5px" v-model="radioSelect">GET</span>
              <span><input type="radio" name="sex" value="POST" title="POST" style="margin-right: 5px"  v-model="radioSelect">POST</span>
          </div>
        </div>
        </form>
        <button type="button" class="layui-btn layui-btn-radius layui-btn-normal" @click="submit">确定</button>
        <button type="button" class="layui-btn layui-btn-radius" @click="format">格式化</button>
      </div>
  </div>
</template>

<style scoped>
.form_item_radio input[type=checkbox], .form_item_radio input[type=radio], .form_item_radio select {
  display: inline-block;
}
.createpage {
  display: flex;
  background: #ffffff;
  min-height: 100vh;
}
.createpage_left {
  position: relative;
  width: 70%;
}
.createpage_right {
  position: relative;
  width: 30%;
}
.main_content_textarea {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  color: #fff;
  font-weight: 400;
  background: #383838;
}
.createpage_right_form {
  margin: 15px;
}
.form_item {
  display: flex;
  margin-top: 10px;
}
</style>

<script>
import formatJson from 'json-beautifully';
import { showDialog } from '@/utils/tools.js'
import axios from 'axios'
export default {
    data() {
      return {
        desc: '',
        hasFormat: false,
        urlPrefix: '',
        id: 0,
        radioSelect: 'GET'
      }
    },
    async created() {
      const getUsreInfo = await axios.get('/api/self')
      this.id = this.$router.history.current.params.id
      this.getSingleInfo()
    },
    methods: {
      getSingleInfo() {
        axios.get(`/api/mock/info/${this.id}`).then((res) => {
          if (res.data.code === 0) {
            const info = res.data.data
            this.desc = info.desc
            this.hasFormat = true
            this.urlPrefix = info.url
            this.$refs.textValue.value = info.content
            this.radioSelect =  info.type
          }
        })
      },
      format() {
          let getUserType =  this.$refs.textValue.value
          let getResulText = formatJson(getUserType);
          this.$refs.textValue.value = getResulText
          this.hasFormat = true
      },
      async submit() {
        if (!this.$refs.textValue.value) {
          showDialog('提示', '老板，你起码得写点内容吧')
          return
        }

        if (this.desc === '') {
          showDialog('提示', '接口描述不能为空')
          return
        }

        if (this.urlPrefix === '') {
          showDialog('提示', 'url必须要写哟')
          return
        }

        if (!this.hasFormat) {
          this.format()
          this.hasFormat = true
        }

        const getUsreInfo = await axios.get('/api/self')
        if (getUsreInfo.data.code === 0) {
            const data = new FormData()
            data.append('content', this.$refs.textValue.value)
            data.append('desc', this.desc)
            data.append('url', this.urlPrefix)
            data.append('type', this.radioSelect)
            data.append('_id', this.id)
            data.append('nickname', getUsreInfo.data.data.nickname)
            axios.post('/api/editport', data).then((res) => {
              if (res.data.code === 0) {
                showDialog('提示', '修改成功，可通过"复制"按钮获得接口地址')
                window.location.assign('/')
              }
          })
        }
      }
    }
}
</script>
