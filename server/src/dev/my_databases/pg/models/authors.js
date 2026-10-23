const {DataTypes, Model} = require('sequelize');

class Authors extends Model {
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
    nationality_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
};

const options = {
    createdAt: true,
    updatedAt: true,
    tableName: 'authors',
};

const getModel = (sequelize) => {
    if (!sequelize.models.Authors) {
        Authors.init(attributes, {...options, sequelize});
    }
    return sequelize.models.Authors;
};

module.exports = {
    class: Authors,
    attributes,
    options,
    getModel
}
