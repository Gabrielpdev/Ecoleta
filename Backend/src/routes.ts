import express from 'express';

import PointsController from './app/controllers/PointsController';
import ItensController from './app/controllers/ItensController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = express.Router();

const pointController = new PointsController();
const itemController = new ItensController();
const userController = new UserController();
const sessionController = new SessionController();

routes.post('/users', userController.create);
routes.post('/session', sessionController.create);

routes.get('/itens',itemController.index);

routes.get('/points/:id',pointController.show );
routes.get('/points',pointController.index );

routes.use(authMiddleware);

routes.post('/points',pointController.create );


export default routes;
