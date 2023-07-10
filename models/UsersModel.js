const db = require("./index")
const { DataTypes, Model } = require("sequelize");

class UsersModel extends Model { }
UsersModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ["id"]
        }
    ],
    sequelize: db.sequelize,
    modelName: 'users',
    freezeTableName: true,
    timestamps: true
});
module.exports = UsersModel;