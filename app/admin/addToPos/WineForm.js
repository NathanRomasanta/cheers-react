import React, { useState } from 'react';
import CustomInputBox from './CustomInputBox';
import BoolInput from './BoolInput';
import TopForm from './TopForm';
import AddPosItem from './Add-PosItem';

const CreateID = (str) => {
  let idNumber = Math.floor(Math.random() * 100);

  return `${str
    .replace(/\s+/g, '')
    .replace(/[aeiouAEIOU]/g, '')
    .trim()}-00${idNumber}`;
};

const CreatePosItem = (name, price, category, isLiquor, ounces) => {
  let ingredients = [
    {
      id: CreateID(name),
      isLiquor: true,
      name: name,
      ounces: ounces,
    },
  ];
  let PosItem = {
    ingredients: ingredients,
    price: price,
    name: name,
    category: category,
  };

  return PosItem;
};

function WineForm({ typeSelected, setTypeSelected }) {
  const [isLiquor, setIsLiquor] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  //
  const [category, setCategory] = useState('');
  const [ounces, setOunces] = useState('');
  return (
    <TopForm>
      <div className='form'>
        <CustomInputBox Headers={[' Name :', 'Price :']}>
          <input
            type='text'
            className='input input-bordered w-1/2'
            placeholder='Item Name'
            value={name}
            onChange={(e) => {
              console.log('Name :', e.target.value);
              console.log(CreateID(e.target.value));
              setCategory(String(typeSelected.id));
              setName(e.target.value);
            }}
          />
          <input
            type='number'
            className='input input-bordered w-1/2'
            placeholder='Price'
            value={price}
            onChange={(e) => {
              console.log('Price :', e.target.value);
              setPrice(Math.max(0, e.target.value)); // Ensure value is not below 0
            }}
          />
          {typeSelected.id === 'food' ? null : (
            <div className='flex flex-row gap-44 w-full'>
              <label className='label'>Ounces</label>
              <input
                type='number'
                className='input input-bordered w-1/2'
                placeholder='Oz'
                value={ounces}
                onChange={(e) => {
                  // Ensure value is not below 0

                  setOunces(Math.max(0, e.target.value));
                }}
              />
            </div>
          )}
        </CustomInputBox>

        <div className='flex flex-row gap-4 m-5 justify-around'>
          <button
            className='btn  bg-orange-500 text-white hover:bg-orange-600'
            onClick={() => {
              if (name === '' || price === 0 || category === '') {
                alert('Please fill out all fields');
                return;
              }
              if (!isLiquor && ounces === 0) {
                alert(
                  'Please check if liquor and number of ounces are filled out correctly'
                );
                return;
              }
              console.log('Create Item');
              let item = CreatePosItem(name, price, category, isLiquor, ounces);

              console.log(item);
              alert('Item Created');
              AddPosItem(item);

              // Clear the states
              setName('');
              setPrice('');
              setCategory('');
              setOunces('');
              setIsLiquor(null);
            }}>
            Create Item
          </button>
          <button
            className='btn  bg-orange-500 text-white hover:bg-orange-600'
            onClick={() => setTypeSelected('')}>
            Back
          </button>
        </div>
      </div>
    </TopForm>
  );
}

export default WineForm;
