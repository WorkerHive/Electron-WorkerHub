import React from 'react';

import { Typography, List, ListItem } from '@material-ui/core';

import './index.css';



export default function Devices(props){

  return (
    <div className="devices">
      <Typography variant="h6">Devices</Typography>
      <List>
        {props.devices.map((x) => (
          <ListItem button>{x}</ListItem>
        ))}
      </List>
    </div>
  );
}
