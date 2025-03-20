import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchDrinkTypes = async () => {
  try {
    const drinkTypesCollectionReference = collection(db, 'Pos_Items');
    const drinkTypesQuery = query(drinkTypesCollectionReference);
    const drinkTypesQuerySnapshot = await getDocs(drinkTypesQuery);
    // Extract data from FireStore snapshot
    const drinkTypesIDs = drinkTypesQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
    return drinkTypesIDs;
  } catch (error) {
    console.error('Error fetching DrinkTypes: ', error);
    throw error;
  }
};

export default fetchDrinkTypes;
