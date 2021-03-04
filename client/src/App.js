import React, { Fragment } from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
}

export default App;
