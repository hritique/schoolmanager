import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';

// Redux
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';

// Tables
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  IconButton,
  Tooltip,
  Input
} from '@material-ui/core';

// Dialogs
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AllStudents = ({ setAlert, ...props }) => {
  const [students, setStudents] = useState([]);
  const [utils, setUtils] = useState({
    loading: true,
    empty: false,
    sid: '',
    dialog: {
      open: false,
      title: 'Are you sure ?',
      content: (
        <Fragment>
          Are you sure want to erase all the data for the selected student ?
        </Fragment>
      ),
      action: (
        <Fragment>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteStudent()}
            style={{ fontWeight: 'bolder' }}
          >
            Yes, Sure!
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={() =>
              setUtils({ ...utils, dialog: { ...utils.dialog, open: false } })
            }
            style={{ fontWeight: 'bolder' }}
          >
            No, Take me back!
          </Button>
        </Fragment>
      )
    }
  });

  async function fetchData() {
    setUtils({ ...utils, loading: true });
    const { data } = await axios.get('api/students');
    if (data.length <= 0) setUtils({ loading: false, empty: true });
    else {
      data.map(studentData => {
        let student = { sid: '', name: '', grade: '', mobile: '', father: '' };
        Object.keys(student).forEach(key => {
          student[key] = studentData[key];
        });
        student = { ...student, father: student.father.name };
        let tempStudents = students;
        tempStudents.push(student);
        setStudents(tempStudents);
        setUtils({ ...utils, loading: false, empty: false });
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [students]);

  const deleteStudent = async () => {
    try {
      await axios.delete(`api/students/${utils.sid}`);

      setAlert('Student deleted successfully', 'success');
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          setAlert(error.msg, 'error');
        });
      }
    }
    setUtils({ ...utils, dialog: { ...utils.dialog, open: false } });
    setStudents([]);
  };

  let studentsData = (
    <TableRow>
      <TableCell colSpan={6} align="center">
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
  if (!utils.loading && !utils.empty)
    studentsData = students.map(student => (
      <TableRow key={student.sid}>
        <TableCell>{student.sid}</TableCell>
        <TableCell align="left">{student.name}</TableCell>
        <TableCell align="left">{student.grade}</TableCell>
        <TableCell align="left">{student.mobile}</TableCell>
        <TableCell align="left">{student.father}</TableCell>
        <TableCell align="center">
          <Tooltip title="Edit">
            <IconButton
              onClick={() => props.history.push(`/updateStudent?sid=${student.sid}`)}
            >
              <EditIcon color="primary" fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                setUtils({
                  ...utils,
                  dialog: { ...utils.dialog, open: true },
                  sid: student.sid
                })
              }
            >
              <DeleteIcon color="error" fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));

  if (!utils.loading && utils.empty)
    studentsData = (
      <TableRow>
        <TableCell colSpan={6} align="center">
          No student found !
        </TableCell>
      </TableRow>
    );

  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog
        open={utils.dialog.open}
        onClose={() => setUtils({ ...utils, dialog: { ...utils.dialog, open: false } })}
      >
        <DialogTitle>{utils.dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{utils.dialog.content}</DialogContentText>
          <DialogActions>{utils.dialog.action}</DialogActions>
        </DialogContent>
      </Dialog>

      <Paper style={{ width: '50vw', margin: '15px auto', backgroundColor: '#eee' }}>
        <Table style={{ width: '50vw', backgroundColor: '#eee' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#333' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bolder' }}>SID</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bolder' }} align="left">
                Student's Name
              </TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bolder' }} align="left">
                Grade
              </TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bolder' }} align="left">
                Contact Number
              </TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bolder' }} align="left">
                Father's Name
              </TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bolder' }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{studentsData}</TableBody>
        </Table>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.history.push('/addStudent')}
      >
        {' '}
        <PlusIcon />
        &nbsp;Add New
      </Button>
    </div>
  );
};

AllStudents.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(AllStudents);
