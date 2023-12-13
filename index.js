const bodyParser = require('body-parser');
const { green, yellow } = require('chalk').default;
const express = require('express');
const expressErrorHandler = require('@kazaar/express-error-handler');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const compression = require('compression');

const { host, port, env } = require('./config');
const logger = require('./config/winston');
const router = require('./routes');
const { connectToDatabase } = require('./services/mongoose');
const schoolMiddleware = require('./middlewares/school.middleware');

const {
  httpErrorHandler,
  handleServerError,
  axiosErrorParser,
  celebrateErrorParser,
  jwtErrorParser,
} = expressErrorHandler(logger);

/**
 * Express server initialization
 */
const app = express();
const server = http.createServer(app);
const io = socketio(server);

/**
 * Application configuration
 */
app.use(cors());
app.use(
  morgan('dev', {
    stream: { write: message => logger.info(message) },
  })
);
app.use(compression({ level: 9 }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());

/**
 * API documentation
 */
app.use('/docs', express.static(`${__dirname}/doc`));

app.use(schoolMiddleware);
app.use(router);

/**
 * Error handling
 */
app.use(axiosErrorParser);
app.use(celebrateErrorParser);
app.use(jwtErrorParser);
app.use(httpErrorHandler);

app
  .listen(port, host, () => {
    logger.info(`${green('✓')} App is running at ${yellow(`${host}:${port}`)} in ${yellow(env)} mode`);

    io.on('connection', function(socket) {
      logger.info('socket io connected');
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function(data) {});
    });

    connectToDatabase();
  })
  .on('error', handleServerError);
