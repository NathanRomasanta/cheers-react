import React, { useEffect, useState } from "react";
import { db } from "@/app/_utils/Firebase"; // Import your firestore instance
import { Box } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";

const ControlPanel = () => {
  const [documentCount, setDocumentCount] = useState(0);

  const [accountsCount, setAccountsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Items_List")); // "orders" is your Firestore collection name
        setDocumentCount(querySnapshot.size);

        const accountSnapshot = await getDocs(collection(db, "Accounts")); // "orders" is your Firestore collection name
        setDocumentCount(querySnapshot.size);
        setAccountsCount(accountSnapshot.size); // Set the document count
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen p-12 bg-gray-100 flex flex-wrap justify-center items-start gap-4">
      {/* Box 1 */}
      <div className="p-4 border rounded-lg shadow-lg bg-white relative h-64 w-64">
        {/* Top Left: Order Label */}
        <div className="absolute top-2 left-2 text-sm font-semibold text-gray-500">
          Order
        </div>

        {/* Top Right: Icon */}
        <div className="absolute top-2 right-2 text-xl text-gray-500">
          <Box />
        </div>

        {/* Main Content: Document Count */}
        <div className="mt-6 text-left">
          <p className="text-6xl font-bold text-[#FF6E1F]">{documentCount}</p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>
      </div>

      {/* Box 2 */}
      <div className="p-4 border rounded-lg shadow-lg bg-white relative h-64 w-64">
        <div className="absolute top-2 left-2 text-sm font-semibold text-gray-500">
          Accounts
        </div>
        <div className="absolute top-2 right-2 text-xl text-gray-500">
          <Box />
        </div>
        <div className="mt-6 text-left">
          <p className="text-6xl font-bold text-[#FF6E1F]">{accountsCount}</p>
          <div className="h-4"></div>
          <p className="text-sm text-gray-500">Total Accounts Active</p>
        </div>
      </div>

      {/* Box 3 */}
      <div className="p-4 border rounded-lg shadow-lg bg-white relative h-64 w-64">
        <div className="absolute top-2 left-2 text-sm font-semibold text-gray-500">
          Order
        </div>
        <div className="absolute top-2 right-2 text-xl text-gray-500">
          <Box />
        </div>
        <div className="mt-6 text-left">
          <p className="text-6xl font-bold text-[#FF6E1F]">{documentCount}</p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>
      </div>

      {/* Box 4 */}
      <div className="p-4 border rounded-lg shadow-lg bg-white relative h-64 w-64">
        <div className="absolute top-2 left-2 text-sm font-semibold text-gray-500">
          Order
        </div>
        <div className="absolute top-2 right-2 text-xl text-gray-500">
          <Box />
        </div>
        <div className="mt-6 text-left">
          <p className="text-6xl font-bold text-[#FF6E1F]">{documentCount}</p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
