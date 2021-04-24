const express = require('express');
const router = express.Router();

const employeeAuth = require("../middleware/employeeAuth");
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');
const itemKit = require("../models/ItemKits");
const ItemKits = require('../models/ItemKits');
const { nanoid } = require('nanoid');



// @router  GET api/item-kits
// @desc    Get all item-kits
// @access  Public
router.get('/', async (req, res) => {
    try {
        const itemKit = await ItemKits.find({}).sort({ date: -1 });
        res.json(itemKit)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  POST api/item-kits
// @desc    Register an item-kits
// @access  Public
router.post('/', [
    check(
        "description", "description is required"
    )
        .not()
        .isEmpty(),
    check(
        "fixedPrice", "fixed Price is required"
    )
        .not()
        .isEmpty(),
    check(
        "group", "description is required"
    )
        .not()
        .isEmpty(),
    check(
        "itemDetails", "description is required"
    )
        .not()
        .isEmpty(),
    check(
        "name", "description is required"
    )
        .not()
        .isEmpty(),
    check(
        "pricing", "description is required"
    )
        .not()
        .isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const code = nanoid(10);

    const { description, fixedPrice, group, itemDetails, name, pricing } = req.body;


    try {
        let checkCode = await ItemKits.findOne({ code });
        if (checkCode) res.status(400).json({ "msg": "Code Already Exists" });


        let itemKit = new ItemKits({
            description, fixedPrice, group, itemDetails, name, pricing, code
        })

        const newItemKit = await itemKit.save();
        res.send(newItemKit);
    } catch (error) {
        res.send("Server Error");
        console.log(error.message);
    }


});

// @router  PUT api/item-kits
// @desc    Update an item-kits
// @access  Public
router.put('/:id', async (req, res) => {

    const { description, fixedPrice, group, itemDetails, name, pricing, code } = req.body;


    const itemKitsFields = {};

    if (description) itemKitsFields.description = description;
    if (itemDetails) itemKitsFields.itemDetails = itemDetails;
    if (fixedPrice) itemKitsFields.fixedPrice = fixedPrice;
    if (group) itemKitsFields.group = group;
    if (name) itemKitsFields.name = name;
    if (pricing) itemKitsFields.pricing = pricing;


    try {
        let itemKits = await ItemKits.findById(req.params.id);

        if (!itemKits) return res.status(404).json({ msg: 'Item Not found' });


        // Make sure user own contact
        // if (item.user.toString() !== req.employee.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        updatedItemsKits = await ItemKits.findByIdAndUpdate(req.params.id,
            { $set: itemKitsFields },
            { new: true });

        return res.json(updatedItemsKits)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }

});

// @router  DELETE api/item-kits
// @desc    Delete an item-kits
// @access  Public
router.delete('/:id', async (req, res) => {

    try {
        let itemKits = await ItemKits.findById(req.params.id);

        if (!itemKits) return res.status(404).json({ msg: 'Item Kit Not found' });


        // Make sure user own contact
        // if (employee.user.toString() !== req.manager.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        await ItemKits.findByIdAndRemove(req.params.id);
        return res.send({ msg: "Item Kits Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }

});

module.exports = router;