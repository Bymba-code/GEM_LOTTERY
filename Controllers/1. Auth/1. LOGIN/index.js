const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const LOGIN = async (req, res) => {
    try 
    {
        const {phone, password} = req.body;

        if(!phone)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Утасны дугаараа оруулна уу."
            })
        }
        
        if(!password)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нууц үг оруулна уу."
            })
        }

        const userCheck = await prisma.users.findMany({
            where: {
                phone:phone
            }
        })

        const user = userCheck[0]

        if(!user)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн бүртгэл олдсонгүй."
            })
        }

        console.log(phone)

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
        {
            return res.status(401).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн нууц үг буруу байна."
            })
        }

        const token = jwt.sign(
            {id: user.id, phone: user.phone},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        return res.status(200).json({
            success:true,
            data:token,
            message: "Амжилттай нэвтэрлээ."
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

module.exports = LOGIN