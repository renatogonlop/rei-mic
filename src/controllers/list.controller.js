const listModel = require('../models/list.model');

module.exports = {
    async index(req, res) {
        const list = await listModel.find();
        res.json(list);
    },

    async create(req, res) {
        const { list_id, list_name, list_brand, list_reference, list_price, list_quantity, list_class} = req.body;
        let data = {};
        let list = await listModel.findOne({ list_reference });

        if (!list) {
            data = { list_id, list_name, list_brand, list_reference, list_price, list_quantity, list_class};
            list = await listModel.create(data);
            return res.status(200).json(list);
        } else {
            return res.status(500).json(list);
        }
    },

    async details(req, res) {
        const { _id } = req.params;
        const list = await listModel.findOne({ _id });
        return res.json(list);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const list = await listModel.findByIdAndDelete({ _id });
        return res.json(list);
    },
    
    async update(req, res) {
        const { list_id, list_name, list_brand, list_reference, list_price, list_quantity, list_class} = req.body;
        const data = { list_id, list_name, list_brand, list_reference, list_price, list_quantity, list_class};
        const list = await listModel.findOneAndUpdate({ _id }, data, { new: true });
        return res.json(list);
    }
};