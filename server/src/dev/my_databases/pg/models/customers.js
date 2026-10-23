const {DataTypes, Model} = require('sequelize');

class Customers extends Model {
    getFirstName() {
        return this.full_name.split(' ')[0];
    }
}

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'This email already exists',
        },
        validate: {
            notNull: {
                msg: 'Email is required.'
            },
            notEmpty: {
                msg: 'Email cannot be empty.'
            },
            isEmail: {
                msg: 'Please provide a valid email address.'
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 6,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            min: 9
        },
    }
};

const options = {
    createdAt: true,
    updatedAt: true,
    tableName: 'customers',
};

const getModel = (sequelize) => {
    if (!sequelize.models.Customers) {
        Customers.init(attributes, {...options, sequelize});
    }
    return sequelize.models.Customers;
};

module.exports = {
    class: Customers,
    attributes,
    options,
    getModel
}
