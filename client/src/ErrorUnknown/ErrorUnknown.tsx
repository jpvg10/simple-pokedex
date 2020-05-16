import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';

const ErrorUnknown: React.FC = () => {
  return (
    <React.Fragment>
      <ErrorIcon fontSize="large" color="error" />
      <p>An unknown error occured. Please try again later.</p>
    </React.Fragment>
  );
};

export default ErrorUnknown;
