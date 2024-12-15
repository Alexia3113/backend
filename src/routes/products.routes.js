import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    editProduct,
    updateProductNoUpdateImage,
    updateProduct
} from '../controllers/products.controller.js'

//importar el middleware de validatorSchema
import { validateSchema } from '../middlewares/validator.middleware.js';
//importar el middleware de validatorSchema
import { productSchema } from '../schemas/product.schemas.js';
//importamos el middleware para subir una imagen
import { uploadImage } from '../middlewares/uploadImage.middleware.js';

const router = Router();

//obtener todos los productos
router.get('/products',authRequired, getProducts);

//crear un producto
router.post('/products',authRequired,uploadImage,validateSchema(productSchema),createProduct);

//obtener un producto por id
router.get('/products/:id',authRequired,getProduct);

//eliminar un producto
router.delete('/products/:id',authRequired,deleteProduct);

//actualizar un producto y actualizar imagen
router.put('/products/:id',authRequired,uploadImage,validateSchema(productSchema),updateProduct);

//ruta para actualizar un producto y SIN CAMBIAR LA IMAGEN
router.put('/productupdatenoimage/:id', authRequired,validateSchema(productSchema), updateProductNoUpdateImage);

export default router;