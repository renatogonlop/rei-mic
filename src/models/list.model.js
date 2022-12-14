const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
    {
        list_id: String,
        list_name: String,
        list_brand: String,
        list_reference: String,
        list_price: Number,
        list_totalPrice: Number,
        list_quantity: { type: Number, default: 1 },
        list_class: String,
    },
    {
        timestamps: true
    }
);

const list = mongoose.model('List', DataSchema);
module.exports = list;