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
    //console.log(req.body);

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

// Add multiple students
router.post('/addMultiple', auth, async (req, res) => {
  const { students } = req.body;

  await Student.deleteMany();

  const addStudent = async inputStudent => {
    const { sid, name, dob, grade, father, mother, mobile, address } = inputStudent;

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
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error');
    }
  };

  try {
    //console.log(students);
    await students.map(student => addStudent(student));

    res.status(200).json('Students added');
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// Update a student data
router.patch('/:sid', auth, async (req, res) => {
  const sid = req.params.sid;

  try {
    let student = await Student.findOne({ sid });

    if (student) {
      const updatedStudent = req.body;
      Object.keys(updatedStudent).map(key => {
        student[key] = updatedStudent[key];
      });
      await student.save();
      res.status(200).json({ student });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No Student exist with this SID' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

router.delete('/:sid', auth, async (req, res) => {
  const sid = req.params.sid;
  // console.log(sid);

  try {
    let response = await Student.findOneAndDelete({ sid });
    if (!response)
      return res.status(400).json({ errors: [{ msg: 'No student to delete' }] });
    res.status(200).json({ response });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;
