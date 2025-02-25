const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")

const REGISTER = async (req, res) => {
    try 
    {
        const {firstName, lastName, phone,email,password, role} = req.body;

        if(!firstName)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Овог нэр оруулна уу."
            })
        }

        if(!lastName)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өөрийн нэрийг оруулна уу."
            })
        }

        if(!phone)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Утасны дугаараа оруулна уу."
            })
        }
        
        if(!email)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "И-Мейл хаягийг оруулна уу."
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

        if(!role)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн эрхийг оруулна уу"
            })
        }

        const userCheck = await prisma.users.findMany({
            where:{
                phone:phone,
            }
        })

        const user = userCheck[0]

        if(user)
        {
            return res.status(409).json({
                success:false,
                data:[],
                message: "Утасний дугаар бүртгэгдсэн байна."
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await prisma.users.create({
            data: {
                firstname: firstName,
                lastname:lastName,
                phone:phone,
                email:email,
                password:hashedPassword,
                role:role,
                date: new Date()
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Хэрэглэгчийн бүртгэлийг амжилттай нэмлээ."
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

module.exports = REGISTER