import React, { Component, useState, useEffect } from 'react';
import axios from '../../../axios';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';

const AddStudent = ({ setAlert, ...props }) => {
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

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get('/students', {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      console.log(data);
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

  const addStudent = async event => {
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
      const response = await axios.post('/students', student, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      setAlert('Student added successfully', 'success');
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          setAlert(error.msg, 'error');
        });
      }
    }
  };

  const formElementsArray = [];

  for (let key in formData) {
    formElementsArray.push({
      name: key,
      ...formData[key]
    });
  }
  return (
    <div style={{ overflowX: 'hidden' }}>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-8 mx-auto">
          <form
            onSubmit={addStudent}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
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
            <Button type="submit" color="primary" variant="contained">
              Add Student
            </Button>
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
        />
      </div>
    );
  }
}

AddStudent.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(AddStudent);
