import React from 'react';

import {
  Paper,
  List,
  ListItem
} from "@material-ui/core";

import { withRouter } from 'react-router-dom';

function Sidebar(props){

  const menu = [
    {
      name: "Projects",
      path: "/projects"
    },
    {
      name: "Devices",
      path: "/devices"
    },
    {
      name: "Profile",
      path: "/profile"
    }
  ]

  return (
    <Paper>
      <List style={{width: 150}}>
        {menu.map((x) => (
          <ListItem button onClick={() => props.history.push(x.path)}>{x.name}</ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default withRouter(Sidebar)
