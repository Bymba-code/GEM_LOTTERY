const express = require("express")
const LOGIN = require("../../Controllers/1. Auth/1. LOGIN")
const REGISTER = require("../../Controllers/1. Auth/2. REGISTER")


const router = express.Router()

router.route("/auth/login").post(LOGIN)

router.route("/auth/register").post(REGISTER)



module.exports = router