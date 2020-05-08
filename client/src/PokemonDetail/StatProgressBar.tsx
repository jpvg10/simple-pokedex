import React from 'react';
import { IStat } from '../utils/interfaces';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  p: {
    textTransform: 'capitalize',
    marginBottom: '0'
  },
  container: {
    height: '24px',
    width: '200px',
    border: '1px solid black',
    marginBottom: '15px'
  },
  filler: {
    height: '100%',
    width: (props: any) => (props.baseStat / 140) * 200,
    backgroundColor: 'blue',
    color: 'white',
    paddingLeft: '10px',
    '& p': {
      marginBottom: '0'
    }
  }
});

const StatProgressBar: React.FC<IStat> = ({ name, baseStat }) => {
  const classes = useStyles({ baseStat });
  return (
    <React.Fragment>
      <Typography paragraph className={classes.p}>
        {name}
      </Typography>
      <div className={classes.container}>
        <div className={classes.filler}>
          <Typography paragraph>{baseStat}</Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatProgressBar;
