const express = require('express');
const router = express.Router();

let userBalance = 1000; 

router.post('/play', (req, res) => {
  const { betAmount } = req.body;

  if (betAmount > userBalance) {
    return res.status(400).json({ success: false, message: "Insufficient Balance" });
  }

  userBalance -= betAmount;
  const crashPoint = (Math.random() * (15 - 1.01) + 1.01).toFixed(2);

  res.json({
    success: true,
    crashPoint: parseFloat(crashPoint),
    remainingBalance: userBalance
  });
});

router.post('/cashout', (req, res) => {
  const { betAmount, multiplier } = req.body;
  
  const winAmount = betAmount * multiplier;
  userBalance += winAmount;

  res.json({
    success: true,
    winAmount: winAmount.toFixed(2),
    updatedBalance: userBalance
  });
});

module.exports = router;
