import CustomInputBox from './CustomInputBox';
import { useState } from 'react';

function BoolInput({ setBool, Boolean }) {
  const [checked, setChecked] = useState(Boolean);

  const handleYesClick = () => {
    setChecked(true);
    setBool(true);
  };

  const handleNoClick = () => {
    setChecked(false);
    setBool(false);
  };

  return (
    <CustomInputBox>
      <div>
        <div className='flex flex-row gap-4'>
          <h1>Yes</h1>
          <input
            type='checkbox'
            checked={checked}
            className='checkbox border-indigo-600 bg-indigo-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 '
            onChange={handleYesClick}
          />

          <h1>No</h1>
          <input
            type='checkbox'
            checked={!checked}
            className='checkbox border-indigo-600 bg-indigo-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 '
            onChange={handleNoClick}
          />
        </div>
      </div>
    </CustomInputBox>
  );
}

export default BoolInput;
