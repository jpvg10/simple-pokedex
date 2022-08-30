import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ESpinnerSize } from '../utils/enums';
import './Spinner.css';

const useStyles = makeStyles({
  spinnerContainer: {
    textAlign: 'center',
    visibility: (props: any) => (props.show ? 'visible' : 'hidden'),
    '& .spin': {
      height: (props: any) => (props.size === ESpinnerSize.SM ? '15px' : '60px'),
      width: (props: any) => (props.size === ESpinnerSize.SM ? '15px' : '60px'),
      borderWidth: (props: any) => (props.size === ESpinnerSize.SM ? '2px' : '5px')
    }
  }
});

interface ISpinnerProps {
  show?: boolean;
  size?: ESpinnerSize;
}

const Spinner: React.FC<ISpinnerProps> = ({ show = true, size = ESpinnerSize.LG }) => {
  const classes = useStyles({ show, size });
  return (
    <div className={classes.spinnerContainer}>
      <div className="spin"></div>
    </div>
  );
};

export default Spinner;
