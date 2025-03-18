'use client';
import { use, useEffect, useState } from 'react';

import fetchBaristas from './FetchBaristas';
import fetchBaristaDates from './FetchBaristaDates';

// icons
import {
  EllipsisVertical,
  Martini,
  CalendarArrowDown,
  Search,
} from 'lucide-react';

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
  const [toastMessage, setToastMessage] = useState(''); // State for toast message
  const [showToast, setShowToast] = useState(false); // State to control toast visibility

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

  const CustomAlert = ({ message }) => {
    return (
      <div className='toast toast-top toast-center absolute top-0 z-50 '>
        <div className='alert bg-orange-500 text-white '>
          <span>{message}</span>
        </div>
      </div>
    );
  };

  const handleDateSelection = (dateId) => {
    setSelectedDate(dateId);
    setToastMessage(`Data selected: ${dateId} `); // Set the toast message
    setShowToast(true); // Show the toast
    setTimeout(() => setShowToast(false), 2000); // Hide the toast after 3 seconds
  };
  const handleBaristaSelection = (baristaId) => {
    setSelectedBarista(baristaId);
    setToastMessage(`Barista selected: ${baristaId} `); // Set the toast message
    setShowToast(true); // Show the toast
    setTimeout(() => setShowToast(false), 2000); // Hide the toast after 3 seconds
  };

  return (
    <div className='navbar bg-base-100 shadow-sm sticky top-0 z-50'>
      {showToast && <CustomAlert message={toastMessage} />}
      {/* Render toast if visible */}
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
              <div className='dropdown dropdown-right dropdown-end'>
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
                  className='btn bg-orange-400 bg-opacity-35 m-1 mb-2 hover:bg-opacity-100'>
                  Dates
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
                  {dateList.map((date, index) => (
                    <li key={index}>
                      <a
                        onClick={() => handleDateSelection(date.id)} // Call the handler
                      >
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
      {/* large view menu */}
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <div className='dropdown dropdown-bottom dropdown-end mr-5'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-outline btn-warning  hover:bg-orange-400 hover:bg-opacity-35 m-1 mb-2  rounded-xl'>
              Barista
              <Martini size={12} />
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
              {baristaList.map((barista, index) => (
                <li key={index}>
                  <a
                    onClick={() => {
                      handleBaristaSelection(barista.id); // Call the handler
                    }} // Call the handler
                  >
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
                className=' btn btn-ghost  hover:bg-orange-400 hover:bg-opacity-35 m-1 mb-2  rounded-xl'>
                Dates
                <CalendarArrowDown size={12} />
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
                {dateList.map((date, index) => (
                  <li key={index}>
                    <a
                      onClick={() => handleDateSelection(date.id)} // Call the handler
                    >
                      {date.id}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                className='btn btn-ghost  hover:bg-orange-400 hover:bg-opacity-35 m-1 mb-2  rounded-xl'
                onClick={() => {
                  setSwitchSearch(!switchSearch);
                  setTimeout(() => {
                    setSwitchSearch(false);
                    setSelectedDate('');
                    setSelectedBarista('');
                  }, 1000);
                }}>
                Search
                <Search size={12} />
              </button>
            </div>
          )}
        </ul>
      </div>
      <div className='navbar-end'></div>
    </div>
  );
}
