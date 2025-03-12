import { useState, useEffect } from "react";
import { app, db } from "@/app/_utils/Firebase";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ItemsListView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const itemsCollection = collection(db, "Items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching items: ", err);
      setError("Failed to load items. Please try again later.");
      setLoading(false);
    }
  };

  // Handler for opening the edit modal
  const handleEditClick = (item) => {
    setCurrentItem({ ...item });
    setIsModalOpen(true);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  // Handler for input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentItem({
      ...currentItem,
      [name]: name === "quantity" ? parseInt(value, 10) || 0 : value, // Convert to number
    });
  };

  // Handler for saving the edited item
  const handleSave = async () => {
    try {
      // Update the document in Firestore
      const itemRef = doc(db, "Items", currentItem.id);

      // Create a copy of the item without the id field (since id is for the document reference)
      const { id, ...itemData } = currentItem;

      await updateDoc(itemRef, itemData);

      // Update the local state
      setItems(
        items.map((item) => (item.id === currentItem.id ? currentItem : item))
      );

      // Close the modal
      handleCloseModal();
    } catch (err) {
      console.error("Error updating item: ", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const itemRef = doc(db, "Items", currentItem.id);

      await deleteDoc(itemRef);

      fetchItems();

      handleCloseModal();
    } catch (err) {
      console.error("Error updating item: ", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  if (loading)
    return <div className="container mx-auto p-4">Loading items...</div>;
  if (error)
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className=" mx-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Items List</h1>

      {/* List view */}
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="w-full">
            {/* Table Header */}
            <div className="flex justify-between items-center bg-gray-100 p-4 font-semibold border-b">
              <span className="w-1/4">Item Name</span>
              <span className="w-1/4">ID</span>
              <span className="w-1/4">Stock</span>
              <span className="w-1/4">Status</span>
              <span className="w-1/4 text-center">Actions</span>
            </div>

            {/* Table Rows */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <span className="w-1/4">{item.name}</span>
                <span className="w-1/4 text-gray-600">{item.id}</span>
                <span className="w-1/4 text-gray-600">{item.quantity}</span>

                <span
                  className={`w-1/4 text px-2 py-1 rounded-full ${
                    item.quantity > 30
                      ? "text-green-500 font-bold" // In stock (green)
                      : item.quantity > 0
                      ? "text-orange-500 font-bold" // Low stock (orange)
                      : "text-red-500 font-bold" // No stock (red)
                  }`}
                >
                  {item.quantity > 30
                    ? "In Stock"
                    : item.quantity > 0
                    ? "Low Stock"
                    : "No Stock"}
                </span>
                <div className="w-1/4 flex justify-center">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>

              <p className="block text-black-700 mb-2 text-xl">
                {currentItem.name}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Item ID
              </label>

              <p className="block text-black-700 mb-2 text-xl">
                {currentItem.id}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                value={currentItem.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
