import React from 'react';
import { IStat } from '../utils/interfaces';

const StatProgressBar: React.FC<IStat> = ({ name, baseStat }) => {
  return (
    <React.Fragment>
      <p>{name}</p>
      <p>{baseStat}</p>
    </React.Fragment>
  );
};

export default StatProgressBar;
