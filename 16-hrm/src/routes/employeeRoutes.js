import express from 'express';
const router = express.Router();
import Employee from '../models/Employee.js';

// @desc    Create a new employee (admin only)
// @route   POST /api/employees
// @access  Private (admin only)
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, hireDate, department, position, salary } = req.body;

        const newEmployee = new Employee({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            hireDate,
            department,
            position,
            salary,
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all employees (admin and employees)
// @route   GET /api/employees
// @access  Private
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().populate('department').populate('position');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single employee by ID (admin and employees)
// @route   GET /api/employees/:id
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('department').populate('position');

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Other routes (update, delete) should also be restricted to admins

export default router;
