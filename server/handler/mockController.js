const model = require('../dbServer/Model')
const MockModel = model.getModel('mock')
const { Util } = require('../utils/tools')
const fs = require('fs')

const Mock = {
  async add(ctx, next) {
      try {
        const {content, url, desc, nickname, type} = await Util.treamentFormData(ctx.req)
        const mockModel = new MockModel({desc, url, type, owner: nickname})
        const insertData = await mockModel.save()
        fs.writeFile(`./mock_static/${insertData._id}.txt`, content, function(err) {
          if (err) {
            ctx.body = err
          }
        })
        ctx.body =  ({code:0, data: {id: insertData._id}, msg: '生成成功'})
      } catch (e) {
        ctx.body = e
      }
  },

  async list(ctx, next) {
      const result = await Util.checkToken(ctx.header.authorization)
      const nickname = result.nickname
      try {
        const listDoc = await MockModel.find({owner: nickname})
        ctx.body = ({'code': 0, 'data': listDoc, msg: 'success'})
      } catch (err) {
        ctx.body = err
      }
  },

  async info(ctx, next) {
    const getId = ctx.params.id
    try {
      const listDoc = await MockModel.findOne({_id: getId})
      const resDoc = await fs.readFileSync(`./mock_static/${getId}.txt`, 'utf-8')
      if (resDoc) {
        ctx.body = ({'code': 0, 'data':{ ...listDoc._doc, content: resDoc }, msg: 'success'})
      }
    } catch (err) {
      ctx.body = err
    }
  },

  async delete(ctx, next) {
      const deleteId = ctx.params.id
      try {
        const deleteRes = await MockModel.remove({_id: deleteId})
        if (deleteRes.ok === 1) {
          ctx.body = ({code: 0, msg: 'success'})
        }
      } catch(err) {
        ctx.body = err
      }
  },

  async edit(ctx, next) {
    const {content, url, desc, nickname, type, _id} = await Util.treamentFormData(ctx.req)
    try {
      const editRes = await MockModel.findOneAndUpdate({_id}, {
        $set: {
          desc: desc,
          url:url,
          type: type,
          owner: nickname
        }
      }, { new: true })
      fs.writeFile(`./mock_static/${_id}.txt`, content, { 'flag': 'w' }, function(err) {
        if (err) {
          ctx.body = err
        }
      })
      ctx.body = ({code: 0, data: {...editRes}, msg: 'success'})
    } catch(err) {
      ctx.body = err
    }
  },

  async self(ctx, next) {
      try {
        const res = ctx.request.header
        const getAuth = res.authorization
        const UserInfo = await Util.checkToken(getAuth)
        ctx.body = ({code:0, data: {...UserInfo}, msg: 'success'})
      } catch (e) {
        crx.body = e
      }
  }
}

module.exports = {
  Mock
}
