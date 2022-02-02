//引进model
import Product from "../models/productModel";

const productController = {
   getProducts: async (req, res) => {
       try{
           const products = await Product.find();
           return res.status(200).json({
               status:'success',
               data: products
           })
       }catch (err){
           return res.status(500).json({
               message: err.message
           })
       }
   },
   getProduct: async (req, res) => {
       console.log(req.params);
       try{
           const product = await Product.findById(req.params.id);
           if(!product){
               return res.status(404).json({
                   status: 'fail',
                   message: 'Product not found'
               })
           }
           return res.status(200).json({
               status:'success',
               data: product
           });
       }catch (err){
           return res.status(500).json({
               message: err.message
           })
       }
   },
   createProduct: async (req, res) => {
       try{
           const { title, description, image, category, price } = req.body;
           const newProduct = new Product({
               title,
               description,
               image,
               category,
               price
           });
           await newProduct.save();
           return res.status(200).json({
               status:'success',
               msg:'product created successfully',
               data: newProduct
           });
       }catch (err){
           return res.status(500).json({
               message: err.message
           })
       }
   },
   updateProduct: async (req, res) => {
       try{
           const { title, description, image, category, price } = req.body;
           const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
               title,
               description,
               image,
               category,
               price
           }, { new: true });
           if(!updatedProduct){
               return res.status(404).json({
                   status: 'fail',
                   message: 'Product not found'
               })
           }
           return res.status(200).json({
               status:'success',
               msg:'product updated successfully',
               data: updatedProduct
           });
       }catch (err){
           return res.status(500).json({
               message: err.message
           })
       }
   },
   deleteProduct: async (req, res) => {
       try{
           const deletedProduct = await Product.findByIdAndDelete(req.params.id);
           if(!deletedProduct){
               return res.status(404).json({
                   status: 'fail',
                   message: 'Product not found'
               })
           }
           return res.status(200).json({
               status:'success',
               msg:'product deleted successfully'
           });
       }catch (err){
           return res.status(500).json({
               message: err.message
           })
       }
   }
}


export default productController;
