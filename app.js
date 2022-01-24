const express =  require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/images');
const categoryRoute = require('./routes/categories');


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Header', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS'){
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    };
    next();
});

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/user', userRoute);
app.use('/images', imageRoute);
app.use('/categories', categoryRoute);


app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensage: error.message
        }
    });
});

module.exports = app;