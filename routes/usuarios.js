const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario-controllers');

router.post('/', UsuarioController.cadastroUsuario);
router.post('/login', UsuarioController.loginUsuario);


module.exports = router;