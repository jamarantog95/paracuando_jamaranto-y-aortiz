const express = require('express')
// const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes')
const routesUser = require('./user.routes')
const routesPublicationType = require('./publicationtype.routes')
const routesCountry = require('./countries.routes')
const routesState = require('./state.routes')
const routesCity = require('./city.routes')
const routesTag = require('./tag.routes')
const routesRol = require('./roles.routes')
const routesPublication = require('./publications.routes')


function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/users', routesUser)
  router.use('/publications-types', routesPublicationType)
  router.use('/countries', routesCountry)
  router.use('/states', routesState)
  router.use('/cities', routesCity)
  router.use('/tags', routesTag)
  router.use('/roles', routesRol)
  router.use('/publications', routesPublication)

}

module.exports = routerModels
