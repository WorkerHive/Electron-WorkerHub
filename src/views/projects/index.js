import React from 'react';

import { getProjects } from '../../actions/projectActions';
import { List, ListItem } from '@material-ui/core';

export default function Projects(props){
  const [ projects, setProjects ] = React.useState([])

  React.useEffect(() => {
    getProjects().then((projects) => {
      console.log(projects)
      setProjects(projects)
    })
  }, [])

  return (
    <div>
      <List>
        {projects.map((x) => (
          <ListItem button>{x.name}</ListItem>
        ))}
      </List>
    </div>
  );
}
