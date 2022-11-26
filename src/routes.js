const express = require('express');

const routes = express.Router();

const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller');
const listController = require('./controllers/list.controller');

routes.get('/', userController.index);

//user routes
routes.get('/api/users', userController.index);
routes.get('/api/users.details/:_id', userController.details);
routes.post('/api/users', userController.create);
routes.delete('/api/users/:_id', userController.delete);
routes.put('/api/users', userController.update);

//product routes
routes.get('/api/products', productController.index);
routes.get('/api/products.details/:_id', productController.details);
routes.post('/api/products', productController.create);
routes.delete('/api/products/:_id', productController.delete);
routes.put('/api/products', productController.update);

//list routes
routes.get('/api/list', listController.index);
routes.get('/api/list.details/:_id', listController.details);
routes.post('/api/list', listController.create);
routes.delete('/api/list/:_id', listController.delete);
routes.put('/api/list', listController.update);


module.exports = routes;