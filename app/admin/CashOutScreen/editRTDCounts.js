import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

function editRTDCounts({ modData, setTableData, baristaID, userDate }) {
  const editRTDpopCloseOz = async (row) => {
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
        'Date ',
        userDate,
        'RTD',
        row[1].toString()
      );
      await updateDoc(docRef, { close_count: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };

  const editRTDpopOpenOz = async (row) => {
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
        'Date ',
        userDate,
        'RTD',
        row[1].toString()
      );
      await updateDoc(docRef, { open_count: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };
  return (
    <div className=' justify-center   '>
      <h1>Edit count</h1>
      <button
        className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
        onClick={() => {
          editRTDpopOpenOz(modData);
        }}>
        Edit Open
      </button>
      <button
        className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
        onClick={() => {
          editRTDpopCloseOz(modData);
        }}>
        Edit Close
      </button>
    </div>
  );
}
export default editRTDCounts;
