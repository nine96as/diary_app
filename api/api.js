const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const entryRouter = require('./routers/entry');
const userRouter = require('./routers/user');

const api = express();

// middlewares
api.use(cors());
api.use(express.json());
api.use(logger('dev'));

api.get('/', (req, res) => {
  res.status(200).json({
    name: 'Diary API',
    description: 'Create vivid snapshots of your memories.',
    endpoints: ['']
  });
});

api.use('/entries', entryRouter);
api.use('/users', userRouter);

module.exports = api;
