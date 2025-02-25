const express = require("express")
const INSERT_LOTTERY_USERS = require("../../Controllers/3. UserLotteryController/3. POST")

const router = express.Router()

router.route("/lottery/user").post(INSERT_LOTTERY_USERS)

module.exports = router