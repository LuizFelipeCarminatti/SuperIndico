const express = require('express')
const route = express.Router()
const controllers = require('./src/controllers/controller')
const { ensureAuthenticated, authenticatedRefreshToken } = require('./src/middlewares/middlewares.js')

route.post('/salvarUsuario', controllers.saveUsers)
route.get('/usuarios/:city', controllers.getUsuarios)
route.get('/usuario/:id', controllers.getUsuario)
route.delete('/usuario/excluir/:id', controllers.deleteUsuario)
route.put('/usuario/editar/:id', controllers.editarUsuario)

route.post('/login', controllers.login)

route.get('/espacousuario', controllers.espacoUsuario)

module.exports = route