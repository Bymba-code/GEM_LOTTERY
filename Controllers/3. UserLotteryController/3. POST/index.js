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
}).fields([  
    { name: 'eBarimImage', maxCount: 1 },  
    { name: 'image', maxCount: 1 }  
]);

const INSERT_LOTTERY_USERS = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: [],
                    message: err.message 
                });
            }

            const { lotteryId, ebarimtDugaar} = req.body;



            const eBarimImageUrl = req.files && req.files['eBarimImage'] ? `/uploads/${req.files['eBarimImage'][0].filename}` : null;
            const imageUrl = req.files && req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;

            

            const resultOne = await prisma.lottery_users.create({
                data: {
                    user:3,
                    lottery:parseInt(lotteryId),
                    image:imageUrl,
                    ebarimt:eBarimImageUrl,
                    ebarimt_dugaar:ebarimtDugaar
                }
            });

            return res.status(200).json({
                success:true,
                data:[],
                message: "Амжилттай"
            })


        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err
        });
    }
};

module.exports = INSERT_LOTTERY_USERS;
