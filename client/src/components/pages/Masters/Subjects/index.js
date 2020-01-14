import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../../../actions/alert';

import { Primary } from '../../../Buttons';
import { InputText } from '../../../Inputs';
import { ListItem } from '../../../ListItem';
import { Menu } from '../../../Inputs/Select';
import {
  TabContainer,
  TabHeader,
  TabHeaderTitle,
  TabContent,
  TabContent_Main,
  TabContent_Side,
  ButtonContainer,
  SideListContainer
} from './utils';

const Subjects = ({ setAlert, ...props }) => {
  const [values, setValues] = useState({ name: '', priority: '' });
  const [classList, setClassList] = useState([]);
  const [utils, setUtils] = useState({
    loading: false,
    selectedClass: '',
    isUpdating: false,
    selectedSubject: ''
  });

  const fetchData = async () => {
    const { data } = await axios.get('api/masters/class', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    setClassList(data);
    //console.log(data);
  };

  const onNameChangeHandler = e => {
    setValues({ ...values, name: e.target.value });
  };

  const onPriorityChangeHandler = e => {
    setValues({ ...values, priority: e.target.value });
  };

  const onClassSelectHandler = classId => {
    if (classId !== '') {
      const selectedClass = classList.filter(grade => grade._id === classId)[0];
      setUtils({ ...utils, selectedClass });
      const priority = selectedClass.subjects.length + 1;
      setValues({ ...values, priority });
    }
  };

  const onCreateClickHandler = async () => {
    setUtils({ ...utils, loading: true });
    let result;
    try {
      result = await axios.post(
        'api/masters/subject',
        { classId: utils.selectedClass._id, ...values },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );
      result = result.data;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          setAlert(error.msg, 'error');
        });
      }
      setUtils({ ...utils, loading: false });
      return;
    }
    setAlert('Subject added successfully', 'success');

    setUtils({
      ...utils,
      loading: false,
      selectedClass: result
    });

    const priority = result.subjects.length + 1;
    setValues({ name: '', priority });

    let updatedClassList = classList.filter(grade => grade._id !== result._id);
    updatedClassList = [...updatedClassList, result];
    //console.log(updatedClassList);
    setClassList(updatedClassList);
    //console.log(result);
  };

  const onDeleteHandler = async (classId, subjectId) => {
    setUtils({ ...utils, loading: true });
    let result;
    try {
      result = await axios.delete(
        '/api/masters/subject',
        {
          data: { classId, subjectId }
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );
      result = result.data;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          setAlert(error.msg, 'error');
        });
      }
      setUtils({ ...utils, loading: false });
      return;
    }
    //console.log(result);
    setUtils({
      ...utils,
      loading: false,
      selectedClass: result
    });
    setAlert('Subject deleted successfully', 'success');
    const priority = result.subjects.length + 1;
    setValues({ name: '', priority });
    let updatedClassList = classList.filter(grade => grade._id !== result._id);
    updatedClassList = [...updatedClassList, result];
    console.log(updatedClassList);
    setClassList(updatedClassList);
  };

  const onEditClickHandler = async id => {
    const selectedSubject = utils.selectedClass.subjects.filter(
      subject => subject._id === id
    )[0];
    setUtils({ ...utils, isUpdating: true, selectedSubject });
    setValues({ name: selectedSubject.name, priority: selectedSubject.priority });
  };

  const onUpdateClickHandler = async () => {
    setUtils({ ...utils, loading: true });
    let result;
    try {
      result = await axios.patch(
        '/api/masters/subject',
        {
          classId: utils.selectedClass._id,
          subjectId: utils.selectedSubject._id,
          values
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );
      result = result.data;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          setAlert(error.msg, 'error');
        });
      }
      setUtils({ ...utils, loading: false });
      return;
    }
    //console.log(result);
    setUtils({
      ...utils,
      loading: false,
      selectedClass: result,
      selectedSubject: ''
    });
    setAlert('Subject updated successfully', 'success');
    const priority = result.subjects.length + 1;
    setValues({ name: '', priority });
    let updatedClassList = classList.filter(grade => grade._id !== result._id);
    updatedClassList = [...updatedClassList, result];
    console.log(updatedClassList);
    setClassList(updatedClassList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TabContainer>
        <TabHeader>
          <TabHeaderTitle>Subjects</TabHeaderTitle>
        </TabHeader>
        <TabContent>
          <TabContent_Main>
            <Menu
              value={classList}
              onChange={event => onClassSelectHandler(event.target.value)}
              disabled={utils.selectedClass !== ''}
              selected={utils.selectedClass === '' ? '' : utils.selectedClass._id}
            >
              Class
            </Menu>
            {utils.selectedClass !== '' && (
              <div>
                <InputText type="text" value={values.name} onChange={onNameChangeHandler}>
                  Subject
                </InputText>
                <InputText
                  type="text"
                  value={values.priority}
                  onChange={onPriorityChangeHandler}
                >
                  Priority
                </InputText>
                {utils.selectedSubject === '' ? (
                  <ButtonContainer>
                    <Primary type="sucess" onClick={onCreateClickHandler}>
                      Create
                    </Primary>
                    <Primary
                      type="cancel"
                      onClick={() => {
                        setUtils({ ...utils, selectedClass: '' });
                      }}
                    >
                      Cancel
                    </Primary>
                  </ButtonContainer>
                ) : (
                  <ButtonContainer>
                    <Primary type="edit" onClick={onUpdateClickHandler}>
                      Update
                    </Primary>
                    <Primary
                      type="cancel"
                      onClick={() => {
                        setValues({ name: '', priority: '' });
                        setUtils({ ...utils, isUpdating: false, selectedSubject: '' });
                      }}
                    >
                      Cancel
                    </Primary>
                  </ButtonContainer>
                )}
              </div>
            )}
          </TabContent_Main>

          {utils.selectedClass === '' ? (
            <TabContent_Side>
              <h2>Class List</h2>
              <SideListContainer>
                {classList.map(grade => (
                  <ListItem
                    key={grade._id}
                    //onDelete={() => onDeleteHandler(grade._id)}
                    //onEdit={() => onEditHandler(grade._id)}
                  >
                    {grade.name}
                  </ListItem>
                ))}
              </SideListContainer>
            </TabContent_Side>
          ) : (
            <TabContent_Side>
              <h2>Subjects</h2>
              <SideListContainer>
                {utils.selectedClass.subjects.map(subject => (
                  <ListItem
                    key={subject._id}
                    onDelete={() => onDeleteHandler(utils.selectedClass._id, subject._id)}
                    onEdit={() => onEditClickHandler(subject._id)}
                  >
                    {subject.name}
                  </ListItem>
                ))}
              </SideListContainer>
            </TabContent_Side>
          )}
        </TabContent>
      </TabContainer>
    </div>
  );
};

export default connect(null, { setAlert })(Subjects);
