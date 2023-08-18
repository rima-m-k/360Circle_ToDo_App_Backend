const express = require("express"); 
const { login, signup, addTodo, fetchTodo, removeTodo,updateTodo, sendEmail, checkOTP,changePassword } = require("../controller/authController");
const { authenticate } = require("../middlewares/authenticate");
const router = express.Router();


router.route('/').post(login)
router.route('/signup').post(signup)
router.route('/to-do').post(authenticate,addTodo).get(authenticate,fetchTodo).patch(authenticate,updateTodo)
router.route('/delete-to-do/:id').delete(authenticate,removeTodo)
router.route('/forgot-password').post(sendEmail).put(checkOTP).patch(changePassword)

module.exports = router