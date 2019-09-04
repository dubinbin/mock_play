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
              <span style="margin-right: 10px"><input type="radio" name="sex" checked value="GET" title="GET" style="margin-right: 5px" @click="selectMethod">GET</span>
              <span><input type="radio" name="sex" value="POST" title="POST" style="margin-right: 5px" @click="selectMethod">POST</span>
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
        resObj: [],
        num: 0,
        desc: '',
        hasFormat: false,
        urlPrefix: '',
        originText: '',
        selectM: 'GET'
      }
    },
    async created() {
      const getUsreInfo = await axios.get('/api/self')
    },
    methods: {
      selectMethod(event) {
        let radioVal = event.target.value;
        this.selectM = radioVal
      },
      format() {
          let getUserType =  this.$refs.textValue.value
          let getResulText = formatJson(getUserType);
          // this.treamentCbText(getResulText)
          this.$refs.textValue.value = getResulText
          this.hasFormat = true
      },
      // treamentCbText(str) {
      //   this.resObj.length = 0
      //   let obj = {}
      //   const regExp = /\n/gm
      //   let result;
      //   while ((result = regExp.exec(str)) != null)  {
      //       this.resObj.push({...result})
      //   }

      //   let index = 0
      //   let tempPrev = index === 0 ? 0 : this.resObj[0].index;
      //   this.resObj.reduce((prev, cur) => {
      //     obj[index] = [tempPrev, cur.index]
      //     tempPrev = cur.index
      //     index+=1
      //     return prev
      //   }, [tempPrev])
      // },
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
            data.append('type', this.selectM)
            data.append('nickname', getUsreInfo.data.data.nickname)
            axios.post('/api/addport', data).then((res) => {
              if (res.data.code === 0) {
                window.location.assign('/')
              }
          })
        }
      }
    }
}
</script>
