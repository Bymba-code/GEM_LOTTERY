const express = require("express")
const INSERT_LOTTERY_USERS = require("../../Controllers/3. UserLotteryController/3. POST")
const GET_ALL_LOTTERY_USERS = require("../../Controllers/3. UserLotteryController/1. GET_ALL")

const router = express.Router()

router.route("/lottery/user")
.post(INSERT_LOTTERY_USERS)

router.route("/lottery/users/:id").get(GET_ALL_LOTTERY_USERS)

module.exports = router
