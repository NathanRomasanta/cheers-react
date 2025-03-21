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
      isLiquor: isLiquor,
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
        <CustomInputBox Headers={[' Name :', 'Price :', 'Oz :']}>
          <input
            type='text'
            className='input input-bordered w-1/2'
            placeholder='Item Name'
            value={name}
            onChange={(e) => {
              console.log('Name :', e.target.value);
              console.log(CreateID(e.target.value));
              setCategory(String(typeSelectedsetTypeSelected.id));
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
              setPrice(e.target.value);
            }}
          />
          <input
            type='number'
            className='input input-bordered w-1/2'
            placeholder='Oz'
            value={ounces}
            onChange={(e) => {
              console.log('Oz :', e.target.value);
              setOunces(e.target.value);
            }}
          />
        </CustomInputBox>
        <BoolInput setBool={setIsLiquor} />
        <div className='flex flex-row gap-4 m-5 justify-around'>
          <button
            className='btn btn-primary'
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
            className='btn btn-primary'
            onClick={() => setTypeSelectedsetTypeSelected('')}>
            Back
          </button>
        </div>
      </div>
    </TopForm>
  );
}

export default WineForm;
