const { Signup, Login } = require('../Controllers/AuthController')
const  AuthMiddleware = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/', AuthMiddleware.userVerification)

module.exports = router