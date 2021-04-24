const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const StockTransferInward = require('../models/StockTransferInward');
const { check, validationResult } = require('express-validator');


// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const stockTransferInward = await StockTransferInward.find({}).sort({ date: -1 });
        res.json(stockTransferInward)
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
        "outwardBy", "OutWard By is required"
    )
        .not()
        .isEmpty(),
    check(
        "purchaseReq", "Purchase is required"
    )
        .not()
        .isEmpty(),
    check(
        "fromBranch", "Branch is required"
    )
        .not()
        .isEmpty(),
    check(
        "vehicleNo", "Vehicle is required"
    )
        .not()
        .isEmpty(),
    check(
        "expDeliveryDate", "Expiry Date is required"
    )
        .not()
        .isEmpty(),
    check(
        "outwardBy", "Outward is required"
    )
        .not()
        .isEmpty(),
    check(
        "transporterName", "Transport is required"
    )
        .not()
        .isEmpty(),
    check(
        "transferRemark", "Transfer Remark is required"
    )
        .not()
        .isEmpty(),
    check(
        "charges", "Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "charges", "Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "terms", "Name is required"
    )
        .not()
        .isEmpty()

], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        outwardBy,
        purchaseReq,
        fromBranch,
        vehicleNo,
        expDeliveryDate,
        transporterName,
        transferRemark,
        charges,
        terms,
        itemDetails

    } = req.body;

    try {

        let stockTransferInward = new StockTransferInward({
            outwardBy,
            purchaseReq,
            fromBranch,
            vehicleNo,
            expDeliveryDate,
            transporterName,
            transferRemark,
            charges,
            terms,
            itemDetails
        })

        const newStockTransferInward = await stockTransferInward.save();
        res.send(newStockTransferInward);

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
        outwardBy,
        purchaseReq,
        fromBranch,
        vehicleNo,
        expDeliveryDate,
        transporterName,
        transferRemark,
        charges,
        terms,
        itemDetails

    } = req.body;


    const stockTransferInwardFields = {};

    if (outwardBy) stockTransferInwardFields.outwardBy = outwardBy;
    if (purchaseReq) stockTransferInwardFields.purchaseReq = purchaseReq;
    if (fromBranch) stockTransferInwardFields.fromBranch = fromBranch;
    if (vehicleNo) stockTransferInwardFields.vehicleNo = vehicleNo;
    if (expDeliveryDate) stockTransferInwardFields.expDeliveryDate = expDeliveryDate;
    if (transporterName) stockTransferInwardFields.transporterName = transporterName;
    if (transferRemark) stockTransferInwardFields.transferRemark = transferRemark;
    if (charges) stockTransferInwardFields.charges = charges;
    if (terms) stockTransferInwardFields.terms = terms;
    if (itemDetails) stockTransferInwardFields.itemDetails = itemDetails;

    try {
        let stockTransferInward = await StockTransferInward.findById(req.params.id);

        // Make sure user own contact
        // if (employee.manager.toString() !== req.manager.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        newStockTransferInward = await StockTransferInward.findByIdAndUpdate(req.params.id,
            { $set: stockTransferInwardFields },
            { new: true });

        return res.json(newStockTransferInward)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  DELETE api/employees
// @desc    Delete an employee
// @access  Public
router.delete('/', (req, res) => {

});

module.exports = router;