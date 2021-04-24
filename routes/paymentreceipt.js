const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');

const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const PurchaseReceipt = require('../models/PaymentReceipt');

// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const purchaseReceipt = await PurchaseReceipt.find({}).sort({ date: -1 });
        res.json(purchaseReceipt)
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
        "access", "Access is required"
    )
        .not()
        .isEmpty(),


    check(
        "branch", "Banch No is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseInvoice", "Payment Invoice is required"
    )
        .not()
        .isEmpty(),
    check(
        "tax", "Tax Qty is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierName", "Supplier Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "billingAddress", "billingAddress is required"
    )
        .not()
        .isEmpty(),
    check(
        "charges", "Header Charges is required"
    )
        .not()
        .isEmpty(),
    check(
        "purpose", "Purpose is required"
    )
        .not()
        .isEmpty(),
    check(
        "paymentType", "Payment Type  is required"
    )
        .not()
        .isEmpty(),
    check(
        "billingAddress", "Billing Address is required"
    )
        .not()
        .isEmpty(),
    check(
        "currency", "Currency is required"
    )
        .not()
        .isEmpty(),
    check(
        "paidInto", "Account paid into is required"
    )
        .not()
        .isEmpty(),
    check(
        "amountPaid", "Amount Paid is required"
    )
        .not()
        .isEmpty(),
    check(
        "paymentType", "Payment Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "balance", "Balance is required"
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
            access,
            branch,
            purchaseInvoice,
            tax,
            supplierName,
            billingAddress,
            charges,
            headerCharges,
            purpose,
            paymentType,
            currency,
            paidInto,
            amountPaid,
            balance,
            itemDetails
        } = req.body;

        try {

            let purchaseReceipt = new PurchaseReceipt({
                access,
                branch,
                purchaseInvoice,
                tax,
                supplierName,
                billingAddress,
                charges,
                headerCharges,
                purpose,
                paymentType,
                currency,
                paidInto,
                amountPaid,
                balance,
                itemDetails
            })

            const newPurchaseReceipt = await purchaseReceipt.save();
            res.send(newPurchaseReceipt);

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
        access,
        branch,
        purchaseInvoice,
        tax,
        supplierName,
        billingAddress,
        charges,
        headerCharges,
        purpose,
        paymentType,
        currency,
        paidInto,
        amountPaid,
        balance,
        itemDetails
    } = req.body;


    const fields = {};

    if (access) fields.access = access;
    if (branch) fields.branch = branch;
    if (purchaseInvoice) fields.purchaseInvoice = purchaseInvoice;
    if (tax) fields.tax = tax;
    if (headerCharges) fields.headerCharges = headerCharges;
    if (billingAddress) fields.billingAddress = billingAddress;
    if (charges) fields.charges = charges;
    if (purpose) fields.purpose = purpose;
    if (paymentType) fields.paymentType = paymentType;
    if (currency) fields.currency = currency;
    if (paidInto) fields.paidInto = paidInto;
    if (amountPaid) fields.amountPaid = amountPaid;
    if (itemDetails) fields.itemDetails = itemDetails;
    if (supplierName) fields.supplierName = supplierName;
    if (balance) fields.balance = balance;

    try {

        newPurchaseReceipt = await PurchaseReceipt.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newPurchaseReceipt)
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