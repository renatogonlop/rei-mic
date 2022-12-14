const express = require('express');

const routes = express.Router();

const usuario = require('./controllers/user.controller');
const produto = require('./controllers/product.controller');
const lista = require('./controllers/list.controller');
const ind = require('./controllers/ind.controller');

routes.get('/', usuario.index);

//user routes
routes.get('/api/users', usuario.index);
routes.get('/api/users.details/:_id', usuario.details);
routes.post('/api/users', usuario.create);
routes.delete('/api/users/:_id', usuario.delete);
routes.put('/api/users', usuario.update);

//product routes
routes.get('/api/products', produto.index);
routes.get('/api/products.details/:_id', produto.details);
routes.post('/api/products', produto.create);
routes.delete('/api/products/:_id', produto.delete);
routes.put('/api/products', produto.update);

//list routes
routes.get('/api/list', lista.index);
routes.get('/api/list.details/:_id', lista.details);
routes.post('/api/list', lista.create);
routes.delete('/api/list/:_id', lista.delete);
routes.put('/api/list', lista.update);

//ind routes
routes.get('/api/ind', ind.index);
routes.get('/api/ind.details/:_id', ind.details);
routes.post('/api/ind', ind.create);
routes.delete('/api/ind/:_id', ind.delete);
routes.put('/api/ind', ind.update);


module.exports = routes;