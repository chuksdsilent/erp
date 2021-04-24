const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const PurchaseOrder = require('../models/PurchaseOrder');
const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const Procurement = require('../models/Procurement');

// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.find({}).sort({ date: -1 });
        res.json(purchaseOrder)
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
        "itemDetails", "Item Details is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseManager", "Purchase Manager By is required"
    )
        .not()
        .isEmpty(),
    check(
        "purpose", "Purpose is required"
    )
        .not()
        .isEmpty(),
    check(
        "requiredDate", "Required Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "requisitionOrder", "Requisition Order is required"
    )
        .not()
        .isEmpty(),
    check(
        "shipmentTerms", "Shipment Terms is required"
    )
        .not()
        .isEmpty(),
    check(
        "shipmentType", "Shipment Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierAddress", "Supplier Address is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierName", "Supplier Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "tax", "tax is required"
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
            charges,
            createdAt,
            headerCharges,
            itemDetails,
            purchaseManager,
            purpose,
            requiredDate,
            requisitionOrder,
            shipmentTerms,
            shipmentType,
            supplierAddress,
            supplierName,
            tax

        } = req.body;

        try {

            let purchaseOrder = new PurchaseOrder({
                charges,
                code,
                headerCharges,
                itemDetails,
                purchaseManager,
                purpose,
                requiredDate,
                requisitionOrder,
                shipmentTerms,
                shipmentType,
                supplierAddress,
                supplierName,
                tax

            })

            const newPurchaseOrder = await purchaseOrder.save();
            res.send(newPurchaseOrder);

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
        charges,
        headerCharges,
        itemDetails,
        purchaseManager,
        purpose,
        requiredDate,
        requisitionOrder,
        shipmentTerms,
        shipmentType,
        supplierAddress,
        supplierName,
        tax

    } = req.body;

    const fields = {};

    if (charges) fields.charges = charges;
    if (headerCharges) fields.headerCharges = headerCharges;
    if (itemDetails) fields.itemDetails = itemDetails;
    if (purchaseManager) fields.purchaseManager = purchaseManager;
    if (purpose) fields.purpose = purpose;
    if (requiredDate) fields.requiredDate = requiredDate;
    if (requisitionOrder) fields.requisitionOrder = requisitionOrder;
    if (shipmentTerms) fields.shipmentTerms = shipmentTerms;
    if (shipmentType) fields.shipmentType = shipmentType;
    if (supplierAddress) fields.supplierAddress = supplierAddress;
    if (supplierName) fields.supplierName = supplierName;
    if (tax) fields.tax = tax;

    try {

        newPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newPurchaseOrder)
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