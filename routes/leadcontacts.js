const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');

const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const LeadContacts = require('../models/LeadContacts');

// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const leadCLeadCntacts = await LeadContacts.find({}).sort({ date: -1 });
        res.json(leadCLeadCntacts)
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
        "date", "Date is required"
    )
        .not()
        .isEmpty(),


    check(
        "salesExec", "Sales Executive No is required"
    )
        .not()
        .isEmpty(),
    check(
        "login", "Login By is required"
    )
        .not()
        .isEmpty(),
    check(
        "lastName", "Last Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "salutation", "Salutation is required"
    )
        .not()
        .isEmpty(),
    check(
        "gender", "Gender is required"
    )
        .not()
        .isEmpty(),
    check(
        "address", "Address is required"
    )
        .not()
        .isEmpty(),
    check(
        "birthday", "Supplier Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "relativePhoneNo", "Billing Address is required"
    )
        .not()
        .isEmpty(),
    check(
        "company", "Company is required"
    )
        .not()
        .isEmpty(),
    check(
        "email", "Email is required"
    )
        .not()
        .isEmpty(),
    check(
        "phoneNo", "phone is required"
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
            date,
            salesExec,
            login,
            lastName,
            salutation,
            gender,
            address,
            weddingAnniversary,
            birthday,
            relativePhoneNo,
            company,
            email,
            phoneNo

        } = req.body;

        try {

            let leadContacts = new LeadContacts({
                code,
                date,
                salesExec,
                login,
                lastName,
                salutation,
                gender,
                address,
                weddingAnniversary,
                birthday,
                relativePhoneNo,
                company,
                email,
                phoneNo

            })

            const newLeadContacts = await leadContacts.save();
            res.send(newLeadContacts);

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
        date,
        salesExec,
        login,
        lastName,
        salutation,
        gender,
        address,
        weddingAnniversary,
        birthday,
        relativePhoneNo,
        company,
        email,
        phoneNo
    } = req.body;

    const fields = {};

    if (date) fields.date = date;
    if (salesExec) fields.salesExec = salesExec;
    if (login) fields.login = login;
    if (lastName) fields.lastName = lastName;
    if (salutation) fields.salutation = salutation;
    if (gender) fields.gender = gender;
    if (address) fields.address = address;
    if (weddingAnniversary) fields.weddingAnniversary = weddingAnniversary;
    if (birthday) fields.birthday = birthday;
    if (relativePhoneNo) fields.relativePhoneNo = relativePhoneNo;
    if (company) fields.company = company;
    if (email) fields.email = email;
    if (phoneNo) fields.phoneNo = phoneNo;

    try {

        neLeadwContacts = await LeadContacts.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newLeadContacts)
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