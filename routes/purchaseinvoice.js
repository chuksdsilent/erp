const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');

const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const PurchaseInvoice = require('../models/PurchaseInvoice');

// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const purchaseInvoice = await PurchaseInvoice.find({}).sort({ date: -1 });
        res.json(purchaseInvoice)
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
        "batchNo", "Batch No is required"
    )
        .not()
        .isEmpty(),
    check(
        "requestedQty", "Requested Quantity By is required"
    )
        .not()
        .isEmpty(),
    check(
        "receivedQty", "Received Qty is required"
    )
        .not()
        .isEmpty(),
    check(
        "confirmedBy", "Confirmed By Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseOrder", "Purchase Order is required"
    )
        .not()
        .isEmpty(),
    check(
        "tax", "Tax Terms is required"
    )
        .not()
        .isEmpty(),
    check(
        "validTill", "Expiration Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierName", "Supplier Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "billingAddress", "Billing Address is required"
    )
        .not()
        .isEmpty(),
    check(
        "paymentDueDate", "Payment Due Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "charges", "Charges Due Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "purpose", "Purpose Due Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "paymentType", "Payment Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "currency", "Currency Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "shipmentType", "Shipment Type Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "shipmentTerms", "Shipment Terms Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "itemDetails", "Item Details is required"
    )
        .not()
        .isEmpty(),

    check(
        "headerCharges", "header Charges is required"
    )
        .not()
        .isEmpty(),

],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const code = nanoid(10);

        const {
            batchNo,
            requestedQty,
            receivedQty,
            confirmedBy,
            purchaseOrder,
            tax,
            validTill,
            supplierName,
            billingAddress,
            paymentDueDate,
            charges,
            headerCharges,
            purpose,
            paymentType,
            currency,
            shipmentType,
            shipmentTerms,
            itemDetails,

        } = req.body;

        try {

            let purchaseInvoice = new PurchaseInvoice({
                headerCharges,
                itemDetails,
                batchNo,
                requestedQty,
                receivedQty,
                confirmedBy,
                purchaseOrder,
                tax,
                validTill,
                supplierName,
                billingAddress,
                paymentDueDate,
                charges,
                headerCharges,
                purpose,
                paymentType,
                currency,
                shipmentType,
                shipmentTerms
            })

            const newPurchaseInvoice = await purchaseInvoice.save();
            res.send(newPurchaseInvoice);

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
        batchNo,
        requestedQty,
        receivedQty,
        confirmedBy,
        purchaseOrder,
        tax,
        validTill,
        supplierName,
        billingAddress,
        paymentDueDate,
        charges,
        headerCharges,
        purpose,
        paymentType,
        currency,
        shipmentType,
        shipmentTerms,
        itemDetails
    } = req.body;

    const fields = {};

    if (batchNo) fields.batchNo = batchNo;
    if (requestedQty) fields.requestedQty = requestedQty;
    if (receivedQty) fields.receivedQty = receivedQty;
    if (confirmedBy) fields.confirmedBy = confirmedBy;
    if (purchaseOrder) fields.purchaseOrder = purchaseOrder;
    if (validTill) fields.validTill = validTill;
    if (billingAddress) fields.billingAddress = billingAddress;
    if (paymentDueDate) fields.paymentDueDate = paymentDueDate;
    if (charges) fields.charges = charges;
    if (purpose) fields.purpose = purpose;
    if (paymentType) fields.paymentType = paymentType;
    if (currency) fields.currency = currency;
    if (shipmentTerms) fields.shipmentTerms = shipmentTerms;
    if (shipmentType) fields.shipmentType = shipmentType;
    if (itemDetails) fields.itemDetails = itemDetails;
    if (supplierName) fields.supplierName = supplierName;
    if (headerCharges) fields.headerCharges = headerCharges;

    try {

        newPurchaseInvoice = await PurchaseInvoice.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newPurchaseInvoice)
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