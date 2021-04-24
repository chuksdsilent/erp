const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const Employee = require('../models/Employee');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');


// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {

    // try {
    //     const employee = await Employee.find({ manager: req.manager.id }).sort({ date: -1 });
    //     res.json(employee)
    // } catch (error) {
    //     console.error(error.message);
    //     res.status(500).send("Server Error")
    // }
    try {
        const employee = await Employee.find({}).sort({ date: -1 });
        res.json(employee)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  POST api/employees
// @desc    Register an employee
// @access  Public
router.post('/', auth, [
    check(
        "employeeName", "Name is required"
    )
        .not()
        .isEmpty(),
    check(
        "username", "Username is required"
    )
        .not()
        .isEmpty(),
    check(
        "confirmPassword", "Confirm Password is required"
    )
        .not()
        .isEmpty(),
    check(
        "password", "Enter password greater than 8 Characters"
    )
        .not()
        .isEmpty()
        .isLength({ min: 8 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { employeeName, password, confirmPassword, username } = req.body;

    try {
        if (confirmPassword === password) {

            let checkEmployee = await Employee.findOne({ username });

            if (checkEmployee) {
                return res.status(400).json({ msg: "Employee already exists" });
            }
            const newEmployee = new Employee({
                employeeName,
                username,
                password,
                manager: req.manager.id
            });


            const salt = await bcrypt.genSalt(10);
            newEmployee.password = await bcrypt.hash(password, salt);

            const employee = await newEmployee.save();
            res.json(employee);

        } else {
            res.json({ msg: "Password does not match" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }


});

// @router  PUT api/employees
// @desc    Update an employee
// @access  Public
router.put('/:id', auth, async (req, res) => {
    const { employeeName, password, confirmPassword, username } = req.body;


    const employeeFields = {};

    if (employeeName) employeeFields.employeeName = employeeName;
    if (password) employeeFields.password = password;
    if (username) employeeFields.username = username;


    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee Not found' });


        // Make sure user own contact
        if (employee.manager.toString() !== req.manager.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        employee = await Employee.findByIdAndUpdate(req.params.id,
            { $set: employeeFields },
            { new: true });

        return res.json(employee)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }


});

// @router  DELETE api/employees
// @desc    Delete an employee
// @access  Public
router.delete('/:id', auth, async (req, res) => {

    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee Not found' });


        // Make sure user own contact
        if (employee.user.toString() !== req.manager.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await Employee.findByIdAndRemove(req.params.id);
        return res.send({ msg: "Employee Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }

});

module.exports = router;