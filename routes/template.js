const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');
const Employee = require('../models/Employee');


// @router  GET api/employees
// @desc    Get all employee
// @access  Public
router.get('/', async (req, res) => {
    try {
        const employee = await Employee.find({ manager: req.manager.id }).sort({ date: -1 });
        res.json(employee)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @router  POST api/employees
// @desc    Register an employee
// @access  Public
router.post('/', (req, res) => {
    res.send("Register");
});

// @router  PUT api/employees
// @desc    Update an employee
// @access  Public
router.put('/', (req, res) => {
    res.send("Register");
});

// @router  DELETE api/employees
// @desc    Delete an employee
// @access  Public
router.delete('/', (req, res) => {
    res.send("Register");
});

module.exports = router;