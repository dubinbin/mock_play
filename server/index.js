const koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const mockRouter = require('./router/mock')
const specialRouter = require('./router/special')
const userRouter = require('./router/userRoute')
const { Util } = require('./utils/tools')
const app = new koa()

const unAuth = ['userport', 'auth']

app.use(cors());
app.use(bodyParser())

app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(specialRouter.routes(), specialRouter.allowedMethods())

app.use(async (ctx,next)=>{
  const requestUrl = ctx.request.url
  if (unAuth.filter((item) => requestUrl.indexOf(item) > -1).length <= 0) {
    const authorization = ctx.header.authorization
    if (!ctx.header || !ctx.header.authorization) {
        ctx.status = 401
        ctx.body = ({code: -1, msg: '未登陆'})
        return
    }
    try {
      const result = await Util.checkToken(authorization)
    } catch (err) {
      ctx.status = 401
      ctx.body = ({code: -1, msg: '未登陆'})
      return
    }
  }
  await next()
})

app.use(mockRouter.routes(), mockRouter.allowedMethods())

app.listen(3000, () => {
  console.log('server run in port 3000')
})
