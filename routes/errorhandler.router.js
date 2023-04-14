const express = require('express');
require('dotenv').config();

const {
  logErrors,
  handlerAuthError,
  errorHandler,
  ormErrorHandler,
} = require('../middlewares/error.handler');

function routerErrorHandler(app) {
  /* Apply Middlewares */
  // Se loguearan errores en otros ambientes pero no en test
  if (process.env.NODE_ENV != 'test') app.use(logErrors);
  // app.use(logErrors);
  app.use(handlerAuthError);
  app.use(ormErrorHandler);
  app.use(errorHandler);

  app.use('*', async (request, response) => {
    try {
      return response.status(404).send('Page Not Found');
    } catch (error) {
      return response.status(404).send('Error loading page not found');
    }
  });
}

module.exports = routerErrorHandler;
