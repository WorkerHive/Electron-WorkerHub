import React from 'react';
import logo from './logo.svg';
import Sidebar from './components/sidebar';
import Devices from './views/devices';
import Profile from './views/profile';
import Projects from './views/projects';

import { BrowserRouter as Router , Route } from 'react-router-dom';

import './App.css';

const { ipcRenderer } = window.require('electron')

function App() {


  const [ devices, setDevices ] = React.useState([])

    ipcRenderer.on('devices-found', (event, arg) => {
      console.log(arg)
      let d = devices.concat(arg);
      setDevices(d)
    })
  React.useEffect(() => {
  }, [])
  

  return (
    <Router>
    <div className="App">
      <Sidebar />
      <div className="app-body">
        <Route path="/profile" component={Profile} />
        <Route path="/projects" component={Projects} />
        <Route path="/devices" render={(props) => (<Devices {...props} devices={devices}/>)} />
      </div>
    </div>
  </Router>
  );
}

export default App;
