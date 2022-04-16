//引进model
import Product from "../models/productModel";
import { APIfeatures } from "../lib/features";

const productController = {
    getProducts: async (req, res) => {
        try {
            console.log(req.query); //查询参数 query
            const features = new APIfeatures(Product.find(), req.query)
                .paginating()
                .sorting()
                .searching()
                .filtering();
            const result = await Promise.allSettled([
                features.query,
                Product.countDocuments()
            ])
            console.log(result);
            const products = result[0].status === "fulfilled" ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            return res.status(200).json({
                status: 'success',
                data:{
                    products,
                    count
                },
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    },
    getProduct: async (req, res) => {
        console.log(req.params);
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Product not found'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: product
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    },
    createProduct: async (req, res) => {
        try {
            const {title, description, image, category, price} = req.body;
            const newProduct = new Product({
                title,
                description,
                image,
                category,
                price
            });
            await newProduct.save();
            return res.status(200).json({
                status: 'success',
                msg: 'product created successfully',
                data: newProduct
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message
            })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {title, description, image, category, price} = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                title,
                description,
                image,
                category,
                price
            }, {new: true});
            if (!updatedProduct) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Product not found'
                })
            }
            return res.status(200).json({
                status: 'success',
                msg: 'product updated successfully',
                data: updatedProduct
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Product not found'
                })
            }
            return res.status(200).json({
                status: 'success',
                msg: 'product deleted successfully'
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}


export default productController;
