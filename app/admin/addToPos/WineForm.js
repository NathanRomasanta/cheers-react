import React, { useState, useEffect } from 'react';
import CustomInputBox from './CustomInputBox';

import TopForm from './TopForm';
import AddPosItem from './Add-PosItem';

import fetchWines from './fetch-Wines';
import fetchBeers from './fetch-Beers';
import fetchFoods from './fetch-Foods';
import { ArrowUpFromDot, CaseUpper } from 'lucide-react';

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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      switch (typeSelected.id) {
        case 'wines':
          setCategory('wines');
          try {
            const items = await fetchWines();
            setItems(items);
          } catch (error) {
            console.error('Error fetching wines:', error);
          }
          break;

        case 'beers':
          setCategory('beers');
          try {
            const items = await fetchBeers();
            setItems(items);
          } catch (error) {
            console.error('Error fetching beers:', error);
          }
          break;
        case 'food':
          setCategory('food');
          try {
            const items = await fetchFoods();
            setItems(items);
          } catch (error) {
            console.error('Error fetching foods:', error);
          }
          break;

        default:
          console.warn('Unknown type selected:', typeSelected.id);
          break;
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount
  return (
    <TopForm>
      <div className=' items-center justify-center gap-5'>
        <fieldset className='fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box '>
          <legend className='fieldset-legend'>
            Add Item to Point of Sale System in the{' '}
            {typeSelected.id.charAt(0).toUpperCase() + typeSelected.id.slice(1)}{' '}
            category
          </legend>

          <label className='fieldset-label relative left-36'>Name</label>
          <div className='dropdown dropdown-top relative left-36'>
            <div
              tabIndex={0}
              role='button'
              className='flex flex-row justify-center items-center border-orange-400 bg-orange-500  hover:text-black  hover:bg-orange-400   rounded-xl px-2 py-3 text-white font-semibold  gap-2 w-1/2'>
              <ArrowUpFromDot size={15} />
              Item Name
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-orange-400  rounded-box z-1 w-52 p-2 shadow-sm text-white '>
              {items.map((item) => (
                <li
                  key={item.id}
                  className='hover:text-black cursor-pointer'
                  onClick={() => {
                    setName(item.name);
                  }}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <label className='fieldset-label relative left-36'>Price</label>
          <input
            type='number'
            className='input input-bordered w-1/4 relative left-36'
            placeholder='Price'
            value={price}
            onChange={(e) => {
              console.log('Price :', e.target.value);
              setPrice(Math.max(0, e.target.value)); // Ensure value is not below 0
            }}
          />
          {typeSelected.id === 'food' ? null : (
            <div>
              <label className='fieldset-label relative left-36'>
                Ounces :
              </label>
              <input
                type='number'
                className='input input-bordered w-1/4 relative left-36 '
                placeholder='Oz'
                value={ounces}
                onChange={(e) => {
                  // Ensure value is not below 0

                  setOunces(Math.max(0, e.target.value));
                }}
              />
            </div>
          )}

          <div className='flex flex-row gap-4 m-5 justify-center w-1/2  relative left-24'>
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
                let item = CreatePosItem(
                  name,
                  price,
                  category,
                  isLiquor,
                  ounces
                );

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
        </fieldset>
      </div>
    </TopForm>
  );
}

export default WineForm;
