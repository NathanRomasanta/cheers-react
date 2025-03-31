'use client';
import React, { useState } from 'react';

import MainForm from './MainForm';
import AddToPosNav from './AddPosNav';

const AddToPosPage = () => {
  const [typeSelected, setTypeSelected] = useState('');
  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 h-full w-full'>
      <div className=' h-full w-full mx-auto bg-white p-8 rounded-lg shadow-md '>
        <h1 className='text-2xl font-bold mb-4 text-black'>
          Create New POS Item
        </h1>
        {!typeSelected && (
          <AddToPosNav
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
          />
        )}

        <MainForm
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
        />
      </div>
    </div>
  );
};

export default AddToPosPage;
