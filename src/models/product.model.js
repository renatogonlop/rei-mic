const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
    {
        product_name: String,
        product_brand: String,
        product_reference: String,
        product_description: String,
        product_price: Number,
        product_quantity: { type: Number, default: 0 },
        product_image: { type: String, default: "null" },
        product_class: String,

    },
    {
        timestamps: true
    }
);

const products = mongoose.model('Products', DataSchema);
module.exports = products;