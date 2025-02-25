const prisma = require("../../../Middlewares/prisma");

const UPDATE_USER_LOTTERY = async (req, res) => {
    try {
        const { id } = req.params;  

        const updatedLotteryUser = await prisma.lottery_users.update({
            where: {
                id: parseInt(id), 
            },
            data: {
                isCorrect: 1,
            },
        });

        return res.status(200).json({
            success: true,
            data: updatedLotteryUser,
            message: "Амжилттай.",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err,
        });
    }
};

module.exports = UPDATE_USER_LOTTERY;
