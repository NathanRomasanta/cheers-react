import { doc, collection, updateDoc, getFirestore } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';
import { X } from 'lucide-react';

import { useState } from 'react';

function editCount({
  editCount,
  setEditCount,
  modData,
  setTableData,

  baristaID,
  userDate,
}) {
  const [baristaId, setBaristaId] = useState(baristaID);
  // edit states

  // Edit Count Functions
  //

  /**
   * Edits the open ounces count for a selected row in the table and updates the corresponding Firestore document.
   *
   * @async
   * @function editOpenOz
   * @param {Array} row - The selected row to edit. Must be an array with at least 11 elements.
   * @returns {void}
   * @throws Will alert the user if no row is selected, if an invalid count is entered, or if there is an error updating the Firestore document.
   */
  const editOpenOz = async (row) => {
    if (!row || row.length === 0) {
      alert('Please select a row to edit');
      return;
    }
    let newRow = [...row];
    let newCount = Number(prompt('Enter new count'));
    if (isNaN(newCount)) {
      alert('Invalid count entered. Please enter a valid number.');
      return;
    }
    newRow[4] = newCount; // Close count is in the 4th index
    setTableData((prevData) =>
      prevData.map((r) => (r[0] === row[0] ? newRow : r))
    );
    try {
      const docRef = doc(
        db,
        'Cashout',
        baristaId,
        'Date',
        userDate,
        'Stock',
        row[10].toString()
      );
      await updateDoc(docRef, { open_oz: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };

  // Edit Open Lbs

  /**
   * Edits the open pounds (lbs) count for a selected row in the table and updates the corresponding Firestore document.
   *
   * @async
   * @function EditOpenLbs
   * @param {Array} row - The selected row to edit. The row should be an array where the 3rd index represents the open count and the 9th index represents the document ID.
   * @returns {void}
   *
   * @throws Will alert the user if no row is selected or if an invalid count is entered.
   *
   * @example
   * // Example usage:
   * EditOpenLbs(selectedRow);
   */
  const EditOpenLbs = async (row) => {
    if (!row || row.length === 0) {
      alert('Please select a row to edit');
      return;
    }

    let newRow = [...row];
    let newCount = Number(prompt('Enter new count'));

    if (isNaN(newCount)) {
      alert('Invalid count entered. Please enter a valid number.');
      return;
    }

    newRow[3] = newCount; // Open count is in the 3rd index
    setTableData((prevData) =>
      prevData.map((r) => (r[0] === row[0] ? newRow : r))
    );

    try {
      const docRef = doc(
        db,
        'Cashout',
        baristaId,
        'Date',
        userDate,
        'Stock',
        row[10].toString()
      );
      await updateDoc(docRef, { open_lbs: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };
  let totalStockUsed;

  // Edit Open Count

  //
  /**
   * Edits the open count of a selected row in the table and updates the corresponding Firestore document.
   *
   * @async
   * @function EditOpenCount
   * @param {Array} row - The selected row to edit. Must be an array with at least 11 elements.
   * @returns {void}
   * @throws Will alert the user if no row is selected, if the new count is invalid, or if there is an error updating Firestore.
   */
  const EditOpenCount = async (row) => {
    if (!row || row.length === 0) {
      alert('Please select a row to edit');
      return;
    }

    let newRow = [...row];
    let newCount = Number(prompt('Enter new count'));

    if (newCount === '' || isNaN(newCount)) {
      alert('Invalid count entered. Please enter a valid number.');
      return;
    }

    newRow[2] = newCount; // Open count is in the 3rd index
    setTableData((prevData) =>
      prevData.map((r) => (r[0] === row[0] ? newRow : r))
    );

    try {
      const docRef = doc(
        db,
        'Cashout',
        baristaID,
        'Date',
        userDate,
        'Stock',
        row[10].toString()
      );
      await updateDoc(docRef, { open_count: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };

  // Edit Close Count

  /**
   * Edits the close count of a selected row and updates the Firestore document.
   *
   * @async
   * @function EditCloseCount
   * @param {Array} row - The selected row to edit. Must be a non-empty array.
   * @returns {void}
   * @throws Will alert the user if no row is selected, if an invalid count is entered, or if there is an error updating Firestore.
   */
  const EditCloseCount = async (row) => {
    if (!row || row.length === 0) {
      alert('Please select a row to edit');
      return;
    }

    let newRow = [...row];

    let newCount = Number(prompt('Enter new count'));
    if (isNaN(newCount)) {
      alert('Invalid count entered. Please enter a valid number.');
      return;
    }
    if (newCount !== null) {
      newRow[5] = newCount; // Close count is in the 4th index
      setTableData((prevData) =>
        prevData.map((r) => (r[0] === row[0] ? newRow : r))
      );

      // Update Firestore data
      try {
        const docRef = doc(
          db,
          'Cashout',
          baristaID,
          'Date',
          userDate,
          'Stock',
          row[10].toString()
        );
        await updateDoc(docRef, { close_count: newCount });
        console.log('Document updated with ID: ', docRef.id);
      } catch (error) {
        alert('Error updating document:', error);
        console.error('Error updating Firestore:', error);
      }
    }
  };

  // Edit Close Lbs

  const editCloseLbs = async (row) => {
    if (!row || row.length === 0) {
      alert('Please select a row to edit');
      return;
    }
    let newRow = [...row];
    let newCount = Number(prompt('Enter new count'));
    if (isNaN(newCount)) {
      alert('Invalid count entered. Please enter a valid number.');
      return;
    }
    newRow[6] = newCount; // Close count is in the 4th index
    setTableData((prevData) =>
      prevData.map((r) => (r[0] === row[0] ? newRow : r))
    );

    try {
      const docRef = doc(
        db,
        'Cashout',
        baristaID,
        'Date',
        userDate,
        'Stock',
        row[10].toString()
      );
      await updateDoc(docRef, { close_lbs: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };
  // Edit close oz
  const editCloseOz = async (row) => {
    if (!row || row.length === 0) {
      alert('Please select a row to edit');
      return;
    }
    let newRow = [...row];
    let newCount = Number(prompt('Enter new count'));
    if (isNaN(newCount)) {
      alert('Invalid count entered. Please enter a valid number.');
      return;
    }
    newRow[7] = newCount; // Close count is in the 4th index
    setTableData((prevData) =>
      prevData.map((r) => (r[0] === row[0] ? newRow : r))
    );
    try {
      const docRef = doc(
        db,
        'Cashout',
        baristaID,
        'Date',
        userDate,
        'Stock',
        row[10].toString()
      );
      await updateDoc(docRef, { close_oz: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };

  return (
    <div className='w-3/4'>
      <h1 className='text-lg font-semibold'>Edit Liquor Count</h1>
      {!editCount && (
        <button
          className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
          onClick={() => {
            if (!editCount) {
              setEditCount(true);
            }
          }}>
          Edit Count
        </button>
      )}
      {editCount && (
        <div className='flex flex-row flex-wrap gap-5 border-2 w-1/2 justify-center items-center p-5 rounded-xl'>
          <button
            className='btn btn-circle btn-xs btn-ghost  hover:bg-opacity-100 hover:text-white  hover:bg-red-500 hover:border-white hover:shadow-lg relative bottom-4 left-44 '
            onClick={() => {
              setEditCount(false);
            }}>
            <X />
          </button>
          <div className=' flex flex-wrap items-center justify-center gap-2'>
            <button
              className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
              onClick={() => {
                EditOpenCount(modData);
              }}>
              OPEN Count
            </button>
            <button
              className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
              onClick={() => {
                EditOpenLbs(modData);
              }}>
              OPEN Lbs
            </button>
            <button
              className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
              onClick={() => {
                editOpenOz(modData);
              }}>
              OPEN Oz
            </button>
            <button
              className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
              onClick={() => {
                EditCloseCount(modData);
              }}>
              Close Count
            </button>
            <button
              className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
              onClick={() => {
                editCloseLbs(modData);
              }}>
              Close Lbs
            </button>
            <button
              className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
              onClick={() => {
                editCloseOz(modData);
              }}>
              Close Oz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default editCount;
