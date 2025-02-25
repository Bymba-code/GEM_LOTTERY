const prisma = require("../../../Middlewares/prisma")

const GET_ALL_LOTTERY_USERS = async (req, res) => {
    try 
    {
        const {id} = req.params
        const lottries = await prisma.lottery_users.findMany({
            where: {
                lottery: parseInt(id)
            }
        })
        
        return res.status(200).json({
            success:true,
            data:lottries,
            message: "Амжилттай"
        })
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + err
        })
    }
}

module.exports = GET_ALL_LOTTERY_USERS
