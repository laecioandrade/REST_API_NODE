const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrationUser = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ?;'
        const result = await mysql.execute(query, req.body.email);
        if(result.length > 0){
            return res.status(409).send({
                message: 'User already registered!'
            });
        }
        const hash = await bcrypt.hashSync(req.body.senha, 10);
        const queryInsert = 'INSERT INTO users (email, password) VALUES (?,?);';
        resultInsert = await mysql.execute(queryInsert, [req.body.email,hash]);
        response = {
            message: 'User created successfully!',
            createdUser: {
                userId: resultInsert.insertId,
                email: req.body.email
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({error:error});
    }
}
exports.loginUser = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ?;';
        const result = await mysql.execute(query, [req.body.email]);
        if(result.length<1){
            return res.status(401).send({message: 'Falha na autenticação'})
        }
        if(await bcrypt.compareSync(req.body.senha, result[0].password)){
            const token = jwt.sign({
                id_usuario: result[0].userId,
                email: result[0].email
            }, 
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });
            return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: token
            });
        }
        return res.status(401).send({message: 'Falha na autenticação'});
    } catch (error) {
        return res.status(500).send({error:error});
    }
}