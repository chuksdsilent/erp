require('dotenv').config()
const express = require('express');
const connectMysqlDB = require("./config/dbconnection")
const app = express();
// connect database
// const connectDB = require("./config/db")

// Init Middleware
app.use(express.json({ extended: false }));
// connectDB();

// Define Routes
app.use("/api/managers", require('./routes/managers'));
app.use("/api/auth", require('./routes/auth'));

app.use("/api/branches", require('./routes/branches'));
app.use("/api/employee-auth", require('./routes/employeeAuth'));
app.use("/api/employees", require('./routes/employees'));
app.use("/api/companies", require('./routes/companies'));
app.use("/api/item-groups", require('./routes/itemgroup'));
app.use("/api/item-kits", require('./routes/itemkits'));
app.use("/api/items", require('./routes/items'));
app.use("/api/stock-location", require('./routes/stocklocation'));
app.use("/api/stock-count", require('./routes/stockcount'));
app.use("/api/stock-transfer-inward", require('./routes/stocktransferinward'));
app.use("/api/stock-transfer-outward", require('./routes/stocktransferoutward'));
app.use("/api/stock-adjustment", require('./routes/stockadjustment'));
app.use("/api/procurement", require('./routes/career'));
app.use("/api/purchase-order", require('./routes/purchaseorder'));
app.use("/api/suppliers", require('./routes/suppliers'));
app.use("/api/purchase-requistion", require('./routes/purchaserequisition'));
app.use("/api/purchase-invoice", require('./routes/purchaseinvoice'));
app.use("/api/payment-receipt", require('./routes/paymentreceipt'));
app.use("/api/purchase-return", require('./routes/purchasereturn'));
app.use("/api/contacts", require('./routes/contacts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

