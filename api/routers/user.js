const { Router } = require('express');
const { register, login, logout } = require('../controllers/user');

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

module.exports = userRouter;
