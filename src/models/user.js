const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        age: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_access: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }

    User.beforeCreate(async (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
}