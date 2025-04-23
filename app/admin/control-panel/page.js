"use client";
import React, { useEffect, useState } from "react";
import { db } from "/app/_utils/Firebase"; // Import your firestore instance
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
import ControlCards from "./controlCards";

const ControlPanel = () => {
  const data = [
    { name: "Feb 10", Sales: 1200, Inventory: 8000, amt: 2400 },
    { name: "Feb 11", Sales: 1800, Inventory: 7800, amt: 2300 },
    { name: "Feb 12", Sales: 2500, Inventory: 7500, amt: 2200 },
    { name: "Feb 13", Sales: 3200, Inventory: 7000, amt: 2100 },
    { name: "Feb 14", Sales: 4100, Inventory: 6700, amt: 2000 },
    { name: "Feb 15", Sales: 5200, Inventory: 6200, amt: 2100 },
    { name: "Feb 16", Sales: 4600, Inventory: 6000, amt: 2500 },
    { name: "Feb 17", Sales: 3500, Inventory: 5900, amt: 2700 },
    { name: "Feb 18", Sales: 3700, Inventory: 6100, amt: 2650 },
    { name: "Feb 20", Sales: 4300, Inventory: 5900, amt: 2400 },
    { name: "Feb 21", Sales: 4900, Inventory: 5700, amt: 2600 },
    { name: "Feb 22", Sales: 5300, Inventory: 5400, amt: 2800 },
    { name: "Feb 23", Sales: 5900, Inventory: 5100, amt: 2900 },
    { name: "Feb 24", Sales: 6200, Inventory: 4700, amt: 3000 },
    { name: "Feb 25", Sales: 5800, Inventory: 4500, amt: 3100 },
    { name: "Feb 26", Sales: 5400, Inventory: 4300, amt: 2950 },
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
        const querySnapshot = await getDocs(collection(db, "Inventory")); // "orders" is your Firestore collection name

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
        <ControlCards>
          Inventory
          <Archive size={30} />
          {documentCount}
          Total Inventory Items
        </ControlCards>

        {/* Box 2 */}
        <ControlCards>
          Accounts
          <Box size={30} />
          {accountsCount}
          Total Accounts Active
        </ControlCards>

        {/* Box 3 */}
        <ControlCards>
          Orders
          <Send size={30} />
          {ordersCount}
          Total Orders
        </ControlCards>

        {/* Box 4 */}
        <ControlCards>
          POS Items
          <ListOrdered size={30} />
          {posItemCount}
          Total POS Items
        </ControlCards>

        {/* Box 5 */}
        <ControlCards>
          Category Count
          <ListOrdered size={30} />
          {categoryCount}
          Total POS Items
        </ControlCards>
      </div>

      {/* Stat Graph */}
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
              <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="Inventory" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-xl font-bold mb-3">Recent Transactions</h2>
        <ul className="space-y-2">
          {transactions.map((doc, index) => (
            <li
              key={doc.id || index}
              className="p-3 bg-gray-100 rounded-lg shadow-md"
            >
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
