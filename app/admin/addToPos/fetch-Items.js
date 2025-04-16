import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';
const fetchItems = async () => {
  try {
    const itemsCollectionReference = collection(db, 'Inventory');
    const itemsQuery = query(itemsCollectionReference);
    const itemsQuerySnapshot = await getDocs(itemsQuery);
    // Extract data from FireStore snapshot
    const itemsData = itemsQuerySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        ounces: data.ouncesPerBottle ? Number(data.ounces) : 0, // Convert to number if present
        price: data.price,
        isLiquor: data.isLiquor,
        quantity: data.quantity,
      };
    }); // Filter items where isLiquor is true
    return itemsData;
  } catch (error) {
    console.error('Error fetching items: ', error);
    throw error;
  }
};

export default fetchItems;
