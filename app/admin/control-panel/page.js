import React, { useEffect, useState } from "react";
import { db } from "@/app/_utils/Firebase"; // Import your firestore instance
import { Archive, Box, ListOrdered, Send } from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ControlPanel = () => {
  const data = [
    { name: "Feb 10", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb 11", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Feb 12", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Feb 13", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Feb 14", uv: 5000, pv: 6908, amt: 2200 },
    { name: "Feb 15", uv: 6780, pv: 7908, amt: 2300 },
    { name: "Feb 16", uv: 2780, pv: 9908, amt: 2500 },
    { name: "Feb 17", uv: 3780, pv: 3908, amt: 2700 },
    { name: "Feb 18", uv: 4780, pv: 4908, amt: 2900 },
    { name: "Feb 20", uv: 5780, pv: 5908, amt: 2000 },
  ];
  const [documentCount, setDocumentCount] = useState(0);

  const [accountsCount, setAccountsCount] = useState(0);

  const [ordersCount, setOrdersCount] = useState(0);
  const [posItemCount, setPosItemCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Items")); // "orders" is your Firestore collection name

        const accountSnapshot = await getDocs(collection(db, "Accounts"));
        const ordersSnapshot = await getDocs(collection(db, "Orders"));
        const posItemSnapshot = await getDocs(collection(db, "Pos_Items")); // "orders" is your Firestore collection name
        setDocumentCount(querySnapshot.size);
        setAccountsCount(accountSnapshot.size);

        setOrdersCount(ordersSnapshot.size);
        setPosItemCount(posItemSnapshot.size);

        const transactionsSnapshot = await getDocs(
          collection(db, "Transactions")
        );
        const q = query(
          collection(db, "Transactions"),
          orderBy("time", "desc"),
          limit(5)
        );
        const querysSnapshot = await getDocs(q);

        const docs = querysSnapshot.docs.map((doc) => ({
          id: doc.baristaUID,
          ...doc.data(),
        }));

        setTransactions(docs);

        setCategoryCount(4);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen p-12 bg-gray-100">
      {/* First Row: 4 Boxes */}
      <div className="flex flex-wrap justify-center items-start gap-4">
        {/* Box 1 */}
        <div className="p-4 border rounded-lg shadow-lg bg-white relative h-55 w-64">
          <div className="absolute top-3 left-3 text-lg font-semibold text-gray-500">
            Inventory
          </div>
          <div className="absolute top-3 right-3 text-xl text-gray-500">
            <Archive size={30} />
          </div>
          <div className="mt-6 text-left">
            <p className="text-6xl font-bold text-[#FF6E1F]">{documentCount}</p>
            <div className="h-4"></div>
            <p className="text-sm text-gray-500">Total Inventory Items</p>
          </div>
        </div>

        {/* Box 2 */}
        <div className="p-4 border rounded-lg shadow-lg bg-white relative h-55 w-64">
          <div className="absolute top-3 left-3 text-lg font-semibold text-gray-500">
            Accounts
          </div>
          <div className="absolute top-3 right-3 text-xl text-gray-500">
            <Box size={30} />
          </div>
          <div className="mt-6 text-left">
            <p className="text-6xl font-bold text-[#FF6E1F]">{accountsCount}</p>
            <div className="h-4"></div>
            <p className="text-sm text-gray-500">Total Accounts Active</p>
          </div>
        </div>

        {/* Box 3 */}
        <div className="p-4 border rounded-lg shadow-lg bg-white relative h-55 w-64">
          <div className="absolute top-3 left-3 text-lg font-semibold text-gray-500">
            Orders
          </div>
          <div className="absolute top-3 right-3 text-xl text-gray-500">
            <Send size={30} />
          </div>
          <div className="mt-6 text-left">
            <p className="text-6xl font-bold text-[#FF6E1F]">{ordersCount}</p>
            <div className="h-4"></div>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
        </div>

        {/* Box 4 */}
        <div className="p-4 border rounded-lg shadow-lg bg-white relative h-55 w-64">
          <div className="absolute top-3 left-3 text-lg font-semibold text-gray-500">
            POS Items
          </div>
          <div className="absolute top-3 right-3 text-xl text-gray-500">
            <ListOrdered size={30} />
          </div>
          <div className="mt-6 text-left">
            <p className="text-6xl font-bold text-[#FF6E1F]">{posItemCount}</p>
            <div className="h-4"></div>
            <p className="text-sm text-gray-500">Total POS Items</p>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg bg-white relative h-55 w-64">
          <div className="absolute top-3 left-3 text-lg font-semibold text-gray-500">
            Category Count
          </div>
          <div className="absolute top-3 right-3 text-xl text-gray-500">
            <ListOrdered size={30} />
          </div>
          <div className="mt-6 text-left">
            <p className="text-6xl font-bold text-[#FF6E1F]">{categoryCount}</p>
            <div className="h-4"></div>
            <p className="text-sm text-gray-500">Total POS Items</p>
          </div>
        </div>
      </div>

      {/* Second Div for additional content */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg w-full h-250">
        {/* Add any additional content here */}
        <h1 className="text-xl font-bold mb-3">Sales Statistics</h1>
        <div className="mt-4 text-gray-500">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-xl font-bold mb-3">Recent Transactions</h2>
        <ul className="space-y-2">
          {transactions.map((doc) => (
            <li key={doc.id} className="p-3 bg-gray-100 rounded-lg shadow-md">
              <p className="font-semibold">{doc.baristaUID || "Untitled"}</p>
              <p className="text-sm text-gray-600">
                Transaction Total: {doc.total} | Total Items: {doc.totalItems}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;
