const express = require("express")
const INSERT_LOTTERY_USERS = require("../../Controllers/3. UserLotteryController/3. POST")
const GET_ALL_LOTTERY_USERS = require("../../Controllers/3. UserLotteryController/1. GET_ALL")
const UPDATE_USER_LOTTERY = require("../../Controllers/3. UserLotteryController/4. UPDATE")

const router = express.Router()

router.route("/lottery/user")
.post(INSERT_LOTTERY_USERS)

router.route("/lottery/users/:id").get(GET_ALL_LOTTERY_USERS).put(UPDATE_USER_LOTTERY)

module.exports = router
