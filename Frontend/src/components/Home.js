import React from 'react'
import Notes from './Notes'
import { Navigate } from 'react-router-dom';

const Home = () => {
  if (!localStorage.getItem('safe-memo-token')) {
    Navigate('/');
}
  return (
    <div>
      <Notes/>
    </div>
  )
}

export default Home
