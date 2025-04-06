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
  selectedDate,
}) {
  const [baristaList, setBaristaList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [toastMessage, setToastMessage] = useState(''); // State for toast message
  const [showToast, setShowToast] = useState(false); // State to control toast visibility

  useEffect(() => {
    const FetchBaristas = async () => {
      try {
        const fetchedBaristas = await fetchBaristas();
        setBaristaList(fetchedBaristas);
      } catch (error) {
        console.error('Error fetching baristas:', error);
        setToastMessage('Failed to fetch baristas. Please try again.'); // Set error toast message
        setShowToast(true); // Show the toast
        setTimeout(() => setShowToast(false), 2000); // Hide the toast after 2 seconds
      }
    };
    FetchBaristas();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      if (selectedBarista) {
        try {
          const fetchedDates = await fetchBaristaDates(selectedBarista);
          console.log('fetchedDates', fetchedDates);
          setDateList(fetchedDates);
        } catch (error) {
          console.error('Error fetching dates:', error);
          setToastMessage('Failed to fetch dates. Please try again.'); // Set error toast message
          setShowToast(true); // Show the toast
          setTimeout(() => setShowToast(false), 2000); // Hide the toast after 2 seconds
        }
      }
    };
    fetchDates();
  }, [selectedBarista]);

  const CustomAlert = ({ message }) => {
    return (
      <div className='toast toast-top toast-center absolute top-0 sm:left-1/4 lg:left-3/4 z-50 sm:translate-x-1/3 lg:translate-x-1/3 '>
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
    <div className='navbar  sm:w-20 lg:w-screen relative top-0 z-50  h-20 '>
      {showToast && <CustomAlert message={toastMessage} />}
      {/* Render toast if visible */}
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-outline btn-warning text-black hover:text-white lg:hidden  '>
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
            Barista
          </div>
          {/* for small menu */}
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-gradient-to-br from-orange-50 to-orange-200 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            <li>
              <ul
                tabIndex={0}
                className='border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400   rounded-xl'>
                {baristaList.map((barista, index) => (
                  <li key={index}>
                    <a
                      onClick={() => {
                        handleBaristaSelection(barista.id); // Call the handler
                      }}>
                      {barista.id}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            {selectedBarista && (
              <div className='dropdown dropdown-start'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-sm btn-ghost m-1 mb-2'>
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
                <button
                  className='btn btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400   hover:border-rose-400  rounded-xl mr-2 '
                  onClick={() => {
                    if (!selectedBarista || !selectedDate) {
                      setToastMessage('Please select a Date first!'); // Set the toast message
                      setShowToast(true); // Show the toast
                      setTimeout(() => setShowToast(false), 2000); // Hide the toast after 2 seconds
                      return;
                    }
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
      </div>
      {/* large view menu */}
      <div className='navbar-center hidden lg:flex items-center  lg:gap-5  '>
        <ul className='menu menu-horizontal '>
          <div className='dropdown dropdown-bottom dropdown-end '>
            <div
              tabIndex={0}
              role='button'
              className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'>
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
                className='btn btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400   hover:border-rose-400  rounded-xl mr-2 '>
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
                className='btn btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400   hover:border-rose-400  rounded-xl mr-2 '
                onClick={() => {
                  if (!selectedBarista || !selectedDate) {
                    setToastMessage('Please select a Date first!'); // Set the toast message
                    setShowToast(true); // Show the toast
                    setTimeout(() => setShowToast(false), 2000); // Hide the toast after 2 seconds
                    return;
                  }
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
