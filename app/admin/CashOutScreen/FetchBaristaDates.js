import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchBaristaDates = async (baristaID) => {
  try {
    const baristaDatesCollectionReference = collection(
      db,
      'Cashout',
      baristaID,
      'Date '
    );
    const baristaDatesQuery = query(baristaDatesCollectionReference);
    const baristaDatesQuerySnapshot = await getDocs(baristaDatesQuery);
    const baristaDates = baristaDatesQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
    return baristaDates;
  } catch (error) {
    console.error('Error fetching barista dates: ', error);
    throw error;
  }
};

export default fetchBaristaDates;
