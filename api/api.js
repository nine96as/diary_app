const express = require('express');
const cors = require('cors');
const logger = require('morgan');

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

module.exports = api;
