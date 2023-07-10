const db = require("./index")
const { DataTypes, Model } = require("sequelize");

class CarCommentsModel extends Model { }
CarCommentsModel.init({
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
    car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "cars",
            key: "id"
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ["id"]
        },
        {
            unique: false,
            fields: ["user_id", "car_id"]
        }
    ],
    sequelize: db.sequelize,
    modelName: 'car_comments',
    freezeTableName: true,
    timestamps: true
});
module.exports = CarCommentsModel;