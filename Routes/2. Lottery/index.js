const express = require("express")
const GET_ALL_LOTTERY = require("../../Controllers/2. Lottery/1. GET_ALL")
const GET_SINGLE_LOTTERY = require("../../Controllers/2. Lottery/2. GET_SINGLE")
const INSERT_LOTTERY = require("../../Controllers/2. Lottery/3. POST/index")

const router = express.Router()

router.route("/lottery").get(GET_ALL_LOTTERY).post(INSERT_LOTTERY)

router.route("/lottery/:id").get(GET_SINGLE_LOTTERY)

module.exports = router