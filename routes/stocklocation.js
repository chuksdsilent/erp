const express = require('express');
const router = express.Router();
const StockLocation = require('../models/StockLocation');
const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');


// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const stocklocation = await StockLocation.find({}).sort({ date: -1 });
        res.json(stocklocation)
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
        "location", "Location is required"
    )
        .not()
        .isEmpty(),
    check(
        "description", "Description is required"
    )
        .not()
        .isEmpty()
], async (req, res) => {
    const code = nanoid(10)
    const { location, description } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let checkCode = await StockLocation.findOne({ code });
        if (checkCode) res.status(400).json({ "msg": "Code Already Exists" });

        let stocklocation = new StockLocation({
            code, location, description
        })

        const newStockLocation = await stocklocation.save();
        res.send(newStockLocation);

    } catch (error) {
        res.send("Server Error");
        console.log(error.message);
    }
});

// @router  PUT api/employees
// @desc    Update an employee
// @access  Public
router.put('/:id', async (req, res) => {

    const { location, description, code } = req.body;

    const stockLocationFields = {};

    if (description) stockLocationFields.description = description;
    if (location) stockLocationFields.location = location;
    if (code) stockLocationFields.code = code;


    try {
        let stockLocation = await StockLocation.findById(req.params.id);

        if (!stockLocation) return res.status(404).json({ msg: 'Item Not found' });


        // Make sure user own contact
        // if (item.user.toString() !== req.employee.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        updatedStockLocation = await StockLocation.findByIdAndUpdate(req.params.id,
            { $set: stockLocationFields },
            { new: true });

        return res.json(updatedStockLocation)
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