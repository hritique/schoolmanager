import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { TextField, Button, CircularProgress } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';

const UpdateStudent = ({ setAlert, ...props }) => {
  const [formData, setFormData] = useState({
    sid: {
      label: 'SID',
      type: 'number',
      value: ''
    },
    name: {
      label: 'Student Name',
      type: 'text',
      value: ''
    },
    dob: {
      label: 'Date Of Birth',
      type: 'date',
      value: '',
      helper: ''
    },
    grade: {
      label: 'Grade',
      type: 'text',
      value: ''
    },
    father: {
      label: "Father's Name",
      type: 'text',
      value: '',
      helper: 'No title (e.g. Mr./Ms.)'
    },
    mother: {
      label: "Mother's Name",
      type: 'text',
      value: ''
    },
    mobile: {
      label: 'Contact Number',
      type: 'text',
      value: ''
    },
    address: {
      label: 'Address',
      type: 'text',
      value: ''
    }
  });

  const [utils, setUtils] = useState({
    studentDataLoading: true,
    buttonLoading: false
  });

  useEffect(() => {
    async function fetchData() {
      const { sid } = queryString.parse(props.location.search);
      //console.log(queryString.parse(props.location.search));
      const studentData = (await axios.get(`api/students/${sid}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      })).data.student;

      //console.log(student);
      let student = { ...formData };
      for (let key in student) {
        student[key].value = studentData[key];
      }

      let date = new Date(student.dob.value);
      date = date.toLocaleDateString();
      date = date
        .split('/')
        .reverse()
        .join('-');

      student = {
        ...student,
        dob: { ...student.dob, value: date },
        father: { ...student.father, value: student.father.value.name },
        mother: { ...student.mother, value: student.mother.value.name }
      };
      setFormData({ ...formData, ...student });
      setUtils({ studentDataLoading: false });
    }
    fetchData();
  }, []);

  // console.log(response.data);

  const onChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: {
        ...formData[event.target.name],
        value: event.target.value
      }
    });
  };

  const updateStudent = async event => {
    setUtils({ buttonLoading: true });
    event.preventDefault();
    let student = {};
    for (let key in formData) {
      student[key] = formData[key].value;
    }
    student = {
      ...student,
      father: { name: student.father },
      mother: { name: student.mother }
    };

    try {
      await axios.patch(`api/students/${student.sid}`, student, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      setAlert('Student updated successfully', 'success');
      props.history.goBack();
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          setAlert(error.msg, 'error');
        });
      }
    }
    setUtils({ buttonLoading: false });
    // console.log('After adding student:', response);
  };

  const formElementsArray = [];

  for (let key in formData) {
    formElementsArray.push({
      name: key,
      ...formData[key]
    });
  }

  let buttonRender = (
    <div>
      <Button type="submit" color="primary" variant="contained">
        Update Student
      </Button>
      &nbsp;&nbsp;
      <Button variant="contained" onClick={() => props.history.goBack()}>
        Cancel
      </Button>
    </div>
  );
  if (utils.buttonLoading) buttonRender = <CircularProgress />;

  let form = <CircularProgress />;
  if (!utils.studentDataLoading)
    form = (
      <div>
        {formElementsArray.map(input => (
          <Input
            key={input.name}
            name={input.name}
            value={input.value}
            type={input.type}
            helper={input.helper}
            onChange={e => onChange(e)}
          >
            {input.label}
          </Input>
        ))}
        {buttonRender}
      </div>
    );

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-8 mx-auto">
          <form
            onSubmit={updateStudent}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            {form}
          </form>
        </div>
      </div>
    </div>
  );
};

class Input extends Component {
  render(props) {
    return (
      <div className="form-group">
        <TextField
          label={this.props.children}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={event => this.props.onChange(event)}
          margin="dense"
          style={{ width: '80%' }}
          helperText={this.props.helper}
          InputLabelProps={
            this.props.type === 'date'
              ? {
                  shrink: true
                }
              : {}
          }
          disabled={this.props.name === 'sid'}
        />
      </div>
    );
  }
}

UpdateStudent.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(UpdateStudent);
