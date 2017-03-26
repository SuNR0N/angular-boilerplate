const Router = require('express').Router;

const authApi = require('../api/authenticate');
const authenticateRoute = require('../endpoints').authenticateRoute;

const authenticateRouter = new Router();

authenticateRouter.post(authenticateRoute.getSlash(), authApi.authenticate);

module.exports = authenticateRouter;