import React, { useEffect, useState } from "react";
import { db } from "@/app/_utils/Firebase"; // Import your firestore instance
import { Box } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";

const ControlPanel = () => {
  const [documentCount, setDocumentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use 'collection' to reference the Firestore collection
        const querySnapshot = await getDocs(collection(db, "Accounts")); // "orders" is your Firestore collection name
        setDocumentCount(querySnapshot.size); // Set the document count
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white relative  h-64 w-64">
      {/* Top Left: Order Label */}
      <div className="absolute top-2 left-2 text-sm font-semibold text-gray-500">
        Order
      </div>

      {/* Top Right: Icon */}
      <div className="absolute top-2 right-2 text-xl text-gray-500">
        <Box />
      </div>

      {/* Main Content: Document Count */}
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold text-blue-600">{documentCount}</p>
        <p className="text-sm text-gray-500">Total Orders</p>
      </div>
    </div>
  );
};

export default ControlPanel;
