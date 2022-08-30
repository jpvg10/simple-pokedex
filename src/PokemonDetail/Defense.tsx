import React from 'react';
import { makeStyles } from '@material-ui/core';
import TypeLabel from './TypeLabel';
import { IDefense } from '../utils/interfaces';

const useStyles = makeStyles({
  div: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    '& p': {
      marginBottom: '0'
    }
  }
});

const Defense: React.FC<IDefense> = ({ type, value }) => {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <TypeLabel type={type} />
      <p>x {value}</p>
    </div>
  );
};

export default Defense;
