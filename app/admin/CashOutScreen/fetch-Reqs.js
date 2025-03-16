import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchReqData = async (baristaID, userDate) => {
  try {
    const cashOutCollectionReference = collection(
      db,
      'Cashout',
      baristaID,
      'Date ',
      userDate,
      'Requests'
    );
    const ReqQuery = query(cashOutCollectionReference);
    const ReqQuerySnapshot = await getDocs(ReqQuery);
    // Extract data from Firestore snapshot
    const ReqData = ReqQuerySnapshot.docs.map((doc) => doc.data());
    return ReqData;
  } catch (error) {
    console.error('Error fetching Requests: ', error);
    throw error;
  }
};

export default fetchReqData;
