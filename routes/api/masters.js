const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Class = require('../../models/Class.Model');
const Subject = require('../../models/Subject.Schema');

// Class Routes
router.patch('/class/:id', async (req, res) => {
	try {
		console.log(req.body);

		const grade = await Class.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.status(200).json(grade);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

router.get('/class', async (req, res) => {
	try {
		const classList = await Class.find();
		return res.status(200).json(classList);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

router.delete('/class', async (req, res) => {
	try {
		console.log(req.body);

		grade = await Class.findByIdAndDelete(req.body.deleteId);
		res.status(200).json(grade);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

router.post(
	'/class',

	[check('name', 'Class cannot be empty').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, teacher } = req.body;

		try {
			let grade = await Class.findOne({ name });

			if (grade) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Class already exist with entered name' }] });
			}

			grade = new Class({ name, teacher });

			const savedGrade = await grade.save();

			res.status(200).json(savedGrade);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	}
);

// Subjects Route
router.post(
	'/subject',

	[check('name', 'Subject name cannot be empty').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { classId, name, priority } = req.body;

		try {
			const grade = await Class.findOne({ _id: classId });
			if (!grade) {
				return res.status(400).json({ errors: [{ msg: 'No class exist' }] });
			}

			let newSubject = grade.subjects.filter(
				(subject) => subject.name === name
			);

			if (newSubject.length !== 0) {
				console.log(newSubject);
				return res
					.status(400)
					.json({ errors: [{ msg: 'Subject already exist' }] });
			}

			newSubject = { name, priority };

			grade.subjects.push(newSubject);

			grade.subjects.sort((a, b) => a.priority - b.priority);

			const result = await grade.save();
			res.status(200).json(result);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	}
);

router.delete('/subject', async (req, res) => {
	console.log(req.body);
	const { classId, subjectId } = req.body;

	try {
		const grade = await Class.findOne({ _id: classId });
		if (!grade) {
			return res.status(400).json({ errors: [{ msg: 'No class exist' }] });
		}

		let newSubject = grade.subjects.filter(
			(subject) => subject.id === subjectId
		);

		if (newSubject.length === 0) {
			//console.log(newSubject);
			return res.status(400).json({ errors: [{ msg: 'Subject dont exist' }] });
		}

		grade.subjects = grade.subjects.filter(
			(subject) => subject.id !== subjectId
		);
		//console.log('Updated', grade);
		const result = await grade.save();
		res.status(200).json(result);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
	//grade = await Class.findByIdAndDelete(req.body.deleteId);
	//res.status(200).json(grade);
});

router.patch('/subject', async (req, res) => {
	//console.log(req.body);
	const { values, classId, subjectId } = req.body;

	try {
		const grade = await Class.findOne({ _id: classId });

		if (!grade) {
			return res.status(400).json({ errors: [{ msg: 'No class exist' }] });
		}

		let querySubject = grade.subjects.filter(
			(subject) => subject._id == subjectId
		)[0];

		if (!querySubject) {
			return res.status(400).json({ errors: [{ msg: 'Subject dont exist' }] });
		}
		querySubject.name = values.name;
		querySubject.priority = values.priority;

		grade.subjects = grade.subjects.filter(
			(subject) => subject.id !== subjectId
		);
		grade.subjects = [...grade.subjects, querySubject];
		grade.subjects.sort((a, b) => a.priority - b.priority);
		//console.log('Updated', grade);
		const result = await grade.save();
		res.status(200).json(result);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

// Fees Routes
router.post('/fee', async (req, res) => {});

module.exports = router;
