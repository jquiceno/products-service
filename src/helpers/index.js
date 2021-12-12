'use strict'

const { boomify } = require('@hapi/boom')
function errorHandler (error, req, res, next) {
  if (!error) return next()

  const { output } = boomify(error)
  return res.status(output.statusCode).json(output.payload)
}

function makeRoutes ({ server, controllers, middlewares = [] } = {}) {
  controllers.forEach(({ method, path, handler, middlewares: mdwConroller }) => {
    if (!method || !path || !handler) return
    if (!server[method.toLocaleLowerCase()]) return

    const routeMiddlewares = []

    method = method.toLocaleLowerCase()

    if (mdwConroller) {
      mdwConroller.forEach(mdw => {
        routeMiddlewares.push(middlewares[mdw])
      })
    }

    server[method](path, routeMiddlewares, async (req, res, next) => {
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
