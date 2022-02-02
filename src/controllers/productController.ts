
const productController = {
   getProducts: async (req, res) => {
       res.json({
           msg:'get all products'
       })
   },
   getProduct: async (req, res) => {
       console.log(req.params);
       res.json({
           msg:`get one product by id:${req.params.id}`
       })
   },
   createProduct: async (req, res) => {
       console.log(req.body);
       res.json({
           msg:'add new product'
       })
   },
   updateProduct: async (req, res) => {
       console.log(req.body);
       res.json({
           msg:`update product with id: ${req.params.id}`
       })
   },
   deleteProduct: async (req, res) => {
       console.log(req.params);
       res.json({
           msg:`delete product with id: ${req.params.id}`
       })
   }
}


export default productController;
