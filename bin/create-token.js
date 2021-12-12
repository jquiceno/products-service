'use strict'

const { jwt } = require('../src/lib/Auth')

function main () {
  try {
    const token = jwt.sign({
      sub: 's',
      roles: ['admin'],
      scopes: ['products.create', 'products.delete']
    })
    console.log(`Token created: ${token}`)
  } catch (error) {
    console.error('There is an error creating a token', error)
  }
}

main()
