const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const ProdutosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    } 
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/', ProdutosController.getProdutos);
router.post(
    '/', 
    login.obrigatorio, 
    upload.single('produto_imagem'), 
    ProdutosController.postProdutos
);
router.get('/:id_produto', ProdutosController.getUmProduto);
router.patch('/', login.obrigatorio, ProdutosController.updateProduto);
router.delete('/', login.obrigatorio, ProdutosController.deleteProduto);
router.post(
    '/:id_produto/imagem', login.obrigatorio, 
    upload.single('produto_imagem'),
    ProdutosController.postImagem
);
router.get('/:id_produto/imagens', ProdutosController.getImagens);


module.exports = router;