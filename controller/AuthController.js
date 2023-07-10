require('dotenv').config();
const logger = require("../helper/logger")
const UsersModel = require("../models/UsersModel")
const passwordHelper = require("../helper/passwordHelper")
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res, next) => {
    try {
        const { phone, password } = req.body
        const user = await UsersModel.findOne({
            where: {
                phone
            },
        })

        const resInvalidUser = {
            status: false,
            result: [],
            message: "Wrong phone number or password"
        }
        if (!user) {
            logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:401, res: ${JSON.stringify(resInvalidUser)}`)
            return res.status(401).json(resInvalidUser)
        }

        const passwordCheck = await passwordHelper.comparePassword(password, user.password)
        if (!passwordCheck) {
            logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:401, res: ${JSON.stringify(resInvalidUser)}`)
            return res.status(401).json(resInvalidUser)
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' })

        const resData = {
            status: true,
            result: { token: token },
            message: "Successfully login"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(200).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}

module.exports.register = async (req, res, next) => {
    try {
        const { name, phone, password } = req.body
        const passwordHash = await passwordHelper.encryptPassword(password)
        await UsersModel.create({
            name,
            phone,
            password: passwordHash
        })
        const resData = {
            status: true,
            result: req.body,
            message: "Successfully regiter"
        }
        logger.info(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.body)}, status:200, res: ${JSON.stringify(resData)}`)
        return res.status(201).json(resData)
    } catch (error) {
        logger.error(`(${req.method}) url: ${req.originalUrl}, req: ${JSON.stringify(req.params)} Error: ${error}}`)
        return next(error)
    }
}