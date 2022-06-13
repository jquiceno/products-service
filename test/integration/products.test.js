const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const server = require('../../src/server')
const productsRouter = require('../../src/routes/products.route')
const { errorHandler } = require('../../src/middlewares')
const Db = require('../../src/lib/Db')

describe('Test create products route', () => {
  let mongod = null
  server.use('/', productsRouter)
  server.use(errorHandler)
  const api = request(server)

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()

    const uri = mongod.getUri()
    await Db.connect(uri)
  })

  describe('GET Get all product list', () => {
    test('Shoud get products list', async () => {
      const { body: { data } } = await api.get('/').expect(200)

      expect(Array.isArray(data))
    })
  })

  describe('POST Create a product', () => {
    test('Shoud create a new product', async () => {
      const newProductData = {
        name: 'Product test',
        description: 'this is a product description'
      }

      const { body: { data } } = await api.post('/')
        .send(newProductData)
        .expect(201)

      expect(data.name).toBe(newProductData.name)
    })
  })

  describe('GET get product by Id', () => {
    test('Shoud return a new product object by id', async () => {
      const newProductData = {
        name: 'Product test',
        description: 'this is a product description'
      }

      const { body: { data: newProduct } } = await api.post('/')
        .send(newProductData)
        .expect(201)

      const { body: { data: productData } } = await api.get(`/${newProduct.id}`)
        .expect(200)

      expect(productData.name).toBe(newProductData.name)
      expect(newProduct.id).toBe(productData.id)
    })
  })

  describe('DELETE remove a product by id', () => {
    test('Shoud remove a product by id', async () => {
      const newProductData = {
        name: 'Product test',
        description: 'this is a product description'
      }

      const { body: { data: newProduct } } = await api.post('/')
        .send(newProductData)
        .expect(201)

      const { body: { data: productRemoved } } = await api.delete(`/${newProduct.id}`)
        .send(newProductData)
        .expect(200)

      await api.get(`/${newProduct.id}`)
        .expect(404)

      expect(productRemoved.id).toBe(newProduct.id)
    })
  })

  afterAll(async () => {
    await Db.close()
    await mongod.stop()
  })
})
