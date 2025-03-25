const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');

// Initialize App
dotenv.config();
const app = express();
const port = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generate a consistent secret key (store it securely in .env for production)
const secretKey = crypto.randomBytes(32).toString('hex');

// MongoDB Connection
const mongoURI = process.env.MONGODB_URL;

mongoose.set('strictQuery', false); // Optional, suppresses query filter warnings

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connection successful!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Session Middleware
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI }),
}));

// Import Routes
const fertilizerRouter = require('./routes/udana/fertilizers.js');
const dealerRouter = require('./routes/udana/dealers.js');
const farmerFeedbackRoutes = require("./routes/thamuditha/farmerfeedbacks.js");
const farmerReportRoutes = require("./routes/thamuditha/farmerReports.js");
const farmerRouter = require("./routes/vinuka/farmers.js");
const soilTestRouter = require("./routes/vinuka/soilTests.js");
const pdfRouter = require("./routes/vinuka/PDFRoutes.js");
const topFertilizer = require("./routes/kande/TopFertilizerRoutes.js");
const topSellingSchema = require("./routes/kande/TopSellingRoutes.js");
const topAreasSchema = require("./routes/kande/TopAreasRoutes.js");
const userSchema = require("./routes/kande/managerloginRoutes.js");
const adminRoutes = require('./routes/kande/admin.js');
const labRouter = require("./routes/vinuka/labAccounts.js");
const itemRouter = require('./routes/udana/ItemR');
const orderRouter = require('./routes/udana/OrderR');
const labSlotRouter = require("./routes/vinuka/labSlots.js");
const testRequestRouter = require("./routes/vinuka/testRequests.js");
const dealerRoutes = require('./routes/thamuditha/dealer.routes');
const farmerRoutes = require('./routes/thamuditha/farmer.routes');
const labsRouter = require('./routes/thamuditha/labs.js');
const dealerReportRouter = require('./routes/thamuditha/dealersReport.js');
const replyRoutes = require('./routes/thamuditha/reply.js');
const farmerReport = require('./routes/thamuditha/farmerReport.js');
const countDealer = require('./routes/thamuditha/countCealer.js');
const inquiryCount = require('./routes/thamuditha/inquiryCount.js');
const profileRoutes = require('./routes/thamuditha/Profile.js');
const labReportRouter = require("./routes/vinuka/labReports.js");
const articleRoutes = require('./routes/kande/articleRoutes.js');

// Use Routes
app.use('/fertilizer', fertilizerRouter);
app.use('/dealer', dealerRouter);
app.use("/api/feedbacks", farmerFeedbackRoutes);
app.use("/api/reports/", farmerReportRoutes);
app.use("/Farmer", farmerRouter);
app.use("/SoilTest", soilTestRouter);
app.use('/pdfRouter', pdfRouter);
app.use("/topfertilizercategory", topFertilizer);
app.use("/topdealer", topSellingSchema);
app.use("/toparea", topAreasSchema);
app.use(userSchema);
app.use('/api/admin', adminRoutes);
app.use("/labAccount", labRouter);
app.use('/item', itemRouter);
app.use('/order', orderRouter);
app.use("/labSlot", labSlotRouter);
app.use("/testRequest", testRequestRouter);
app.use(dealerRoutes);
app.use(farmerRoutes);
app.use('/labs', labsRouter);
app.use("/farmerReport", dealerReportRouter);
app.use('/replies', replyRoutes);
app.use("/farmerReport", farmerReport);
app.use('/admin', adminRoutes);
app.use(countDealer);
app.use(inquiryCount);
app.use('/api/profile', profileRoutes);
app.use('/api/auth', adminRoutes);
app.use("/labReport", labReportRouter);
app.use('/api/articles', articleRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
