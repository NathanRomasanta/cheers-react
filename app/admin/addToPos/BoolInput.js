import CustomInputBox from './CustomInputBox';
import { useState } from 'react';

function BoolInput({ setBool }) {
  return (
    <CustomInputBox Headers='Liquor?'>
      <div>
        <div className='flex flex-row gap-4'>
          <h1>Yes</h1>
          <input
            type='checkbox'
            defaultChecked={false}
            className='checkbox border-indigo-600 bg-indigo-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 '
            onClick={() => {
              console.log('clicked yes');
              setBool(true);
            }}
          />

          <h1>No</h1>
          <input
            type='checkbox'
            defaultChecked={false}
            className='checkbox border-indigo-600 bg-indigo-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 '
            onClick={() => {
              console.log('clicked no');
              setBool(false);
            }}
          />
        </div>
      </div>
    </CustomInputBox>
  );
}

export default BoolInput;
