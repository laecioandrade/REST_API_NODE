const express = require('express');
const router = express.Router();

//Return all requests
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
});

//Insert a request
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O pedido foi criado'
    });
});

//Returns the data of a request
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.
    id_pedido;
    
    res.status(200).send({
        mensagem: 'Detalhes do pedido',
        id_pedido: id
    });
});


//Delele a request
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluído'
    });
});


module.exports = router;