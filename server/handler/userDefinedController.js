const model = require('../dbServer/Model')
const MockModel = model.getModel('mock')
const fs = require('fs')

const UserRoute = {
  async userDefineGet(ctx, next) {
    try {
      const _id =  ctx.params.id
      const searchFromDataBase = await MockModel.findById({_id})
      if (searchFromDataBase) {
        const resDoc = await fs.readFileSync(`./mock_static/${_id}.txt`, 'utf-8')
        if (resDoc) {
          const changeJson = (JSON.parse(resDoc))
          ctx.body = changeJson
        }
      }
    } catch (e) {
      ctx.body = e
    }
  },

  async userDefinePost(ctx, next) {
    try {
      const _id =  ctx.params.id
      const searchFromDataBase = await MockModel.findById({_id})
      if (searchFromDataBase) {
        const resDoc = await fs.readFileSync(`./mock_static/${_id}.txt`, 'utf-8')
        if (resDoc) {
          const changeJson = (JSON.parse(resDoc))
          ctx.body = changeJson
        }
      }
    } catch (e) {
      ctx.body = e
    }
  }
}

module.exports = {
  UserRoute
}
