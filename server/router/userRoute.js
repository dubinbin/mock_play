const Router = require('koa-router');
const { UserRoute } = require('../handler/userDefinedController')

var router = new Router()

router.get('/userport/mock/:id/*', UserRoute.userDefineGet)
router.post('/userport/mock/:id/*', UserRoute.userDefinePost)

module.exports = router
