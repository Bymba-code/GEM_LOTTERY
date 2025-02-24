const prisma = require("../../../Middlewares/prisma")

const INSERT_LOTTERY = async (req, res) => {
    try 
    {
        const {name, startDate, endDate , title, description } = req.body

        if(!name)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сугалааны нэрийг оруулна уу."
            })
        }
        if(!startDate)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сугалаа эхлэх огноог оруулна уу."
            })
        }
        if(!endDate)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сугалаа дуусах хугацааг оруулна уу."
            })
        }
        if(!title)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Тайлбарын гарчигийг оруулна уу."
            })
        }
        if(!description)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сугалааны тайлбарыг оруулна уу."
            })
        }

        const resultOne = await prisma.lottery.create({
            data: {
                name:name,
                start_date: new Date(startDate),
                end_date: new Date(endDate)
            }
        })

        const resultTwo = await prisma.lottery_description.create({
            data:{
                lottery:resultOne.id,
                title:title,
                description:description
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай."
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + err
        })
    }
}

module.exports = INSERT_LOTTERY