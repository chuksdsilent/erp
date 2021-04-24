const express = require('express');
const router = express.Router();


const employeeAuth = require("../middleware/employeeAuth");
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');
const ItemGroups = require("../models/Groups");
const ItemKits = require('../models/ItemKits');
const crypto = require("crypto");
const { nanoid } = require('nanoid');

// @router  GET api/itemgroup
// @desc    Get all itemgroup
// @access  Public
router.get('/', async (req, res) => {
    try {
        const item = await ItemGroups.find({}).sort({ date: -1 });
        res.json(item)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  POST api/itemgroup
// @desc    Register an itemgroup
// @access  Public
router.post('/', [

    check(
        "accountDetails", "accountDetails is required"
    )
        .not()
        .isEmpty(),
    check(
        "accountName", "accountName is required"
    )
        .not()
        .isEmpty(),
    check(
        "description", "description is required"
    )
        .not()
        .isEmpty(),
    check(
        "fromDate", "fromDate is required"
    )
        .not()
        .isEmpty(),
    check(
        "toDate", "toDate is required"
    )
        .not()
        .isEmpty(),
    check(
        "name", "name is required"
    )
        .not()
        .isEmpty(),
    check(
        "taxGroup", "taxGroup is required"
    )
        .not()
        .isEmpty(),
], async (req, res) => {

    const code = nanoid(10)

    const { description, accountDetails, accountName, fromDate, toDate, name, taxGroup } = req.body;


    try {
        let checkCode = await ItemGroups.findOne({ code });
        if (checkCode) res.status(400).json({ "msg": "Code Already Exists" });


        let itemGroups = new ItemGroups({
            description, accountDetails, accountName, fromDate, name, taxGroup, toDate, code
        })

        const newItemGroups = await itemGroups.save();
        res.send(newItemGroups);

    } catch (error) {
        res.send("Server Error");
        console.log(error.message);
    }
});

// @router  PUT api/itemgroup
// @desc    Update an itemgroup
// @access  Public
router.put('/:id', async (req, res) => {

    const { description, accountDetails, accountName, fromDate, toDate, name, taxGroup } = req.body;



    const itemGroupsFields = {};

    if (description) itemGroupsFields.description = description;
    if (accountDetails) itemGroupsFields.accountDetails = accountDetails;
    if (accountName) itemGroupsFields.accountName = accountName;
    if (fromDate) itemGroupsFields.fromDate = fromDate;
    if (toDate) itemGroupsFields.toDate = toDate;
    if (name) itemGroupsFields.name = name;
    if (taxGroup) itemGroupsFields.taxGroup = taxGroup;


    try {
        let itemGroups = await ItemGroups.findById(req.params.id);

        if (!itemGroups) return res.status(404).json({ msg: 'Item Not found' });


        // Make sure user own contact
        // if (item.user.toString() !== req.employee.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        updatedItemsKits = await ItemGroups.findByIdAndUpdate(req.params.id,
            { $set: itemGroupsFields },
            { new: true });

        return res.json(updatedItemsKits)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  DELETE api/itemgroup
// @desc    Delete an itemgroup
// @access  Public
router.delete('/:id', async (req, res) => {

    // const id = crypto.randomBytes(3).toString("hex");

    // res.json({ "unique id": nanoid(1) })

    try {
        let itemGroups = await ItemGroups.findById(req.params.id);

        if (!itemGroups) return res.status(404).json({ msg: 'Item Group Not found' });


        // Make sure user own contact
        // if (item.user.toString() !== req.employee.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        await ItemGroups.findByIdAndRemove(req.params.id);
        return res.send({ msg: "Item Group Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;