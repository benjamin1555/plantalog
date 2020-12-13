const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const plantRouter = require('./routes/plant');
const diseaseRouter = require('./routes/disease');
const authRouter = require('./routes/auth');

const setHeaders = require('./middleware/setHeaders');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(setHeaders);

app.use('/catalog', plantRouter);
app.use('/catalog', diseaseRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => app.listen(3000))
  .catch(err => console.log(err));