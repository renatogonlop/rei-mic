const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema(
    {
        user_name: String,
        user_email: String,
        user_type: { type: Number, default: 2 },
        user_password: String
    },
    {
        timestamps: true
    }
);

DataSchema.pre('save', function (next) {
    if (!this.isModified('user_password')) {
        return next();
    }
    this.user_password = bcrypt.hashSync(this.user_password, 10);
    next();
});

DataSchema.pre('findOneAndUpdate', function (next) {
    let password = this.getUpdate().user_password + '';
    if (password.length < 55) {
        this.getUpdate().user_password = bcrypt.hashSync(password, 10);
    }
    next();
});

const user = mongoose.model('Users', DataSchema);
module.exports = user;