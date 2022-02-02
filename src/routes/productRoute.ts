import express from 'express';
import productController from "../controllers/productController";
import { checkProductData } from "../middleware/validate";

const productRouter = express.Router();

productRouter.get('/products', productController.getProducts);

productRouter.get('/products/:id', productController.getProduct);

productRouter.post('/products', checkProductData, productController.createProduct);

productRouter.put('/products/:id', checkProductData, productController.updateProduct);

productRouter.delete('/products/:id', productController.deleteProduct);

export default productRouter;
