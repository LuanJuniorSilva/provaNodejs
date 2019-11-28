import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import BookController from './app/controllers/BookController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.delete('/user/:id', UserController.delete);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/books', BookController.index);
routes.get('/book/:id', BookController.show);
routes.delete('/book/:id', BookController.delete);
routes.post('/books', BookController.store);
routes.put('/book/:id', BookController.update);

routes.post('/bookFavorite', BookController.addFavorite);

export default routes;