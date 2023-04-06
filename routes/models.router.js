const express = require('express');
// const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes');
const routesUser = require('./user.routes');
const routesPublications = require('./publications.routes');
const routesPublicationType = require('./publicationtype.routes');
const routesCountry = require('./countries.routes');
const routesState = require('./state.routes');
const routesCity = require('./city.routes');
const routesTag = require('./tag.routes');

function routerModels(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/auth', routesAuth);
  router.use('/users', routesUser);
  router.use('/publications', routesPublications);
  router.use('/publicationstypes', routesPublicationType);
  router.use('/countries', routesCountry);
  router.use('/states', routesState);
  router.use('/cities', routesCity);
  router.use('/tags', routesTag);
}

module.exports = routerModels;
