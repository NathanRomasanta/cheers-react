import React, { useEffect, useState } from 'react';
import fetchDrinkTypes from './fetch-DrinkTypes';
import { EllipsisVertical } from 'lucide-react';

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
    <div className='navbar  sticky top-0 z-50'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost lg:hidden'>
            <EllipsisVertical size={25} />
            Categories
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-gradient-to-br from-orange-50 to-orange-200 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            <li>
              <details>
                <ul className='border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400   rounded-xl'>
                  {drinkTypes.map((drinkType) => (
                    <li key={drinkType.id}>
                      <a
                        className='hover:text-white'
                        onClick={() => setTypeSelected(drinkType)}>
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
      {/* large screen nav */}

      <div className='navbar-center hidden lg:flex '>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <details>
              <summary className='  border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400   rounded-xl relative right-16'>
                Categories
              </summary>
              <ul className='menu menu-md dropdown-content bg-gradient-to-b from-white via-slate-50 to-orange-200 rounded-box z-1 mt-3 w-28 p-2 shadow'>
                <div className='border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400   rounded-xl'>
                  {drinkTypes.map((drinkType) => (
                    <li key={drinkType.id}>
                      <a
                        className='hover:text-white hover:bg-inherit'
                        onClick={() => setTypeSelected(drinkType)}>
                        {drinkType.id.charAt(0).toUpperCase() +
                          drinkType.id.slice(1)}
                      </a>
                    </li>
                  ))}
                </div>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddToPosNav;
