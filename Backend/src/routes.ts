import express from 'express';

import PointsController from './controllers/PointsController';
import ItensController from './controllers/ItensController';

const routes = express.Router();

const pointController = new PointsController();
const itemController = new ItensController();

routes.get('/itens',itemController.index);

routes.get('/points',pointController.index );
routes.get('/points/:id',pointController.show );
routes.post('/points',pointController.create );

export default routes;
