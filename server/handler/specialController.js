const model = require('../dbServer/Model')
const User = model.getModel('user')
const { Util } = require('../utils/tools')
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}

function md5Pwd(pwd){
  const salt = 'yikesaiting@19260817'
  return utils.md5(utils.md5(pwd + salt))
}

const Special = {
  async login(ctx, next) {
      try {
        const {nickname, pwd} = await Util.treamentFormData(ctx.req)
        const findOneRes = await User.findOne({nickname, pwd: md5Pwd(pwd)}, _filter)

        if (!findOneRes) {
          return ctx.body =({code: 1, msg: '用户名或密码错误'})
        } else {
          const token = Util.setToken({nickname: findOneRes.nickname})
          ctx.response.body = ({code: 0, data: {...findOneRes._doc, token}})
        }
      } catch (e) {
        ctx.response.body = e
      }
  },

  async register(ctx, next) {
    try {
      const {nickname, pwd} = await Util.treamentFormData(ctx.req)
      const findOneRes = await User.findOne({nickname: nickname})
      if (findOneRes) {
        return ctx.body = ({code:1, msg: '用户名重复'})
      }
      const userModel = new User({nickname, pwd:md5Pwd(pwd)})
      const insertData = await userModel.save()
      const token = Util.setToken({nickname: insertData.nickname})
      ctx.body = ({code:0, data: { nickname: insertData.nickname , _id: insertData._id, token}})
    } catch (e) {
        ctx.body = e
    }
  }
}

module.exports = {
  Special
}
