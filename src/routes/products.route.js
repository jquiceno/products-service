const { Router } = require('express')
const productController = require('../controllers/products.contoller')

const route = Router()

route.get('/', productController.getAll)

route.post('/', productController.create)

route.get('/:productId', productController.getById)

route.delete('/:productId', productController.delete)

module.exports = route
