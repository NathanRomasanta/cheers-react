"use client";
import { useState, useEffect, useRef } from "react";
import { db } from "/app/_utils/Firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css";

export default function InventoryPageMain() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    if (statusFilter !== null) {
      fetchItems();
    }
  }, [statusFilter]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const itemsCollection = collection(db, "Inventory");
      const q = query(itemsCollection, where("category", "==", statusFilter));
      const itemsSnapshot = await getDocs(q);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    } catch (err) {
      console.error("Error fetching items: ", err);
      setError("Failed to load items. Please try again later.");
    }
    setLoading(false);
  };

  const statusOptions = [
    { label: "Liquor", value: "Liquor" },
    { label: "Wine", value: "Wine" },
    { label: "RTDs", value: "RTDs" },
    { label: "N/A Beverages", value: "N/A Beverages" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 h-full w-full">
      <div className=" h-full w-full mx-auto bg-white rounded-lg shadow-md overflow-auto  ">
        <div className="mx-7 p-7">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Orders</h1>
            {statusFilter && (
              <div
                className="dropdown dropdown-bottom dropdown-end"
                id="filter-dropdown"
              >
                <div
                  tabIndex={0}
                  role="button"
                  id="filter-btn"
                  className=" h-10 border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75  hover:bg-orange-400 hover:text-white   rounded-xl justify-center flex items-center p-2"
                >
                  Filter by Category
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  {statusOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        className={`btn ${
                          statusFilter === option.value ? "btn-active" : ""
                        }`}
                        onClick={() => {
                          setStatusFilter(option.value);
                          fetchItems();
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Toast ref={toast} />

          {loading ? (
            <div className="flex  h-full flex-col mt-48">
              <div className="flex justify-center items-center h-full flex-col  ">
                <div className="flex flex-row items-center justify-around mb-4  w-auto ">
                  <div className="inline-grid *:[grid-area:1/1] mx-5">
                    <div className="status status-warning animate-ping"></div>
                    <div className="status status-warning"></div>
                  </div>
                  {firstLoad ? (
                    <h1 className="text-2xl font-bold ">
                      Select Filter to Load Inventory...
                    </h1>
                  ) : (
                    <h1 className="text-2xl font-bold ">Loading Orders...</h1>
                  )}
                </div>
                <div className="dropdown dropdown-bottom dropdown-end ">
                  {firstLoad && (
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="h-10 border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75 hover:bg-orange-400 hover:text-white rounded-xl justify-center flex items-center p-2"
                      >
                        Filter by Category
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        {statusOptions.map((option) => (
                          <li key={option.value}>
                            <button
                              className={`btn ${
                                statusFilter === option.value
                                  ? "btn-active"
                                  : ""
                              }`}
                              onClick={() => {
                                setStatusFilter(option.value);
                                fetchItems();
                                setFirstLoad(false); // Ensure dropdown only shows on first load
                              }}
                            >
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="flex justify-center items-center h-screen flex-col">
                  <div className="flex flex-row items-center justify-around mb-4 w-1/2">
                    <div className="inline-grid *:[grid-area:1/1]">
                      <div className="status status-warning animate-ping"></div>
                      <div className="status status-warning"></div>
                    </div>
                    <h1 className="text-2xl font-bold ">
                      No Items Found for this Category
                    </h1>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center bg-gray-100 p-4 font-semibold border-b">
                    <span className="w-1/3">Item Name</span>
                    <span className="w-1/3">Item ID</span>
                    <span className="w-1/3">Stock Count</span>
                    <span className="w-1/6 text-center">Actions</span>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-4 border-b"
                    >
                      <span className="w-1/3">{item.name}</span>
                      <span className="w-1/3">{item.id}</span>
                      <span className="w-1/3 text-gray-600">
                        {item.quantity}
                      </span>
                      <div className="w-1/6 flex justify-center">
                        <button
                          onClick={() => handleDetailsClick(item)}
                          className="btn btn-outline border-orange-400 bg-orange-500 bg-opacity-25 hover:bg-opacity-75 hover:bg-orange-400 rounded-xl mr-2"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {/* Edit Modal */}
          {isModalOpen && currentItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Barista: {currentItem.baristaUID}
                  </label>
                </div>

                {currentItem.ingredients.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between items-center p-4 border-b last:border-b-0"
                  >
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.name} x {item.quantity}
                      </h2>
                      <p className="text-gray-600">{item.id}</p>
                    </div>
                  </div>
                ))}

                <div className="p-3"></div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleFulfillOrder}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Fulfill
                  </button>

                  <button
                    onClick={handleDenyOrder}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Deny
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
