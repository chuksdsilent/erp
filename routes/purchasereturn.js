const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');

const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const PurchaseReturn = require('../models/PurchaseReturn');

// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const purchaseReturn = await PurchaseReturn.find({}).sort({ date: -1 });
        res.json(purchaseReturn)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  POST api/employees
// @desc    Register an employee
// @access  Public
router.post('/', [
    check(
        "charges", "Charges is required"
    )
        .not()
        .isEmpty(),


    check(
        "totalAmount", "Total Amount No is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierInvoice", "Supplier Invoice By is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseInvoice", "Purchse Invoice is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierInvoiceNo", "Supplier Invoice No is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplyDate", "Supplier Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseManager", "Purchase Manager is required"
    )
        .not()
        .isEmpty(),
    check(
        "charges", "Charges is required"
    )
        .not()
        .isEmpty(),
    check(
        "headerCharges", "Header Charges is required"
    )
        .not()
        .isEmpty(),
    check(
        "purpose", "Purpose is required"
    )
        .not()
        .isEmpty(),
    check(
        "paymentType", "Payment Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "accountDetails", "Account Details is required"
    )
        .not()
        .isEmpty(),
    check(
        "itemDetails", "Purpose Due Date is required"
    )
        .not()
        .isEmpty()

],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const code = nanoid(10);

        const {
            totalAmount,
            supplierInvoice,
            purchaseInvoice,
            supplierInvoiceNo,
            supplyDate,
            purchaseManager,
            supplierName,
            charges,
            headerCharges,
            purpose,
            paymentType,
            accountDetails,
            itemDetails
        } = req.body;

        try {

            let purchaseReturn = new PurchaseReturn({
                totalAmount,
                supplierInvoice,
                purchaseInvoice,
                supplierInvoiceNo,
                supplyDate,
                purchaseManager,
                supplierName,
                charges,
                headerCharges,
                purpose,
                paymentType,
                accountDetails,
                itemDetails
            })

            const newPurchaseReturn = await purchaseReturn.save();
            res.send(newPurchaseReturn);

        } catch (error) {
            res.send("Server Error");
            console.log(error.message);
        }
    });

// @router  PUT api/employees
// @desc    Update an employee
// @access  Public
router.put('/:id', async (req, res) => {

    const {
        totalAmount,
        supplierInvoice,
        purchaseInvoice,
        supplierInvoiceNo,
        supplyDate,
        purchaseManager,
        supplierName,
        charges,
        headerCharges,
        purpose,
        paymentType,
        accountDetails,
        itemDetails
    } = req.body;

    const fields = {};

    if (totalAmount) fields.totalAmount = totalAmount;
    if (supplierInvoice) fields.supplierInvoice = supplierInvoice;
    if (purchaseInvoice) fields.purchaseInvoice = purchaseInvoice;
    if (supplierInvoice) fields.supplierInvoice = supplierInvoice;
    if (supplierInvoiceNo) fields.supplierInvoiceNo = supplierInvoiceNo;
    if (supplyDate) fields.supplyDate = supplyDate;
    if (purchaseManager) fields.purchaseManager = purchaseManager;
    if (charges) fields.charges = charges;
    if (purpose) fields.purpose = purpose;
    if (paymentType) fields.paymentType = paymentType;
    if (accountDetails) fields.accountDetails = accountDetails;
    if (itemDetails) fields.itemDetails = itemDetails;
    if (supplierName) fields.supplierName = supplierName;
    if (headerCharges) fields.headerCharges = headerCharges;

    try {

        newPurchaseReturn = await PurchaseReturn.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newPurchaseReturn)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }

});

// @router  DELETE api/employees
// @desc    Delete an employee
// @access  Public
router.delete('/', (req, res) => {
    res.send("Register");
});

module.exports = router;