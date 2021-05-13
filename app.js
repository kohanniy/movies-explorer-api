require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const limiter = require('./helpers/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const config = require('./utils/config');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

const app = express();

mongoose.connect(config.MONGO_URL, config.mongooseParams);

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
// app.use(limiter);
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(centralizedErrorHandler);

app.listen(config.PORT);
