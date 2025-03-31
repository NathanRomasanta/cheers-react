import React, { useEffect, useState } from 'react';
import CustomInputBox from './CustomInputBox';
import BoolInput from './BoolInput';
import fetchItems from './fetch-Items';

function SubForm({
  ingredientName,
  setIngredientName,
  ingredientIsLiquor,
  setIngredientIsLiquor,
  ingredientOunces,
  setIngredientOunces,
  CreateID,
}) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchItems();
        setItems(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const [items, setItems] = useState([]);
  return (
    <div>
      <CustomInputBox Headers={[' Name :', 'Liquor ?']}>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn m-1'>
            Ingredient Name
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
            {items.map((item) => (
              <li
                key={item.id}
                className='hover:bg-gray-200 cursor-pointer'
                onClick={() => setIngredientName(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <BoolInput
          setBool={setIngredientIsLiquor}
          Boolean={ingredientIsLiquor}
        />
      </CustomInputBox>
      {ingredientIsLiquor ? (
        <CustomInputBox Headers={[' Ounces:']}>
          <input
            type='number'
            className='input input-bordered w-1/2'
            placeholder=' 0'
            value={ingredientOunces}
            onChange={(e) => {
              const value = Math.max(0, e.target.value);
              console.log('Oz :', value);
              setIngredientOunces(value);
            }}
          />
        </CustomInputBox>
      ) : null}
    </div>
  );
}

export default SubForm;
