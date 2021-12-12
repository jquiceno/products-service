'use strict'

const Produc = require('../lib/Product')

module.exports = [
  {
    name: 'getAllProducts',
    method: 'GET',
    path: '/',
    async handler ({ params }) {
      return await Produc.getAll()
    }
  },
  {
    name: 'addNewProduct',
    method: 'POST',
    path: '/',
    async handler ({ params }) {
      return await Produc.add(params)
    }
  },
  {
    name: 'getProductById',
    method: 'GET',
    path: '/:id',
    async handler ({ params }) {
      const { id } = params
      const product = new Produc(id)
      return await product.get()
    }
  },
  {
    name: 'updateProductById',
    method: 'PUT',
    path: '/:id',
    async handler ({ params }) {
      const { id } = params
      const product = new Produc(id)
      return await product.update(params)
    }
  },
  {
    name: 'deleteProductById',
    method: 'DELETE',
    path: '/:id',
    async handler ({ params }) {
      const { id } = params
      const product = new Produc(id)
      return await product.delete()
    }
  }
]
