const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const StockCount = require('../models/StockCount');
const { check, validationResult } = require('express-validator');


// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const stockcount = await StockCount.find({}).sort({ date: -1 });
        res.json(stockcount)
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
        "nextStockCount", "Next Stock Count is required"
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
],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { department, employee, remark, nextStockCount, confirmedBy, itemDetails } = req.body;

        try {

            let stockcount = new StockCount({
                department, employee, remark, nextStockCount, confirmedBy, itemDetails
            })

            const newStockCount = await stockcount.save();
            res.send(newStockCount);

        } catch (error) {
            res.send("Server Error");
            console.log(error.message);
        }
    });

// @router  PUT api/employees
// @desc    Update an employee
// @access  Public
router.put('/:id', async (req, res) => {

    const { department, employee, remark, nextStockCount, confirmedBy, itemDetails } = req.body;

    const stockCountFields = {};

    if (department) stockCountFields.department = department;
    if (employee) stockCountFields.employee = employee;
    if (remark) stockCountFields.remark = remark;
    if (nextStockCount) stockCountFields.nextStockCount = nextStockCount;
    if (confirmedBy) stockCountFields.confirmedBy = confirmedBy;
    if (itemDetails) stockCountFields.itemDetails = itemDetails;

    try {

        newStockCount = await StockCount.findByIdAndUpdate(req.params.id,
            { $set: stockCountFields },
            { new: true });

        return res.json(newStockCount)
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