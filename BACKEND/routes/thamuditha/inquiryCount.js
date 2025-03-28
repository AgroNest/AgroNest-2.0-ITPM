const express = require('express');
const FarmerReport = require('../../models/thamuditha/farmerReport'); 
const router = express.Router();


router.get('/countPendingFarmerReports', async (req, res) => {
  try {
    const count = await FarmerReport.countDocuments({ status: 'Pending' });
    res.json({ count });
  } catch (error) {
    console.error("Error counting pending farmer reports:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
