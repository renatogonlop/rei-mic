const productModel = require('../models/product.model');

module.exports = {
    async index(req, res) {
        const product = await productModel.find();
        res.json(product);
    },
    async create(req, res) {
        const { product_name, product_brand, product_reference, product_description, product_price, product_quantity, product_class, product_image} = req.body;
        let data = {};
        let product = await productModel.findOne({ product_reference });

        if (!product) {
            data = { product_name, product_brand, product_reference, product_description, product_price, product_quantity, product_class, product_image};
            product = await productModel.create(data);
            return res.status(200).json(product);
        } else {
            return res.status(500).json(product);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const product = await productModel.findOne({ _id });
        return res.json(product);
    },
    async delete(req, res) {
        const { _id } = req.params;
        const product = await productModel.findByIdAndDelete({ _id });
        return res.json(product);
    },
    async update(req, res) {
        const { _id, product_name, product_brand, product_reference, product_description, product_price, product_quantity, product_class, product_image} = req.body;
        const data = { product_name, product_brand, product_reference, product_description, product_price, product_quantity, product_class, product_image};
        const product = await productModel.findOneAndUpdate({ _id }, data, { new: true });
        return res.json(product);
    }
};