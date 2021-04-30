const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');
const Comapnies = require("../models/Companies");
const { nanoid } = require('nanoid');

// @router  GET api/companies
// @desc    Get all companies
// @access  Public
router.get('/', async (req, res) => {
    try {
        Comapnies.findAll({})
            .then(function (result) {
                return res.json(result);
            });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  POST api/companies
// @desc    Register an companies
// @access  Public
router.post('/', [
    check(
        "address", "Address is required"
    )
        .not()
        .isEmpty(),

    check(
        "company", "Company is required"
    )
        .not()
        .isEmpty(),
    check(
        "currency", "Currency is required"
    )
        .not()
        .isEmpty(),
    check(
        "email", "Email is required"
    )
        .not()
        .isEmpty(),

    check(
        "executive", "Executive is required"
    )
        .not()
        .isEmpty(),
    check(
        "mobileNo", "Phone is required"
    )
        .not()
        .isEmpty(),
    check(
        "startYear", "Start Year is required"
    )
        .not()
        .isEmpty(),
    check(
        "terms", "Terms is required"
    )
        .not()
        .isEmpty(),
    check(
        "name", "Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "tax", "Tax is required"
    )
        .not()
        .isEmpty()
],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { address, company, currency, email, executive, mobileNo, startYear, terms, website, name, tax, codeConfig } = req.body;

        const code = nanoid(16);

        try {
            const newCompany = await Comapnies.create({
                address, company, currency, email, executive, mobileNo, startYear, terms, name, tax, website, code, codeConfig, manager: req.user.id
            });

            // return res.status(200).json(newCompany);
            if (newCompany) return res.status(200).json({ "msg": "Company Created" });

        } catch (error) {
            console.error(error.message);
            res.send("Server Error")
        }

    });

// @router  PUT api/companies
// @desc    Update an companies
// @access  Public
router.put('/:id', auth, async (req, res) => {

    const { address, company, currency, email, executive, mobileNo, startYear, terms, website, name, tax, codeConfig } = req.body;

    const code = "83383939";

    const companyField = {};
    if (address) companyField.address = address;
    if (company) companyField.company = company;
    if (currency) companyField.currency = currency;
    if (email) companyField.email = email;
    if (executive) companyField.executive = executive;
    if (mobileNo) companyField.mobileNo = mobileNo;
    if (startYear) companyField.startYear = startYear;
    if (terms) companyField.terms = terms;
    if (website) companyField.website = website;
    if (name) companyField.name = name;
    if (tax) companyField.tax = tax;
    if (codeConfig) companyField.codeConfig = codeConfig; else companyField.codeConfig = [{}];


    try {
        const selector = {
            where: {
                code: req.params.id
            }
        }


        Comapnies.update(
            companyField,
            selector
        ).then(function (result) {
            return res.status(200).json({ "msg": "Company Updated" });
        });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }


});

// @router  DELETE api/companies
// @desc    Delete an companies
// @access  Public
router.delete('/:id', auth, async (req, res) => {

    try {
        let company = await Comapnies.findById(req.params.id);

        if (!company) return res.status(404).json({ msg: 'Company Not found' });


        // Make sure user own contact
        // if (company.user.toString() !== req.manager.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        await Comapnies.findByIdAndRemove(req.params.id);
        return res.send({ msg: "Company Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;