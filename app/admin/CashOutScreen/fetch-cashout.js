import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchCashOut = async (baristaID, userDate) => {
  try {
    const cashOutCollectionReference = collection(
      db,
      'Cashout',
      baristaID,
      'Date',
      userDate,
      'Stock'
    );
    const cashOutQuery = query(cashOutCollectionReference);
    const cashOutQuerySnapshot = await getDocs(cashOutQuery);
    // Extract data from Firestore snapshot
    const cashOutData = cashOutQuerySnapshot.docs.map((doc) => doc.data());
    return cashOutData;
  } catch (error) {
    console.error('Error fetching cashout: ', error);
    throw error;
  }
};

export default fetchCashOut;
