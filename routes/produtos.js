const express = require('express');
const router = express.Router();

//Return all products
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornar todos os produtos'
    });
});

//Insert a product
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(201).send({
        mensagem: 'Insere um produto',
        produtoCriado: produto
    });
});

//Returns a product's data
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.
    id_produto;
    
    if (id === 'especial'){
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }
});


//Change a product
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto alterado'
    });
});

//Delele a product
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto excluído'
    });
});


module.exports = router;