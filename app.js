import path from 'node:path';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';
import connectMongoose from './lib/connectMongoose.js';
import * as sessionManager from './lib/sessionManager.js';
import i18n from './lib/i18n.config.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './api/swagger/swaggerConfig.js';
import homeRoutes from './routes/home.js';
import loginRoutes from './routes/login.js';
import productsRoutes from './routes/products.js';
import apiRoutes from './api/routes/apiProducts.js';
import apiAuthRoutes from './api/routes/apiAuthRoutes.js';
import { assignOwnerMiddleware } from './middlewares/assignOwnerMiddleware.js';
import { changeLang } from './controllers/langController.js';

//Mongoose connect
await connectMongoose();

//Create express app
const app = express();

// Set environment for Express
app.set('env', process.env.NODEPOP_ENV || 'development');

//Configs
app.set('views', 'views');
app.set('view engine', 'html');
app.engine('html', ejs.__express);

//Locals
app.locals.appName = 'Nodepop';

//Logger morgan
app.use(logger('dev'));

//Urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * API routes
 */
app.use('/api', apiRoutes);
app.use('/api', apiAuthRoutes);

//Static
app.use(express.static(path.join(import.meta.dirname, 'public')));

//Sessions
app.use(sessionManager.middleware);
app.use(sessionManager.useSessionsInViews);

// Handle cookie
app.use(cookieParser());

//i18n
app.use(i18n.init);
app.get('/change-lang/:locale', changeLang);

/**
 * App routes
 */
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/products', assignOwnerMiddleware, productsRoutes);

//Catch 404 and send error
app.use((req, res, next) => {
  next(createError(404));
});

//Error handler
app.use((err, req, res, next) => {
  console.error('ERROR CAUGHT:', err);

  const statusCode = err.status || 500;
  res.status(statusCode);

  // API errors
  if (req.url.startsWith('/api')) {
    res.json({ error: err.message });
    return;
  }
  if (err.array) {
    err.message =
      'Invalid request: ' +
      err
        .array()
        .map((e) => `${e.location} ${e.type} ${e.path} ${e.msg}`)
        .join(', ');
    err.status = 422;
  }

  res.locals.statusCode = statusCode;
  res.locals.message = err.message || '';
  res.locals.error = process.env.NODEPOP_ENV === 'development' ? err : {};
  res.locals.__ = res.__;
  res.locals.app = app;

  res.render('error');
});

export default app;
