const multer = require('multer');
const path = require('path');
const prisma = require("../../../Middlewares/prisma"); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
}).single('image'); 

const INSERT_LOTTERY = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: [],
                    message: err.message 
                });
            }

            const { name, startDate, endDate, title, description } = req.body;

            if (!name) {
                return res.status(403).json({
                    success: false,
                    data: [],
                    message: "Сугалааны нэрийг оруулна уу."
                });
            }
            if (!startDate) {
                return res.status(403).json({
                    success: false,
                    data: [],
                    message: "Сугалаа эхлэх огноог оруулна уу."
                });
            }
            if (!endDate) {
                return res.status(403).json({
                    success: false,
                    data: [],
                    message: "Сугалаа дуусах хугацааг оруулна уу."
                });
            }
            if (!title) {
                return res.status(403).json({
                    success: false,
                    data: [],
                    message: "Тайлбарын гарчигийг оруулна уу."
                });
            }
            if (!description) {
                return res.status(403).json({
                    success: false,
                    data: [],
                    message: "Сугалааны тайлбарыг оруулна уу."
                });
            }

            const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

            const resultOne = await prisma.lottery.create({
                data: {
                    name: name,
                    poster:imageUrl,
                    start_date: new Date(startDate),
                    end_date: new Date(endDate)
                }
            });

            const resultTwo = await prisma.lottery_description.create({
                data: {
                    lottery: resultOne.id,
                    title: title,
                    description: description,
                }
            });

            return res.status(200).json({
                success: true,
                data: [],
                message: "Амжилттай."
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err
        });
    }
};

module.exports = INSERT_LOTTERY;
