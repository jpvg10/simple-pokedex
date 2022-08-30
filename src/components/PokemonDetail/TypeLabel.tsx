import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const colors = {
  bug: '#ab2',
  dark: '#754',
  dragon: '#76e',
  electric: '#fc3',
  fairy: '#e9e',
  fighting: '#b54',
  fire: '#f42',
  flying: '#89f',
  ghost: '#66b',
  grass: '#7c5',
  ground: '#db5',
  ice: '#6cf',
  normal: '#aa9',
  poison: '#a59',
  psychic: '#f59',
  rock: '#ba6',
  steel: '#aab',
  water: '#39f'
};

const useStyles = makeStyles({
  root: {
    backgroundColor: (props: any) => (colors as any)[props.type],
    color: 'white !important',
    marginRight: '15px',
    '& span': {
      lineHeight: '24px'
    }
  }
});

const TypeLabel: React.FC<{ type: string }> = ({ type }) => {
  const classes = useStyles({ type });
  return (
    <Button disabled className={classes.root}>
      {type}
    </Button>
  );
};

export default TypeLabel;
