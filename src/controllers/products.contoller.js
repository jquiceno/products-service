const Produc = require('../lib/Product')

class ProductController {
  async getAll (req, res, next) {
    try {
      const products = await Produc.getAll()

      return res.json({
        data: products,
        statusCode: 200
      })
    } catch (error) {
      return next(error)
    }
  }

  async getById ({ params }, res, next) {
    try {
      const { productId } = params

      const product = new Produc(productId)
      const productData = await product.get()

      return res.json({
        data: productData,
        statusCode: 200
      })
    } catch (error) {
      return next(error)
    }
  }

  async create ({ body }, res, next) {
    try {
      const newProduct = await Produc.add(body)

      return res.status(201).json({
        data: newProduct,
        statusCode: 201
      })
    } catch (error) {
      return next(error)
    }
  }

  async delete ({ params }, res, next) {
    try {
      const { productId } = params

      const product = new Produc(productId)
      const productRemoved = await product.delete()

      return res.json({
        data: productRemoved,
        statusCode: 200
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new ProductController()
