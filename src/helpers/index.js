'use strict'

const { boomify } = require('@hapi/boom')
function errorHandler (error, req, res, next) {
  if (!error) return next()

  const { output } = boomify(error)
  return res.status(output.statusCode).json(output.payload)
}

function makeRoutes (server, controllers) {
  controllers.forEach(({ method, path, handler }) => {
    if (!method || !path || !handler) return
    if (!server[method.toLocaleLowerCase()]) return

    method = method.toLocaleLowerCase()

    server[method](path, async (req, res, next) => {
      try {
        const params = {
          ...req.query,
          ...req.body,
          ...req.params
        }

        const handlerResponse = await handler({ params, req })

        return res.json({
          data: handlerResponse,
          statusCode: method !== 'post' ? 200 : 201
        })
      } catch (error) {
        return next(error)
      }
    })
  })
}

module.exports = { errorHandler, makeRoutes }
