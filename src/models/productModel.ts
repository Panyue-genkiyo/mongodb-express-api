import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

productSchema.index({
    title: 'text',
});

const Product = mongoose.model("Product", productSchema);

//创建索引
Product.createIndexes({
    title: 'text',
})

export default Product;
