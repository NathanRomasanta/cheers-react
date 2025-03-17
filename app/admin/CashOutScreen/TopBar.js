'use client';
import { use, useEffect, useState } from 'react';
import { db } from '../../_utils/Firebase';
import { collection, query, getDocs } from 'firebase/firestore';

import Link from 'next/link';
import fetchBaristas from './FetchBaristas';
import fetchBaristaDates from './FetchBaristaDates';

// icons

export default function TopBar({ userName, pageName }) {
  // Added Sign Out functionality
  const [baristaList, setBaristaList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [selectedBarista, setSelectedBarista] = useState('');

  useEffect(() => {
    const FetchBaristas = async () => {
      const fetchedBaristas = await fetchBaristas();
      setBaristaList(fetchedBaristas);
    };
    FetchBaristas();
  }, []);

  useEffect(() => {
    if (selectedBarista) {
      const FetchDates = async () => {
        const fetchedDates = await fetchBaristaDates(selectedBarista);
        setDateList(fetchedDates);
      };
      FetchDates();
    }
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
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              {' '}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />{' '}
            </svg>
          </div>
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
                  {baristaList.map((barista) => (
                    <li key={barista}>
                      <a
                        onClick={() => {
                          console.log('barista.id', barista.id);
                          setSelectedBarista(barista.id);
                        }}>
                        {barista.id}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {selectedBarista && (
              <li>
                <details className='mr-5'>
                  <summary>Dates</summary>
                  <ul className='p-2'>
                    {dateList.map((date) => (
                      <li key={date}>
                        <a>{date.id}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            )}

            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex '>
        <ul className='menu menu-horizontal px-1'>
          <div className='dropdown dropdown-bottom dropdown-end mr-5 '>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-sm btn-ghost m-1 mb-2'>
              Barista
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
              {baristaList.map((barista) => (
                <li key={barista}>
                  <a
                    onClick={() => {
                      console.log('barista.id', barista.id);
                      setSelectedBarista(barista.id);
                    }}>
                    {barista.id}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {selectedBarista && (
            <li>
              <details className='mr-5'>
                <summary>Dates</summary>
                <ul className='p-2'>
                  {dateList.map((date) => (
                    <li key={date}>
                      <a>{date.id}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          )}
          <li>
            <a className='btn'>Search</a>
          </li>
        </ul>
      </div>
      <div className='navbar-end'></div>
    </div>
  );
}
