const prisma = require("../../../Middlewares/prisma")

const GET_ALL_LOTTERY = async (req, res) => {
    try 
    {
        const lottery = await prisma.lottery.findMany({
            include:{
                lottery_description_lottery_description_lotteryTolottery:true,
                lottery_users_lottery_users_lotteryTolottery:true,
                lottery_winners_lottery_winners_lotteryTolottery:true
            }
        })

        return res.status(200).json({
            success:true,
            data:lottery,
            message: "Амжилттай"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа."
        })
    }
}

module.exports = GET_ALL_LOTTERY
