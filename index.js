const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

// swagger
const path = require("path")
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

// Rutas
const routerModels = require('./routes/models.router')
const routerErrorHandler = require('./routes/errorhandler.router')


// Informacion Metadata para nuestra API
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Documentation API',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:8001/"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.routes.js")}`],
};


const app = express()
const PORT = process.env.PORT || 8001

/*
Cors Settings
*/
const whitelist = ['http://localhost:8001']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Denied By CORS'))
    }
  }
}

// Middlewares
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerSpec))
);


if (process.env.NODE_ENV === 'production') {
  app.use(cors())
  /* Set security HTTP headers */
  /* For Error ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 
       https://stackoverflow.com/questions/70752770/helmet-express-err-blocked-by-response-notsameorigin-200
  */
  app.use(helmet({ crossOriginResourcePolicy: false }))

} else {
  app.use(cors())
}


/*
Accept Json & form-urlencoded
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/* 
    Tell everyone the state of your api
*/
app.get('/', ({ res }) => {
  return res.json({
    status: 'Up',
    maintenance: false,
  })
})

/*
Routes
*/
routerModels(app)
routerErrorHandler(app)

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
})