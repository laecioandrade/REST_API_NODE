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
            (error, result, field) => {
                if(error){return res.status(500).send({error:error})};
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return{
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request:{
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto especifico',
                                url: 'http://localhost:3000/produtos/'+prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send(response);
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
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error:error})}
                
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }

                return res.status(201).send(response);
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
            (error, result, field) => {
                if(error){return res.status(500).send({error:error})};

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com esse ID'
                    });
                }
                
                const response = {
                    produto: {
                        id_produto: result[0],
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: 'http://localhost:3000/produtos/' + req.params.id_produto
                        }
                    }
                }

                return res.status(201).send(response);
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
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error:error})}

                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
                    }
                }

                return res.status(202).send(response);
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
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error:error})}

                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos',
                        body:{
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }

                return res.status(202).send(response);
            }
        )
    });
});


module.exports = router;