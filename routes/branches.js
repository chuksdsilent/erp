const express = require('express');
const Branches = require('../models/Branches');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth");
const { nanoid } = require('nanoid');

// @router  GET api/branches
// @desc    Get all branches
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        Branches.findAll({})
            .then(function (brans) {
                return res.json(brans);
            });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  POST api/branches
// @desc    Register an branches
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

        let { address, company, currency, email, executive, mobileNo, startYear, terms, website, name, tax, codeConfig } = req.body;

        if (!codeConfig) codeConfig = [{}];
        const code = nanoid(16);

        console.log(req)
        try {
            const newBranch = Branches.create({
                address, company, currency, email, executive, mobileNo, startYear, terms, name, tax, website, code, codeConfig, manager: req.user.id
            });
            Branches.findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            }).then(function (entries) {
                return res.json(entries);
            });

        } catch (error) {
            console.error(error.message);
            res.send("Server Error")
        }
    });

// @router  PUT api/branches
// @desc    Update an branches
// @access  Public
router.put('/:id', async (req, res) => {

    const { address, company, currency, email, executive, mobileNo, startYear, terms, website, name, tax, codeConfig } = req.body;


    const branchField = {};
    if (address) branchField.address = address;
    if (company) branchField.company = company
    if (codeConfig) branchField.codeConfig = codeConfig; else branchField.codeConfig = [{}];
    if (currency) branchField.currency = currency;
    if (email) branchField.email = email;
    if (executive) branchField.executive = executive;
    if (mobileNo) branchField.mobileNo = mobileNo;
    if (startYear) branchField.startYear = startYear;
    if (terms) branchField.terms = terms;
    if (website) branchField.website = website;
    if (name) branchField.name = name;
    if (tax) branchField.tax = tax;


    try {


        const selector = {
            where: {
                code: req.params.id
            }
        };
        Branches.update(
            branchField,
            selector
        ).then(function (newBranch) {
            return res.json({ msg: "Updated" });
        });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @router  DELETE api/branches
// @desc    Delete an branches
// @access  Public
router.delete('/:id', auth, async (req, res) => {

    try {
        let branches = await Branches.findById(req.params.id);

        if (!branches) return res.status(404).json({ msg: 'Employee Not found' });


        // Make sure user own contact
        // if (branches.user.toString() !== req.manager.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        await Branches.findByIdAndRemove(req.params.id);
        return res.send({ msg: "Branch Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;