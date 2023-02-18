import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import AddNewPatient from './component/AddNewPatient';
import HomePage from './component/HomePage';
import Protected from './component/Protected';

import Signin from './component/Signin';

import { auth } from './lib/config';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/add' element = {
          <Protected >
             <AddNewPatient/> 
          </Protected>
        }/>
        <Route path='/' element = {
          <Protected >
             <HomePage/> 
          </Protected>
        }/>
      </Routes>
    </div>
  );
}

export default App;
