import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './app/controllers/PointsController';
import ItensController from './app/controllers/ItensController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';
import permissionMiddleware from './app/middleware/permission';

const routes = express.Router();
const upload = multer(multerConfig);

const pointController = new PointsController();
const itemController = new ItensController();
const userController = new UserController();
const sessionController = new SessionController();

routes.post('/session', sessionController.create);

routes.get('/itens',itemController.index);

routes.get('/points/:id',pointController.show );
routes.get('/points',pointController.index );

routes.post('/points',upload.single('image'),authMiddleware,pointController.create);
routes.put('/points/:id',upload.single('image'),authMiddleware,pointController.update);
routes.delete('/points/:id',authMiddleware, permissionMiddleware, pointController.destroy);

routes.put('/users/:id',authMiddleware,userController.update);
routes.post('/users', authMiddleware, permissionMiddleware,userController.create);
routes.delete('/users/:id',authMiddleware, permissionMiddleware, userController.destroy);
routes.get('/users', authMiddleware,permissionMiddleware, userController.index);
routes.get('/users/:id', authMiddleware,permissionMiddleware,userController.show);

export default routes;

