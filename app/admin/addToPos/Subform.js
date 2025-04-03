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
  cocktailIngredients,
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
      <fieldset className='fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box'>
        <legend className='fieldset-legend'>
          Ingredient {cocktailIngredients.length + 1}
        </legend>
        <label className='fieldset-label relative left-36'>
          Ingredient Name :
        </label>
        <div className='dropdown dropdown-top relative left-36'>
          <div
            tabIndex={0}
            role='button'
            className='flex flex-row justify-center items-center border-orange-400 bg-orange-500  hover:text-black  hover:bg-orange-400   rounded-xl px-2 py-3 text-white font-semibold  gap-2 w-1/2'>
            Ingredient Name
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-orange-400  rounded-box z-1 w-52 p-2 shadow-sm text-white'>
            {items.map((item) => (
              <li
                key={item.id}
                className='hover:text-black cursor-pointer'
                onClick={() => setIngredientName(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <label className='fieldset-label relative left-36'>
          Is this item an Alcoholic product?{' '}
        </label>
        <BoolInput
          setBool={setIngredientIsLiquor}
          Boolean={ingredientIsLiquor}
        />

        {ingredientIsLiquor ? (
          <div>
            <label className='fieldset-label relative left-36'>Ounces</label>
            <input
              type='number'
              className='input input-bordered w-1/3 relative left-52'
              placeholder=' 0'
              value={ingredientOunces}
              onChange={(e) => {
                const value = Math.max(0, e.target.value);
                console.log('Oz :', value);
                setIngredientOunces(value);
              }}
            />
          </div>
        ) : null}
      </fieldset>
    </div>
  );
}

export default SubForm;
