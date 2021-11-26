import {
  Modal,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
  ListItem,
  List,
  FormControl,
  InputLabel,
  //   Select,
  //   MenuItem
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const Input = styled('input')({
  display: 'none',
});

const CreateEvaluationFormModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.account.token);
  const { evaluation, open } = props;
  const account = useSelector((state) => state.account);
  const [values, setValues] = useState({
    comment: '',
    grade: null,
    applicationId: null,
    pass: ''
  });

  useEffect(() => {
    setValues({
      ...values, id: evaluation.id, accountId: account.id, name: account.account.name
    });
  }, [evaluation]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSaveHandler = () => {
    props.onClose('Create', values);
  };

  return(

  );
};

export default CreateEvaluationFormModal;

CreateEvaluationFormModal.propTypes = {
  evaluation:propTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string,
  open: PropTypes.bool,
};
