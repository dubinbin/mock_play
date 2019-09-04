<template>
  <div class="portPanel">
      <div class="portPanelTable">

      <div class="layui-row" style="position: relative;display: flex;align-items: center;justify-content: space-between;">
        <div class="layui-col-md9">
           Port Mock Server
        </div>
        <div class="layui-col-md3" style="text-align: right">
            <!-- <div class="">创建接口</div> -->
            <button type="button" class="layui-btn layui-btn-radius layui-btn-normal" @click="creatPort">创建接口</button>
            <button type="button" class="layui-btn layui-btn-radius layui-btn-warn" @click="logout">退出登陆</button>
        </div>
      </div>

        <table class="layui-table">
            <colgroup>
              <col width="150">
              <col width="200">
              <col width="50">
              <col width="200">
            </colgroup>
            <thead>
              <tr>
                <th style="text-align: center">标题</th>
                <th style="text-align: center">API URL</th>
                <th style="text-align: center">METHOD</th>
                <th style="text-align: center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in apilist" :key="item._id">
                <td>{{item.desc}}</td>
                <td>{{item.url}}</td>
                <td>{{item.type}}</td>
                <td>
                    <button type="button" class="layui-btn layui-btn-radius" @click="eidt(item._id)">编辑</button>
                    <button type="button" class="layui-btn layui-btn-radius layui-btn-normal" @click="copy(item)">复制链接</button>
                    <button type="button" class="layui-btn layui-btn-radius layui-btn-danger" @click="deleteItem(item._id, index)">删除</button>
                    <textarea style="opacity: 0;position: absolute;left: 0;z-index: -1;" class="trueTextNode"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { showDialog } from '@/utils/tools.js'
export default {
    data() {
      return {
        apilist: []
      }
    },
    created() {
      axios.get('/api/mock/list').then((res) => {
         if (res.data.code === 0) {
           const list = res.data.data
           list.map((item) => {
              this.apilist.push(item)
           })
         }
      })
    },
    methods: {
      eidt(id) {
        this.$router.push(`/editpanel/${id}`)
      },
      logout() {
        const store = window.localStorage
        for (const [key, value] of Object.entries(store)) {
          key.indexOf('Mock') > -1 && window.localStorage.removeItem(key)
        }
        this.$router.push('/login')
      },
      creatPort() {
        this.$router.push('/createport')
      },
      copy(item) {
          const textArea = document.querySelector('.trueTextNode')
          textArea.value = `http://localhost:3000/userport/mock/${item._id}${item.url}`
          textArea.select(); // 选中文本
          document.execCommand("copy"); // 执行浏览器复制命令
          showDialog('提示', '复制成功')
      },
      deleteItem(id, index) {
          const _self = this
          layui.use('layer', function(){
            var layer = layui.layer;
            layer.confirm('确定要删除？', {
              btn: ['确定', '取消']
            }, function(index, layero){
              axios.get(`/api/mock/delete/${id}`).then((res) => {
                if (res.data.code === 0) {
                  _self.apilist.splice(index, 1)
                  showDialog('提示', '删除成功')
                }
              })
            }, function(index){
              console.log('cancel')
            });
        })
      }
    }
}
</script>

<style lang="css" scoped>
.portPanelTable {
  margin: 30px;
}
</style>
