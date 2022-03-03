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

//在查找之前不让他显示createdAt和updatedAt和_id和__v字段
productSchema.pre(/^find/, function(next) {
    this.select({
        __v: false,
        createdAt: false,
        updatedAt: false,
        _id: false,
    });
    next();
});

const Product = mongoose.model("Product", productSchema);

//创建索引
Product.createIndexes({
    title: 'text',
})




export default Product;
