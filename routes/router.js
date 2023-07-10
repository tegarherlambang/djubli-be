const express = require('express')
const router = express.Router()
const tokenMiddleware = require('./../middleware/tokenMiddleware')
const { upload } = require('./../middleware/uploadMiddleware')

// ============================ Controller ============================
const AuthController = require('../controller/AuthController')
const UserController = require('../controller/UserController')
const CarController = require('../controller/CarController')
// ============================ End of controller ============================

// ============================ Router ============================
// Auth Route
router.post("/auth/login", AuthController.login)
router.post("/auth/register", AuthController.register)

// User Route
router.put("/user", tokenMiddleware.verifyToken, UserController.update)
router.get("/user/detail", tokenMiddleware.verifyToken, UserController.detail)
router.put("/user/change-password", tokenMiddleware.verifyToken, UserController.changePassword)

// Car Route
router.post("/car", [upload.uploadImage.single('file'), tokenMiddleware.verifyToken], CarController.create)
router.put("/car", [upload.uploadImage.single('file'), tokenMiddleware.verifyToken], CarController.update)
router.delete("/car/:id", tokenMiddleware.verifyToken, CarController.delete)
router.get("/car/by-user-id", tokenMiddleware.verifyToken, CarController.getByUserId)
router.get("/car", tokenMiddleware.verifyToken, CarController.get)
router.get("/car/:id/detail", tokenMiddleware.verifyToken, CarController.detail)
router.post("/car/comment", tokenMiddleware.verifyToken, CarController.commentOnCar)
// ============================ End of router ============================
module.exports = router