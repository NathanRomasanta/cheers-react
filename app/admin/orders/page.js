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
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css";

export default function Orders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const toast = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (statusFilter !== null) {
      fetchItems();
    }
  }, [statusFilter]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const itemsCollection = collection(db, "Orders");
      const q = query(itemsCollection, where("status", "==", statusFilter));
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

  // Handler for opening the edit modal
  const handleDetailsClick = (item) => {
    setCurrentItem({ ...item });
    setIsModalOpen(true);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleFulfillOrder = async () => {
    try {
      // Check if currentItem and ingredients exist
      if (!currentItem || !currentItem.ingredients) {
        console.error("No current item or ingredients found");
        return;
      }

      // Loop through ingredients properly
      for (const item of currentItem.ingredients) {
        // Make sure item has id
        if (!item || !item.id) {
          console.error("Invalid ingredient item:", item);
          continue;
        }

        const baristaRef = doc(
          db,
          "Accounts",
          currentItem.baristaUID,
          "stock",
          item.id
        );

        try {
          // First try to get the document to see if it exists
          const docSnap = await getDoc(baristaRef);

          if (docSnap.exists()) {
            // Document exists, update it by adding quantities
            const currentCount = docSnap.data().runningCount || 0;
            const newCount = currentCount + Number(item.quantity);

            await updateDoc(baristaRef, {
              runningCount: newCount,
            });

            console.log(
              `Updated stock for item ${item.id}: ${currentCount} + ${item.quantity} = ${newCount}`
            );
          } else {
            // Document doesn't exist, create it
            await setDoc(baristaRef, {
              runningCount: Number(item.quantity),
              // Add any other fields you might need for a new stock item
              name: item.name || "Unknown Item",
              isLiquor: item.isLiquor,
              id: item.id,
              ouncesPerBottle: item.ouncesPerBottle,
            });

            console.log(
              `Created new stock item ${item.id} with count ${item.quantity}`
            );
          }

          // Subtract from the Items collection
          const itemRef = doc(db, "Items", item.id);
          const itemSnap = await getDoc(itemRef);

          if (itemSnap.exists()) {
            const currentStock = itemSnap.data().quantity;
            // Make sure we don't go below zero
            const newStock = currentStock - Number(item.quantity);

            await updateDoc(itemRef, {
              quantity: newStock,
            });

            console.log(
              `Updated Items collection for item ${item.id}: ${currentStock} - ${item.quantity} = ${newStock}`
            );
          } else {
            console.warn(
              `Item ${item.id} not found in Items collection. No stock subtracted.`
            );
          }
        } catch (itemErr) {
          console.error(`Error handling item ${item.id}:`, itemErr);
        }
      }

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Order Successfully Fulfilled",
        life: 3000,
      });

      const itemRef = doc(db, "Orders", currentItem.id);

      await updateDoc(itemRef, {
        status: "Fulfilled",
      });

      handleCloseModal();
    } catch (err) {
      console.error("Error updating item: ", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleDenyOrder = async () => {
    try {
      // Check if currentItem and ingredients exist
      const itemRef = doc(db, "Orders", currentItem.id);

      await updateDoc(itemRef, {
        status: "Denied",
      });

      toast.current.show({
        severity: "error",
        summary: "Denied",
        detail: "Order Successfully Denied",
        life: 3000,
      });
    } catch (err) {
      console.error("Error updating item: ", err);
      alert("Failed to save changes. Please try again.");
    }

    await fetchItems();

    handleCloseModal();
  };

  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Fulfilled", value: "Fulfilled" },
    { label: "Denied", value: "Denied" },
  ];

  return (
    <div className="mx-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Dropdown
          value={statusFilter}
          options={statusOptions}
          onChange={(e) => setStatusFilter(e.value)}
          placeholder="Select Status"
          className="p-dropdown"
        />
      </div>
      <Toast ref={toast} />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl font-bold ">Loading Orders...</h1>
          <span className="loading loading-bars loading-xl bg-gradient-to-r from-zinc-700 to-orange-500 "></span>
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center bg-gray-100 p-4 font-semibold border-b">
                <span className="w-1/3">Barista UID</span>
                <span className="w-1/3">Order ID</span>
                <span className="w-1/3">Order Quantity</span>
                <span className="w-1/6 text-center">Actions</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <span className="w-1/3">{item.baristaUID}</span>
                  <span className="w-1/3">{item.id}</span>
                  <span className="w-1/3 text-gray-600">
                    {item.ingredients.length}
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
  );
}
