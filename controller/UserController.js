const logger = require("../helper/logger")
const UsersModel = require("../models/UsersModel")
const passwordHelper = require("../helper/passwordHelper")

module.exports.update = async (req, res, next) => {
    try {
        const { phone, name } = req.body
        await UsersModel.update({
            phone, name
        }, {
            where: {
                id: req.user.id
            },
        })
        const resData = {
            status: true,
            result: req.body,
            message: "Successfully update"
        }
        logger.info(`(PUT) url: /user, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.detail = async (req, res, next) => {
    try {
        await UsersModel.findOne({
            where: {
                id: req.user.id
            },
        })
        const resData = {
            status: true,
            result: req.body,
            message: "Detail data"
        }
        logger.info(`(get) url: /user/detail, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.changePassword = async (req, res, next) => {
    try {
        const { password, old_password } = req.body
        const user = await UsersModel.findOne({
            where: {
                id: req.user.id
            },
            attributes: ["password"]
        })
        if (!user) {
            const resValidate = {
                status: false,
                result: [],
                message: "Data not found"
            }
            logger.info(`(PUT) url: /user, req:/change-password ${JSON.stringify(req.body)}, status:404, res: ${JSON.stringify(resValidate)}`)
            return res.status(404).json(resValidate)
        }
        const passwordCheck = await passwordHelper.comparePassword(old_password, user.password)
        console.log(passwordCheck);
        if (!passwordCheck) {
            const resValidate = {
                status: false,
                result: [],
                message: "Wrong password"
            }
            logger.info(`(PUT) url: /user, req:/change-password ${JSON.stringify(req.body)}, status:400, res: ${JSON.stringify(resValidate)}`)
            return res.status(400).json(resValidate)
        }
        const hashPassword = await passwordHelper.encryptPassword(password)
        await UsersModel.update({
            password: hashPassword
        }, {
            where: {
                id: req.user.id
            }
        })
        const resData = {
            status: true,
            result: req.body,
            message: "chnage password success"
        }
        logger.info(`(get) url: /user/change-password, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}