const indModel = require('../models/ind.model');

module.exports = {
    async index(req, res) {
        const ind = await indModel.find();
        res.json(ind);
    },
    async create(req, res) {
        const { ind_id, ind_name, ind_brand, ind_reference, ind_description, ind_price, ind_quantity, ind_class, ind_image } = req.body;
        let data = {};
        let ind = await indModel.findOne({ ind_reference });

        if (!ind) {
            data = { ind_id, ind_name, ind_brand, ind_reference, ind_description, ind_price, ind_quantity, ind_class, ind_image };
            ind = await indModel.create(data);
            return res.status(200).json(ind);
        } else {
            return res.status(500).json(ind);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const ind = await indModel.findById({ _id });
        return res.json(ind);
    },
    async delete(req, res) {
        const { _id } = req.params;
        const ind = await indModel.findByIdAndDelete({ _id });
        return res.json(ind);
    },
    async update(req, res) {
        const { _id, ind_id, ind_name, ind_brand, ind_reference, ind_description, ind_price, ind_quantity, ind_class, ind_image } = req.body;
        const data = { ind_id, ind_name, ind_brand, ind_reference, ind_description, ind_price, ind_quantity, ind_class, ind_image };
        const ind = await indModel.findByIdAndUpdate({ _id }, data, { new: true });
        return res.json(ind);
    }
};