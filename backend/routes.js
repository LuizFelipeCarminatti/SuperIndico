const express = require('express')
const route = express.Router()
const controllers = require('./src/controllers/controller')
const { privada } = require('./src/middlewares/middlewares.js')

route.post('/salvarUsuario', controllers.saveUsers)
route.get('/usuarios/:city', controllers.getUsuarios)
route.get('/usuario/:id', privada, controllers.getUsuario)
route.delete('/usuario/excluir/:id', controllers.deleteUsuario)
route.put('/usuario/editar/:id', controllers.editarUsuario)

route.post('/login', controllers.login)

route.get('/espacousuario', privada, controllers.espacoUsuario)

route.post('/logout', controllers.logout)

route.get('/primeirosUsuarios', controllers.getPrimeirosUsuario)

route.get('/perfil/:id', controllers.perfil)

module.exports = route