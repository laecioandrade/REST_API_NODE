const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
/*var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root4321',
    database : 'ecommerce'
})*/



//Return all products
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM produtos;', 
            (error, resultado, field) => {
                if(error){return res.status(500).send({error:error})};
                return res.status(200).send({response: resultado});
            }
        )
    });
});

//Insert a product
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?);',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({error:error})}

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso!',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

//Returns a product's data
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto], 
            (error, resultado, field) => {
                if(error){return res.status(500).send({error:error})};
                return res.status(200).send({response: resultado});
            }
        )
    });
});


//Change a product
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({error:error})}

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso!'
                });
            }
        )
    });
});

//Delele a product
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({error:error})}

                res.status(202).send({
                    mensagem: 'Produto excluído com sucesso!'
                });
            }
        )
    });
});


module.exports = router;