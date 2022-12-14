const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
    {
       ind_id: String,
       ind_name: String,
       ind_brand: String,
       ind_reference: String,
       ind_description: String,
       ind_price: Number,
       ind_quantity: { type: Number, default: 0 },
       ind_image: { type: String, default: "null" },
       ind_class: String,

    },
    {
        timestamps: true
    }
);

const Ind = mongoose.model('Ind', DataSchema);
module.exports = Ind;