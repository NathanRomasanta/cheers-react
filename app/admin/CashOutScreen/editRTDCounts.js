import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

function editRTDCounts({ modData, setTableData, baristaID, userDate }) {
  const editRTDCloseOz = async (row, baristaID, userDate) => {
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
    newRow[3] = newCount; // Close count is in the 4th index
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
        'RTD',
        row[1].toString().split(':')[0].toString()
      );
      await updateDoc(docRef, { close_count: newCount });
      console.log('Document updated with ID: ', docRef.id);
    } catch (error) {
      alert('Error updating document:', error);
      console.error('Error updating Firestore:', error);
    }
  };

  const editRTDOpenOz = async (row, baristaID, userDate) => {
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
    newRow[2] = newCount;
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
        'RTD',
        row[1].toString().split(':')[0].toString()
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
      <button
        className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
        onClick={() => {
          editRTDOpenOz(modData, baristaID, userDate);
        }}>
        Edit Open
      </button>
      <button
        className='btn  btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400    rounded-xl mr-2'
        onClick={() => {
          editRTDCloseOz(modData, baristaID, userDate);
        }}>
        Edit Close
      </button>
    </div>
  );
}
export default editRTDCounts;
