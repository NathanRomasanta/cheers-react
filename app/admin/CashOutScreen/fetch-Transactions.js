import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../_utils/Firebase";

const fetchTransactions = async (baristaID, userDate) => {
  try {
    const TransCollectionReference = collection(
      db,


      "transactions",

      baristaID,
      userDate
    );
    const TransQuery = query(TransCollectionReference);
    const TransQuerySnapshot = await getDocs(TransQuery);
    const TransData = TransQuerySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        order: data.ingredients,
        name: data.baristaUID,
        ounces: data.ounces ? Number(data.ounces) : 0, // Convert to number if present
        time: data.time && data.time.toDate ? data.time.toDate() : null, // Convert Firestore timestamp to JavaScript Date object if valid
        total: data.total,

        totalItems: data.totalItems,

      };
    });
    return TransData;
  } catch (error) {
    console.error("Error fetching transactions: ", error);
    throw error;
  }
};

export default fetchTransactions;
