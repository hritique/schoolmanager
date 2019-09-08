const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Student = require('../../models/Student.Model');

// Get all the students
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// Get student by SID
router.get('/:sid', auth, async (req, res) => {
  const sid = req.params.sid;

  try {
    const student = await Student.findOne({ sid });

    if (!student) {
      return res.status(400).json({ errors: [{ msg: 'Student not found' }] });
    }

    res.status(200).json({ student });
  } catch (err) {
    console.error(err.message);
    res.status(400).json('Server error');
  }
});

// Add a new student
router.post(
  '/',
  auth,
  [
    check('sid', 'Student ID is required')
      .not()
      .isEmpty(),
    check('name', "Student's Name is required")
      .not()
      .isEmpty(),
    check('dob', 'Date of birth is required')
      .not()
      .isEmpty(),
    check('grade', 'Grade is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sid, name, dob, grade, father, mother, mobile, address } = req.body;

    try {
      let student = await Student.findOne({ sid });

      if (student) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Student already exist with this SID' }] });
      }

      student = new Student({
        sid,
        name,
        dob,
        grade,
        father,
        mother,
        mobile,
        address
      });

      await student.save();

      res.status(200).json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error');
    }
  }
);

module.exports = router;
