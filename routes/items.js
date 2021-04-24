const express = require('express');
const router = express.Router();
const item = require("../models/Item")
const Manager = require("../models/Manager")
const employeeAuth = require("../middleware/employeeAuth");
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');
const Item = require('../models/Item');
const { nanoid } = require('nanoid');



// @router  GET api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const item = await Item.find({}).sort({ date: -1 });
        res.json(item)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});
// @router  POST api/items
// @desc    Register an items
// @access  Public
router.post('/', [
    check(
        "alternative", "Alternative is required"
    )
        .not()
        .isEmpty(),
    check(
        "converstionRatio", "Converstion Ratio is required"
    )
        .not()
        .isEmpty(),
    check(
        "dPurchaseUOM", "Purchase is required"
    )
        .not()
        .isEmpty(),
    check(
        "dsaleUOM", "dSaleUOM is required"
    )
        .not()
        .isEmpty(),
    check(
        "description", "description is required"
    )
        .not()
        .isEmpty(),
    check(
        "expiryDate", "expiryDate is required"
    )
        .not()
        .isEmpty(),
    check(
        "group", "group is required"
    )
        .not()
        .isEmpty(),
    check(
        "maxRate", "maxRate is required"
    )
        .not()
        .isEmpty(),
    check(
        "minRate", "minRate is required"
    )
        .not()
        .isEmpty(),
    check(
        "model", "model is required"
    )
        .not()
        .isEmpty(),
    check(
        "name", "name is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseRate", "purchaseRate is required"
    )
        .not()
        .isEmpty(),
    check(
        "saleRate", "saleRate is required"
    )
        .not()
        .isEmpty(),
    check(
        "sellByDate", "sellBydate is required"
    )
        .not()
        .isEmpty(),
    check(
        "standardCost", "standardCost is required"
    )
        .not()
        .isEmpty(),
    check(
        "stockDate", "stockDate is required"
    )
        .not()
        .isEmpty(),
    check(
        "type", "type is required"
    )
        .not()
        .isEmpty(),
    check(
        "expirationDate", "type is required"
    )
        .not()
        .isEmpty(),
    check(
        "alternativeItem", "type is required"
    )
        .not()
        .isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { alternativeItem, dPurchaseUOM, converstionRatio, dsaleUOM, description, group, maxRate, minRate, name, model, purchaseRate, saleRate, sellByDate, standardCost, stockDate, type, expirationDate } = req.body;

    const code = nanoid(10)
    try {

        let checkCode = await Item.findOne({ code });
        if (checkCode) res.status(400).json({ "msg": "Code Already Exists" });

        console.log(req);

        let item = new Item({
            converstionRatio, alternativeItem, code, dPurchaseUOM, dsaleUOM, description, group, maxRate, minRate, name, model, purchaseRate, saleRate, sellByDate, standardCost, stockDate, type, expirationDate
        })

        const newItem = await item.save();
        res.send(newItem);
    } catch (error) {
        res.send("Server Error");
        console.log(error.message);
    }


});

// @router  PUT api/items
// @desc    Update an items
// @access  Public
router.put('/:id', async (req, res) => {
    const { purchaseRate, alternativeItem, code, dPurchaseUOM, converstionRatio, dsaleUOM, description, group, minRate, maxRate, model, name, saleRate, sellByDate, standardCost, stockDate, type, expirationDate } = req.body;



    const itemsFiels = {};

    if (code) itemsFiels.code = code;
    if (alternativeItem) itemsFiels.alternativeItem = alternativeItem;
    if (dPurchaseUOM) itemsFiels.dPurchaseUOM = dPurchaseUOM;
    if (minRate) itemsFiels.minRate = minRate;
    if (model) itemsFiels.model = model;
    if (saleRate) itemsFiels.saleRate = saleRate;
    if (dsaleUOM) itemsFiels.dsaleUOM = dsaleUOM;
    if (description) itemsFiels.description = description;
    if (converstionRatio) itemsFiels.converstionRatio = converstionRatio;
    if (group) itemsFiels.group = group;
    if (maxRate) itemsFiels.maxRate = maxRate;
    if (name) itemsFiels.name = name;
    if (purchaseRate) itemsFiels.purchaseRate = purchaseRate;
    if (sellByDate) itemsFiels.sellByDate = sellByDate;
    if (standardCost) itemsFiels.standardCost = standardCost;
    if (stockDate) itemsFiels.stockDate = stockDate;
    if (type) itemsFiels.type = type;
    if (expirationDate) itemsFiels.expirationDate = expirationDate;


    try {
        let item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item Not found' });


        // Make sure user own contact
        // if (item.user.toString() !== req.employee.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        updatedItems = await Item.findByIdAndUpdate(req.params.id,
            { $set: itemsFiels },
            { new: true });

        return res.json(updatedItems)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }

});

// @router  DELETE api/items
// @desc    Delete an items
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item Not found' });


        // Make sure user own contact
        // if (item.user.toString() !== req.employee.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        await Item.findByIdAndRemove(req.params.id);
        return res.send({ msg: "Item Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;