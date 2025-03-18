'use client';
import { use, useEffect, useState } from 'react';

import fetchBaristas from './FetchBaristas';
import fetchBaristaDates from './FetchBaristaDates';

// icons
import { EllipsisVertical } from 'lucide-react';

export default function TopBar({
  setSelectedBarista,
  setSelectedDate,
  selectedBarista,
  setSwitchSearch,
  switchSearch,
}) {
  // Added Sign Out functionality
  const [baristaList, setBaristaList] = useState([]);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    const FetchBaristas = async () => {
      const fetchedBaristas = await fetchBaristas();
      setBaristaList(fetchedBaristas);
    };
    FetchBaristas();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      if (selectedBarista) {
        const fetchedDates = await fetchBaristaDates(selectedBarista);
        console.log('fetchedDates', fetchedDates);
        setDateList(fetchedDates);
      }
    };
    fetchDates();
  }, [selectedBarista]);

  return (
    <div className='navbar bg-base-100 shadow-sm sticky top-0 z-50'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost lg:hidden'>
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
              <EllipsisVertical size={27} />
            </svg>
          </div>
          {/* for small menu */}
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            <li>
              <div className='dropdown dropdown-right dropdown-end  '>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-sm btn-ghost m-1 mb-2'>
                  Barista
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
                  {baristaList.map((barista, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          let strippedBarista = barista.id.replace(/ /g, '');
                          console.log('strippedBarista', strippedBarista);
                          setSelectedBarista(strippedBarista);
                        }}>
                        {barista.id}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {selectedBarista && (
              <div className='dropdown dropdown-start'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn m-1'>
                  Dates
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
                  {dateList.map((date, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          console.log('date.id', date.id);
                          setSelectedDate(date.id);
                        }}>
                        {date.id}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
      {/* for large menu */}

      <div className='navbar-center hidden lg:flex '>
        <ul className='menu menu-horizontal px-1'>
          <div className='dropdown dropdown-bottom dropdown-end mr-5 '>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-sm btn-ghost m-1 mb-2 btn-warning'>
              Barista
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
              {baristaList.map((barista, index) => (
                <li key={index}>
                  <a
                    onClick={() => {
                      let strippedBarista = barista.id.replace(/ /g, '');
                      console.log('strippedBarista', strippedBarista);
                      setSelectedBarista(strippedBarista);
                    }}>
                    {barista.id}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {selectedBarista && (
            <div className='dropdown dropdown-start'>
              <div
                tabIndex={0}
                role='button'
                className='btn m-1 btn-sm btn-ghost btn-warning'>
                Dates
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
                {dateList.map((date, index) => (
                  <li key={index}>
                    <a
                      onClick={() => {
                        console.log('date', date.id);
                        setSelectedDate(date.id);
                      }}>
                      {date.id}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                className='btn btn-sm btn-outline btn-warning'
                onClick={() => {
                  setSwitchSearch(!switchSearch);
                  setTimeout(() => {
                    setSwitchSearch(false);
                    setSelectedDate('');
                    setSelectedBarista('');
                  }, 1000);
                }}>
                search
              </button>
            </div>
          )}
        </ul>
      </div>
      <div className='navbar-end'></div>
    </div>
  );
}
