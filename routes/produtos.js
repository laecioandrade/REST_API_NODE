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


router.get('/', ProdutosController.getProducts);
router.post(
    '/', 
    login.obrigatorio, 
    upload.single('productImage'), 
    ProdutosController.postProducts
);
router.get('/:productId', ProdutosController.getProductDetail);
router.patch('/', login.obrigatorio, ProdutosController.updateProduct);
router.delete('/', login.obrigatorio, ProdutosController.deleteProduct);
router.post(
    '/:productId/image', login.obrigatorio, 
    upload.single('productImage'),
    ProdutosController.postImage
);
router.get('/:productId/images', ProdutosController.getImages);


module.exports = router;