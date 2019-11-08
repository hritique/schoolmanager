import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import { IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const Alert = ({ alerts, enqueueSnackbar, closeSnackbar }) => {
  useEffect(() => {
    if (alerts.length > 0) {
      const alert = alerts.slice(-1)[0];
      enqueueSnackbar(alert.msg, {
        variant: alert.alertType,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        autoHideDuration: 1000,
        action: key => (
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            <CloseIcon />
          </IconButton>
        )
      });
    }
  });
  return null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(withSnackbar(Alert));
