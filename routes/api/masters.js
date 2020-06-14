const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Class = require('../../models/Class.Model');
const Subject = require('../../models/Subject.Model');

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
router.get('/subject', async (req, res) => {
  try {
    const subjectList = await Subject.find();
    return res.status(200).json(subjectList);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

router.post(
  '/subject',

  [check('name', 'Subject name cannot be empty').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      let subject = await Subject.findOne({ name });

      if (subject) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Subject already exist' }] });
      }

      subject = new Subject({ name });

      const savedSubject = await subject.save();

      res.status(200).json(savedSubject);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error');
    }
  }
);

router.delete('/subject', async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete({
      _id: req.body.subjectId,
    });

    res.status(202).json(deletedSubject);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
  //grade = await Class.findByIdAndDelete(req.body.deleteId);
  //res.status(200).json(grade);
});

router.patch('/subject', async (req, res) => {
  //console.log(req.body);
  const { name, subjectId } = req.body;

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { name },
      { new: true }
    );
    res.status(200).json(updatedSubject);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// Fees Routes
router.post('/fee', async (req, res) => {});

module.exports = router;
