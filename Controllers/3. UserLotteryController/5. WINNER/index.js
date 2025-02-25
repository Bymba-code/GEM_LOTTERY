const prisma = require("../../../Middlewares/prisma");

const GET_RANDOM_USER_FROM_LOTTERY = async (req, res) => {
  try {
    const { id } = req.params; 

    const randomUser = await prisma.$queryRaw`
    SELECT lottery_users.*, users.*
    FROM lottery_users 
    LEFT JOIN users ON lottery_users.user = users.id
    WHERE lottery_users.lottery = ${id}
    ORDER BY RAND()
    LIMIT 1;
  `;

    if (randomUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for this lottery."
      });
    }


    const resultTwo = await prisma.lottery_winners.create({
        data: {
            lottery: parseInt(id),
            user: parseInt(randomUser[0].user)
        }
    })



    return res.status(200).json({
      success: true,
      data: randomUser[0], 
      message: "Random user fetched successfully."
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Server error: " + err
    });
  }
};

module.exports = GET_RANDOM_USER_FROM_LOTTERY;
