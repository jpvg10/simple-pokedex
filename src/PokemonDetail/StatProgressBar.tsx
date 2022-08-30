import React from 'react';
import { IStat } from '../utils/interfaces';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  p: {
    textTransform: 'capitalize',
    marginBottom: '0'
  },
  container: {
    height: '21px',
    width: '200px',
    marginBottom: '15px',
    backgroundColor: '#D2D2FB',
    borderRadius: '4px'
  },
  filler: {
    height: '100%',
    width: (props: any) => (props.baseStat / 140) * 200,
    backgroundColor: '#5F5FFD',
    color: 'white',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    '& p': {
      paddingLeft: '6px',
      marginBottom: '0',
      fontSize: '14px'
    }
  }
});

const StatProgressBar: React.FC<IStat> = ({ name, baseStat }) => {
  const classes = useStyles({ baseStat });
  return (
    <React.Fragment>
      <p className={classes.p}>{name}</p>
      <div className={classes.container}>
        <div className={classes.filler}>
          <p>{baseStat}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatProgressBar;
