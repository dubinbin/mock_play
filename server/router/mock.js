const Router = require('koa-router');
const { Mock } = require('../handler/mockController')

var router = new Router()

router.post('/api/addport', Mock.add)
router.get('/api/mock/list', Mock.list)
router.get('/api/mock/delete/:id', Mock.delete)
router.get('/api/mock/info/:id', Mock.info)
router.post('/api/editport', Mock.edit)
router.get('/api/self', Mock.self)

module.exports = router
