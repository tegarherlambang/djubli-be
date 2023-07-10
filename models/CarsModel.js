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
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    car_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    promotion_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    is_promotion_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    car_picture: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ["id"]
        },
        {
            unique: false,
            fields: ["user_id"]
        }
    ],
    sequelize: db.sequelize,
    modelName: 'cars',
    freezeTableName: true,
    timestamps: true
});
module.exports = UsersModel;