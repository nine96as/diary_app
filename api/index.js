const api = require('./api');

api.listen(3000, () =>
  console.log(`API listening on port: http://localhost:${process.env.PORT}`)
);
