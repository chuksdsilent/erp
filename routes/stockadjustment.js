const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const StockAdjustment = require('../models/StockAdjustment');
const { check, validationResult } = require('express-validator');


// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const stocAdjustmentt = await StockAdjustment.find({}).sort({ date: -1 });
        res.json(stocAdjustmentt)
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
        "department", "Location is required"
    )
        .not()
        .isEmpty(),
    check(
        "employee", "Employee is required"
    )
        .not()
        .isEmpty(),
    check(
        "remark", "Remark is required"
    )
        .not()
        .isEmpty(),
    check(
        "stockCount", "Stock Count is required"
    )
        .not()
        .isEmpty(),
    check(
        "confirmedBy", "Confirmed By is required"
    )
        .not()
        .isEmpty(),
    check(
        "itemDetails", "Item Details is required"
    )
        .not()
        .isEmpty(),
    check(
        "countInterval", "Count Interval is required"
    )
        .not()
        .isEmpty(),
],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { countInterval, department, employee, remark, stockCount, confirmedBy, itemDetails } = req.body;

        try {

            let stockAdjustment = new StockAdjustment({
                countInterval, department, employee, remark, stockCount, confirmedBy, itemDetails
            })

            const newStockAdjustment = await stockAdjustment.save();
            res.send(newStockAdjustment);

        } catch (error) {
            res.send("Server Error");
            console.log(error.message);
        }
    });

// @router  PUT api/employees
// @desc    Update an employee
// @access  Public
router.put('/:id', async (req, res) => {

    const { countInterval, department, employee, remark, stockCount, confirmedBy, itemDetails } = req.body;

    const stockAdjustmentFields = {};

    if (countInterval) stockAdjustmentFields.countInterval = countInterval;
    if (department) stockAdjustmentFields.department = department;
    if (employee) stockAdjustmentFields.employee = employee;
    if (remark) stockAdjustmentFields.remark = remark;
    if (stockCount) stockAdjustmentFields.stockCount = stockCount;
    if (confirmedBy) stockAdjustmentFields.confirmedBy = confirmedBy;
    if (itemDetails) stockAdjustmentFields.itemDetails = itemDetails;

    try {

        newStockAdjustment = await StockAdjustment.findByIdAndUpdate(req.params.id,
            { $set: stockAdjustmentFields },
            { new: true });

        return res.json(newStockAdjustment)
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