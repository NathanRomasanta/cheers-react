'use client';
import React, { useState } from 'react';
import TopBar from '../CashOutScreen/TopBar';
import MainForm from './MainForm';

const AddToPosPage = () => {
  const [typeSelected, setTypeSelected] = useState('');
  return (
    <div className='flex  items-center h-screen'>
      <div className='flex w-screen justify-center items-center'>
        <MainForm
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
        />
      </div>
    </div>
  );
};

export default AddToPosPage;
