import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

const fetchBeers = async () => {
  try {
    const beersCollectionReference = collection(db, 'Items');
    const beersQuery = query(beersCollectionReference);
    const beersQuerySnapshot = await getDocs(beersQuery);

    const beersData = beersQuerySnapshot.docs
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
      .filter((item) => item.isLiquor === false && item.category === 'beers'); // Filter out non-liquor items
    return beersData;
  } catch (error) {
    console.error('Error fetching beers: ', error);
    throw error;
  }
};

export default fetchBeers;
