const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Student = require('../../models/Student.Model');
const Fee = require('../../models/Fee.Model');

// Add fees
router.post('/:sid', [], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const sid = req.params.sid;

	const { payment, discount, description } = req.body;

	try {
		const student = await Student.findOne({ sid });

		if (!student) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Student not found with given SID' }] });
		}

		const newFee = new Fee({
			student: student.id,
			payment,
			discount,
			description,
		});

		const feeSaved = await newFee.save();
		student.fees.push(feeSaved.id);

		await student.save();
		res.status(200).json('Fees added successfully');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

// Get all the fees
router.get('/', async (req, res) => {
	try {
		const fees = await Fee.find();
		res.status(200).json({ fees });
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

// Get fees by SID
router.get('/:sid', async (req, res) => {
	try {
		const sid = req.params.sid;

		const student = await Student.findOne({ sid });

		if (!student) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Student not found with given SID' }] });
		}

		const fees = [];

		for (let i = 0; i < student.fees.length; i++) {
			let fee = await Fee.findById(student.fees[i]);
			fees.push(fee);
		}

		res.status(200).json(fees);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

module.exports = router;
