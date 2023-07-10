const logger = require("../helper/logger")
const CarsModel = require("../models/CarsModel")
const CarCommentsModel = require("../models/CarCommentsModel")

module.exports.create = async (req, res, next) => {
    try {
        const { car_name, promotion_end_date, description, price, address, mileage } = req.body
        await CarsModel.create({
            user_id: req.user.id,
            car_name,
            promotion_end_date,
            description,
            price,
            address,
            mileage,
            car_picture: req.file.filename
        })
        const resData = {
            status: true,
            result: req.body,
            message: "Data created"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:201, res: ${JSON.stringify(resData)}`)
        return res.status(201).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const { id, car_name, promotion_end_date, description, price, address, mileage } = req.body
        let payload = {
            car_name,
            promotion_end_date,
            description,
            price,
            address,
            mileage,
        }
        if (req.file) payload = { ...payload, car_picture: req.file.filename }
        await CarsModel.update(payload, { where: { id } })
        const resData = {
            status: true,
            result: req.body,
            message: "Data updated"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params
        await CarsModel.destroy({ where: { id } })
        const resData = {
            status: true,
            result: req.params,
            message: "Data deleted"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.getByUserId = async (req, res, next) => {
    try {
        const { user_id } = req.query
        const cars = await CarsModel.findAll({
            where: { user_id },
            attributes: ["car_name", "promotion_end_date", "description", "price", "address", "mileage", "car_picture"],
            order: [["createdAt", "DESC"]]
        })
        const resData = {
            status: true,
            result: cars,
            message: "List cars"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.get = async (req, res, next) => {
    try {
        const cars = await CarsModel.findAll({
            attributes: ["car_name", "promotion_end_date", "description", "price", "address", "mileage", "car_picture"],
            order: [["createdAt", "DESC"]]
        })
        const resData = {
            status: true,
            result: cars,
            message: "List cars"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.detail = async (req, res, next) => {
    try {
        const { id } = req.params
        const cars = await CarsModel.findAll({
            where: { id },
            attributes: ["car_name", "promotion_end_date", "description", "price", "address", "mileage", "car_picture"],
            include: [{
                association: "car_comments",
                attributes: ["comment"],
                order: [["createdAt", "DESC"]],
                include: [{
                    association: "users",
                    attributes: ["name"]
                }]
            }],
            order: [["createdAt", "DESC"]]
        })
        const resData = {
            status: true,
            result: cars,
            message: "Detail cars"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.commentOnCar = async (req, res, next) => {
    try {
        const { car_id, comment } = req.body
        const data = await CarCommentsModel.create({
            comment,
            car_id,
            user_id: req.user.id
        })
        const resData = {
            status: true,
            result: req.body,
            message: "Detail cars"
        }
        global.io.emit("car-comment", data);
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}