const Router = require('koa-router');
const { Special } = require('../handler/specialController')

var router = new Router()

router.post('/auth/login', Special.login)
router.post('/auth/register', Special.register)

module.exports = router
