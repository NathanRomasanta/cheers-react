import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchBaristas = async () => {
  try {
    const baristasCollectionReference = collection(db, 'Cashout');
    const baristasQuery = query(baristasCollectionReference);
    const baristasQuerySnapshot = await getDocs(baristasQuery);
    // Extract data from FireStore snapshot
    const baristasIDs = baristasQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
    return baristasIDs;
  } catch (error) {
    console.error('Error fetching baristas: ', error);
    throw error;
  }
};

export default fetchBaristas;
