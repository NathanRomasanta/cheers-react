import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchWines = async () => {
  try {
    const winesCollectionReference = collection(db, 'Items');
    const winesQuery = query(winesCollectionReference);
    const winesQuerySnapshot = await getDocs(winesQuery);

    // Extract data from Firestore snapshot
    const winesData = winesQuerySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: data.id,
          name: data.name,
          price: data.price,
          isLiquor: data.isLiquor,
          quantity: data.quantity,
          category: data.category,
          ouncesPerBottle: data.ouncesPerBottle,
          createdAt: data.createdAt,
        };
      })
      .filter((item) => item.isLiquor === true && item.category === 'wines'); // Filter out non-liquor items
    return winesData;
  } catch (error) {
    console.error('Error fetching wines: ', error);
    throw error;
  }
};

export default fetchWines;
