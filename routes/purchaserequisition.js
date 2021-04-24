const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const PurchaseOrder = require('../models/PurchaseOrder');
const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const PurchaseRequisition = require('../models/PurchaseRequisition');

// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const purchaseRequisition = await PurchaseRequisition.find({}).sort({ date: -1 });
        res.json(purchaseRequisition)
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
        "confirmedBy", "confirmed By is required"
    )
        .not()
        .isEmpty(),

    check(
        "itemDetails", "Item Details is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseManager", "Purchase Manager is required"
    )
        .not()
        .isEmpty(),
    check(
        "requisitionDate", "Requistion Date By is required"
    )
        .not()
        .isEmpty(),
    check(
        "tax", "tax is required"
    )
        .not()
        .isEmpty(),
    check(
        "validTill", "Valid Till  is required"
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
            confirmedBy,
            createdAt,
            itemDetails,
            purchaseManager,
            requisitionDate,
            tax,
            validTill
        } = req.body;

        try {

            let purchaseRequisition = PurchaseRequisition({
                code,
                confirmedBy,
                createdAt,
                itemDetails,
                purchaseManager,
                requisitionDate,
                tax,
                validTill
            })

            const newPurchaseRequisition = await purchaseRequisition.save();
            res.send(newPurchaseRequisition);

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
        confirmedBy,
        createdAt,
        itemDetails,
        purchaseManager,
        requisitionDate,
        tax,
        validTill

    } = req.body;

    const fields = {};

    if (confirmedBy) fields.confirmedBy = confirmedBy;
    if (itemDetails) fields.itemDetails = itemDetails;
    if (purchaseManager) fields.purchaseManager = purchaseManager;
    if (requisitionDate) fields.requisitionDate = requisitionDate;
    if (tax) fields.tax = tax;
    if (validTill) fields.validTill = validTill;
    try {

        newPurchaseRequisition = await PurchaseRequisition.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newPurchaseRequisition)
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