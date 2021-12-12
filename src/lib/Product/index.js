'use strict'

const { Types } = require('mongoose')
const Basic = require('../Basic')
const Model = require('../../models/product')
const { badRequest } = require('@hapi/boom')

class Product extends Basic {
  constructor (id) {
    const _id = /^[0-9a-fA-F]{24}$/.test(id) ? Types.ObjectId(id) : null

    const $or = []

    if (_id) $or.push({ _id: id })
    if (!$or.length) throw badRequest('Invalid Product Id')

    super({
      name: 'Product',
      query: {
        $or
      },
      model: Model
    })

    this._id = _id
  }
}

Product.model = Model

module.exports = Product
