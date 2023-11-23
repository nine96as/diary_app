const { Router } = require('express');
const { index, create, show, destroy } = require('../controllers/entry');

const postRouter = Router();

postRouter.get('/', index);
postRouter.get('/:id', show);
postRouter.post('/', create);
postRouter.delete('/:id', destroy);

module.exports = postRouter;
