const userModel = require('../models/user.model');

module.exports = {

    async index(req, res) {
        const user = await userModel.find();
        res.json(user);
    },

    async create(req, res) {
        const { user_name, user_email, user_type, user_password } = req.body;
        let data = {};
        let user = await userModel.findOne({ user_email });

        if (!user) {
            data = { user_name, user_email, user_type, user_password };
            user = await userModel.create(data);
            return res.status(200).json(user);
        } else {
            return res.status(500).json(user);
        }
    },

    async details(req, res) {
        const { _id } = req.params;
        const user = await userModel.findOne({ _id });
        return res.json(user);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const user = await userModel.findByIdAndDelete({ _id });
        return res.json(user);
    },
    
    async update(req, res) {
        const { _id, user_name, user_email, user_password, user_type } = req.body;
        const data = { user_name, user_email, user_password, user_type };
        const user = await userModel.findOneAndUpdate({ _id }, data, { new: true });
        return res.json(user);
    }
};