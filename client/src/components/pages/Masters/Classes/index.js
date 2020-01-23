import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../../../actions/alert';

import { Primary } from '../../../Buttons';
import { InputText } from '../../../Inputs';
import { ListItem } from '../../../ListItem';
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
import { useEffect } from 'react';

const Classes = ({ setAlert, ...props }) => {
  const [values, setValues] = useState({ name: '', teacher: '' });
  const [classList, setClassList] = useState([]);
  const [utils, setUtils] = useState({ loading: false, isUpdating: false, selected: '' });

  const onNameChangeHandler = e => {
    setValues({ ...values, name: e.target.value });
  };

  const onTeacherChangeHandler = e => {
    setValues({ ...values, teacher: e.target.value });
  };

  const onCreateHandler = async () => {
    setUtils({ ...utils, loading: true });
    let result;
    try {
      result = await axios.post(
        'api/masters/class',
        { ...values },
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
    setAlert('Class added successfully', 'success');
    setValues({ name: '', teacher: '' });
    setUtils({ ...utils, loading: false });
    //console.log(result);
    setClassList([...classList, result]);
  };

  const onEditHandler = async id => {
    setUtils({ ...utils, loading: true, isUpdating: true, selected: id });
    const selectedClass = classList.filter(grade => grade._id === id)[0];
    setValues({ ...values, ...selectedClass });
  };

  const onUpdateHandler = async () => {
    let result;
    try {
      result = await axios.patch(
        `/api/masters/class/${utils.selected}`,
        { ...values },
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
    let updatedClassList = classList.filter(grade => grade._id !== result._id);
    updatedClassList = [...updatedClassList, result];
    //console.log('Updated', updatedClassList);
    setAlert('Class updated successfully', 'success');
    setValues({ ...values, name: '', teacher: '' });
    setUtils({ ...utils, isUpdating: false, loading: false, selected: '' });
    setClassList(updatedClassList);
  };

  const onCancelHandler = () => {
    setValues({ ...values, name: '', teacher: '' });
    setUtils({ ...utils, loading: false, isUpdating: false });
  };

  const onDeleteHandler = async id => {
    setUtils({ ...utils, loading: true });
    let result;
    try {
      result = await axios.delete(
        '/api/masters/class',
        {
          data: { deleteId: id }
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

    const updatedClassList = classList.filter(grade => grade._id !== result._id);
    setAlert('Class deleted successfully', 'success');
    setUtils({ ...utils, loading: false });
    setValues({ ...values, name: '', teacher: '' });
    setClassList(updatedClassList);
  };

  const fetchData = async () => {
    const { data } = await axios.get('api/masters/class', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    setClassList(data);
    //console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TabContainer>
        <TabHeader>
          <TabHeaderTitle>CLASSES</TabHeaderTitle>
        </TabHeader>
        <TabContent>
          <TabContent_Main>
            <InputText
              autoFocus
              type="text"
              value={values.name}
              onChange={onNameChangeHandler}
            >
              Class
            </InputText>
            <InputText
              type="text"
              value={values.teacher}
              onChange={onTeacherChangeHandler}
            >
              Teacher Incharge
            </InputText>

            {utils.isUpdating ? (
              <ButtonContainer>
                <Primary type="edit" onClick={onUpdateHandler}>
                  Update
                </Primary>
                <Primary type="cancel" onClick={onCancelHandler}>
                  Cancel
                </Primary>
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <Primary type="sucess" onClick={onCreateHandler}>
                  Create
                </Primary>
              </ButtonContainer>
            )}
          </TabContent_Main>
          <TabContent_Side>
            <h2>Class List</h2>
            <SideListContainer>
              {classList.map(grade => (
                <ListItem
                  key={grade._id}
                  onDelete={() => onDeleteHandler(grade._id)}
                  onEdit={() => onEditHandler(grade._id)}
                >
                  {grade.name}
                </ListItem>
              ))}
            </SideListContainer>
          </TabContent_Side>
        </TabContent>
      </TabContainer>
    </div>
  );
};

export default connect(null, { setAlert })(Classes);
