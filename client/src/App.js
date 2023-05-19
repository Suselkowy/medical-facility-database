import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Patient from './components/Patient';
import Staff from './components/Staff';
import Room from './components/Room';
import Ambulance from './components/Ambulance';
import Appointment from './components/Appointment';
import Bill from './components/Bill';
import AmbulanceCall from './components/AmbulanceCall';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/patients">
          <Patient />
        </Route>
        <Route path="/staff">
          <Staff />
        </Route>
        <Route path="/rooms">
          <Room />
        </Route>
        <Route path="/ambulances">
          <Ambulance />
        </Route>
        <Route path="/appointments">
          <Appointment />
        </Route>
        <Route path="/bills">
          <Bill />
        </Route>
        <Route path="/ambulanceCalls">
          <AmbulanceCall />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
