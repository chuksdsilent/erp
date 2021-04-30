const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const Procurement = require('../models/Procurement');
const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');

// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const procurement = await Procurement.find({}).sort({ date: -1 });
        res.json(procurement)
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
        "accName", "accName is required"
    )
        .not()
        .isEmpty(),
    check(
        "accNo", "accNo is required"
    )
        .not()
        .isEmpty(),
    check(
        "address", "address is required"
    )
        .not()
        .isEmpty(),
    check(
        "country", "country By is required"
    )
        .not()
        .isEmpty(),
    check(
        "date", "date is required"
    )
        .not()
        .isEmpty(),
    check(
        "email", "email is required"
    )
        .not()
        .isEmpty(),
    check(
        "fromDate", "fromDate is required"
    )
        .not()
        .isEmpty(),
    check(
        "logisticsProvider", "logisticsProvider is required"
    )
        .not()
        .isEmpty(),
    check(
        "mobileNo", "mobileNo is required"
    )
        .not()
        .isEmpty(),
    check(
        "name", "name is required"
    )
        .not()
        .isEmpty(),
    check(
        "state", "state is required"
    )
        .not()
        .isEmpty(),
    check(
        "taxDetails", "taxDetails is required"
    )
        .not()
        .isEmpty(),
    check(
        "terms", "terms is required"
    )
        .not()
        .isEmpty(),
    check(
        "toDate", "state is required"
    )
        .not()
        .isEmpty(),
    check(
        "website", "state is required"
    )
        .not()
        .isEmpty(),
],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            accName,
            accNo,
            address,
            bank,
            country,
            date,
            email,
            fromDate,
            logisticsProvider,
            mobileNo,
            name,
            state,
            swiftCode,
            taxDetails,
            taxGroup,
            terms,
            toDate,
            website
        } = req.body;

        const code = nanoid(10);


        try {

            let procurement = new Procurement({
                accName,
                accNo,
                address,
                bank,
                code,
                country,
                date,
                email,
                fromDate,
                logisticsProvider,
                mobileNo,
                name,
                state,
                swiftCode,
                taxDetails,
                taxGroup,
                terms,
                toDate,
                website
            })

            const newprocurement = await procurement.save();
            res.send(newprocurement);

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
        accName,
        accNo,
        address,
        bank,
        code,
        country,
        date,
        email,
        fromDate,
        logisticsProvider,
        mobileNo,
        name,
        state,
        swiftCode,
        taxDetails,
        taxGroup,
        terms,
        toDate,
        website,

    } = req.body;

    const fields = {};

    if (accName) fields.accName = accName;
    if (accNo) fields.accNo = accNo;
    if (address) fields.address = address;
    if (bank) fields.bank = bank;
    if (code) fields.code = code;
    if (country) fields.country = country;
    if (email) fields.email = email;
    if (fromDate) fields.fromDate = fromDate;
    if (logisticsProvider) fields.logisticsProvider = logisticsProvider;
    if (mobileNo) fields.mobileNo = mobileNo;
    if (name) fields.name = name;
    if (state) fields.state = state;
    if (swiftCode) fields.swiftCode = swiftCode;
    if (taxDetails) fields.taxDetails = taxDetails;
    if (taxGroup) fields.taxGroup = taxGroup;
    if (terms) fields.terms = terms;
    if (toDate) fields.toDate = toDate;
    if (website) fields.state = website;
    try {

        newprocurement = await Procurement.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newprocurement)
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