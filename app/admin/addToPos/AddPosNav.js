import React, { useEffect, useState } from 'react';
import fetchDrinkTypes from './fetch-DrinkTypes';

function AddToPosNav({ setTypeSelected }) {
  const [drinkTypes, setDrinkTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const fetchedDrinkTypes = await fetchDrinkTypes();
      setDrinkTypes(fetchedDrinkTypes);
    };
    fetchTypes();
  }, []);
  return (
    // small screen nav
    <div className='navbar bg-base-100 shadow-sm sticky top-0 z-50'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
      {/* large screen nav */}

      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <details>
              <summary className='bg-orange-500 bg-opacity-25 hover:bg-opacity-75'>
                Categories
              </summary>
              <ul className='p-2'>
                {drinkTypes.map((drinkType) => (
                  <li key={drinkType.id}>
                    <a onClick={() => setTypeSelected(drinkType)}>
                      {drinkType.id}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddToPosNav;
