const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const StockTransferOutward = require('../models/StockTransferOutward');
const { check, validationResult } = require('express-validator');


// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const stockTransferOutward = await StockTransferOutward.find({}).sort({ date: -1 });
        res.json(stockTransferOutward)
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
        "issuedBy", "Issued By is required"
    )
        .not()
        .isEmpty(),
    check(
        "recipient", "Receipient By is required"
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
        issuedBy,
        recipient,
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

        let stockTransferOutward = new StockTransferOutward({
            issuedBy,
            recipient,
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

        const newStockTransferOutward = await stockTransferOutward.save();
        res.send(newStockTransferOutward);

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
        issuedBy,
        receipient,
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


    const stockTransferOutwardFields = {};

    if (issuedBy) stockTransferOutwardFields.issuedBy = issuedBy;
    if (receipient) stockTransferOutwardFields.receipient = receipient;
    if (purchaseReq) stockTransferOutwardFields.purchaseReq = purchaseReq;
    if (fromBranch) stockTransferOutwardFields.fromBranch = fromBranch;
    if (vehicleNo) stockTransferOutwardFields.vehicleNo = vehicleNo;
    if (expDeliveryDate) stockTransferOutwardFields.expDeliveryDate = expDeliveryDate;
    if (transporterName) stockTransferOutwardFields.transporterName = transporterName;
    if (transferRemark) stockTransferOutwardFields.transferRemark = transferRemark;
    if (charges) stockTransferOutwardFields.charges = charges;
    if (terms) stockTransferOutwardFields.terms = terms;
    if (itemDetails) stockTransferOutwardFields.itemDetails = itemDetails;

    try {
        let stockTransferOutward = await StockTransferOutward.findById(req.params.id);

        // Make sure user own contact
        // if (employee.manager.toString() !== req.manager.id) {
        //     return res.status(401).json({ msg: "Not authorized" });
        // }

        newStockTransferOutward = await StockTransferOutward.findByIdAndUpdate(req.params.id,
            { $set: stockTransferOutwardFields },
            { new: true });

        return res.json(newStockTransferOutward)
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