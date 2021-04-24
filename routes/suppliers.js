const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const PurchaseOrder = require('../models/PurchaseOrder');
const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const Suppliers = require('../models/Suppliers');

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
        "accName", "Account Name is required"
    )
        .not()
        .isEmpty(),

    check(
        "accNo", "Account Number is required"
    )
        .not()
        .isEmpty(),
    check(
        "access", "Access is required"
    )
        .not()
        .isEmpty(),
    check(
        "address", "Address By is required"
    )
        .not()
        .isEmpty(),
    check(
        "bank", "Bank is required"
    )
        .not()
        .isEmpty(),
    check(
        "country", "Country  is required"
    )
        .not()
        .isEmpty(),
    check(
        "currency", "Currency is required"
    )
        .not()
        .isEmpty(),
    check(
        "defaultExec", "Default Exec is required"
    )
        .not()
        .isEmpty(),
    check(
        "email", "Email Type is required"
    )
        .not()
        .isEmpty(),
    check(
        "mobileNo", "Phone Address is required"
    )
        .not()
        .isEmpty(),
    check(
        "name", "Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "state", "State is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierId", "Supplier ID is required"
    )
        .not()
        .isEmpty(),
    check(
        "supplierItems", "Supplier Items is required"
    )
        .not()
        .isEmpty(),
    check(
        "swiftCode", "Swift Code is required"
    )
        .not()
        .isEmpty(),
    check(
        "tax", "Tax is required"
    )
        .not()
        .isEmpty(),
    check(
        "terms", "Terms is required"
    )
        .not()
        .isEmpty(),
    check(
        "website", "Website  is required"
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
            accName,
            accNo,
            access,
            address,
            bank,
            country,
            creditDetails,
            currency,
            defaultExec,
            email,
            mobileNo,
            name,
            state,
            supplierId,
            supplierItems,
            supplierName,
            swiftCode,
            tax,
            terms,
            website


        } = req.body;

        try {

            let suppliers = Suppliers({
                accName,
                accNo,
                code,
                access,
                address,
                bank,
                country,
                creditDetails,
                currency,
                defaultExec,
                email,
                mobileNo,
                name,
                state,
                supplierId,
                supplierItems,
                supplierName,
                swiftCode,
                tax,
                terms,
                website,
            })

            const newSuppliers = await suppliers.save();
            res.send(newSuppliers);

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
        access,
        address,
        bank,
        country,
        creditDetails,
        currency,
        defaultExec,
        email,
        mobileNo,
        name,
        state,
        supplierId,
        supplierItems,
        supplierName,
        swiftCode,
        tax,
        terms,
        website


    } = req.body;

    const fields = {};

    if (accName) fields.accName = accName;
    if (accNo) fields.accNo = accNo;
    if (access) fields.access = access;
    if (address) fields.address = address;
    if (bank) fields.bank = bank;
    if (country) fields.country = country;
    if (creditDetails) fields.creditDetails = creditDetails;
    if (currency) fields.currency = currency;
    if (defaultExec) fields.defaultExec = defaultExec;
    if (email) fields.email = email;
    if (supplierName) fields.supplierName = supplierName;
    if (mobileNo) fields.mobileNo = mobileNo;
    if (name) fields.name = name;
    if (state) fields.state = state;
    if (supplierId) fields.supplierId = supplierId;
    if (supplierItems) fields.supplierItems = supplierItems;
    if (swiftCode) fields.swiftCode = swiftCode;
    if (tax) fields.tax = tax;
    if (terms) fields.terms = terms;
    if (website) fields.website = website;

    try {

        newSuppliers = await Suppliers.findByIdAndUpdate(req.params.id,
            { $set: fields },
            { new: true });

        return res.json(newSuppliers)
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