import express from 'express';
import productController from "../controllers/productController";

const productRouter = express.Router();

productRouter.get('/products', productController.getProducts);

productRouter.get('/products/:id', productController.getProduct);

productRouter.post('/products', productController.createProduct);

productRouter.put('/products/:id', productController.updateProduct);

productRouter.delete('/products/:id', productController.deleteProduct);

export default productRouter;
