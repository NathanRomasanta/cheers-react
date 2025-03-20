import { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomInputBox from './CustomInputBox';

import AddToPosNav from './AddPosNav';
import AddPosItem from './Add-PosItem';

function MainForm({ typeSelected, setTypeSelected }) {
  const [isLiquor, setIsLiquor] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [ounces, setOunces] = useState(0);

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

  if (typeSelected === '') {
    return (
      <div className='flex flex-col w-full items-center  h-screen'>
        <AddToPosNav
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
        />
        <div className='flex flex-col h-screen items-center justify-center'>
          <h1 className='text-3xl font-bold'>Select Item Type to Continue</h1>
          <span className='loading loading-bars loading-xl bg-gradient-to-r from-zinc-700  to-orange-500 '></span>
        </div>
      </div>
    );
  }

  return (
    <div className='card card-side bg-base-100 shadow-sm  w-11/12'>
      <figure>
        <Image
          src={'/images/cheers.jpg'}
          alt={'Cheers to the future.'}
          width={500}
          height={300}
        />
      </figure>
      <div className='card-body justify-center  gap-5'>
        <h2 className='card-title '>Add Item to Point Of Sale System</h2>

        <div className='form'>
          <CustomInputBox Headers={[' Name :', 'Price :', 'Oz :']}>
            <input
              type='text'
              className='input input-bordered w-1/2'
              placeholder='Item Name'
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
              onChange={(e) => {
                console.log('Price :', e.target.value);
                setPrice(e.target.value);
              }}
            />
            <input
              type='number'
              className='input input-bordered w-1/2'
              placeholder='Oz'
              onChange={(e) => {
                console.log('Oz :', e.target.value);
                setOunces(e.target.value);
              }}
            />
          </CustomInputBox>
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
                    setIsLiquor(true);
                  }}
                />

                <h1>No</h1>
                <input
                  type='checkbox'
                  defaultChecked={false}
                  className='checkbox border-indigo-600 bg-indigo-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 '
                  onClick={() => {
                    console.log('clicked no');
                    setIsLiquor(false);
                  }}
                />
              </div>
            </div>
          </CustomInputBox>
          <div className='flex flex-row gap-4 border-4 justify-around'>
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
                let item = CreatePosItem(
                  name,
                  price,
                  category,
                  isLiquor,
                  ounces
                );
                setPrice(0);
                setName('');
                setOunces(0);
                setIsLiquor(false);
                console.log(item);
                AddPosItem(item);
              }}>
              Create Item
            </button>
            <button
              className='btn btn-primary'
              onClick={() => setTypeSelected('')}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainForm;
