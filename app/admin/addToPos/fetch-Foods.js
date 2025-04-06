import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchFoods = async () => {
  try {
    const foodsCollectionReference = collection(db, 'Inventory');
    const foodsQuery = query(foodsCollectionReference);
    const foodsQuerySnapshot = await getDocs(foodsQuery);

    const foodsData = foodsQuerySnapshot.docs
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
      .filter((item) => item.isLiquor === false && item.category === 'food'); // Filter out non-liquor items
    return foodsData;
  } catch (error) {
    console.error('Error fetching foods: ', error);
    throw error;
  }
};

export default fetchFoods;
