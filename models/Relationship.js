const UsersModel = require("./UsersModel")
const CarsModel = require("./CarsModel")
const CarCommentsModel = require("./CarCommentsModel")

module.exports = () => {
    UsersModel.hasMany(CarsModel, {
        foreignKey: "user_id",
        sourceKey: "id",
        as: "cars",
        onDelete: "CASCADE"

    })

    CarsModel.belongsTo(UsersModel, {
        sourceKey: "id",
        foreignKey: "user_id",
        as: "users"
    })
    CarsModel.hasMany(CarCommentsModel, {
        sourceKey: "id",
        foreignKey: "car_id",
        as: "car_comments"
    })

    CarCommentsModel.hasOne(UsersModel, {
        sourceKey: "user_id",
        foreignKey: "id",
        as: "users"
    })


}