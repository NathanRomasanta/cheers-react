// pages/vowel-remover.js
import { useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/_utils/Firebase"; // You'll need to create this config file
import Head from "next/head";

export default function AddInventory() {
  const [input, setInput] = useState("");

  const [itemID, seItemID] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [ouncesPerBottle, setOuncesPerBottle] = useState("");
  const [isLiquor, setIsLiquor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to remove vowels from a string and convert to uppercase
  const removeVowelsAndFormat = (str) => {
    return str.replace(/[aeiouAEIOU]/g, "").toUpperCase();
  };

  // Function to format number with leading zeros
  const formatNumber = (number) => {
    // Format to ensure 3 digits with leading zeros
    return number.toString().padStart(3, "0");
  };

  // Function to handle form submission
  const generateItemID = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Remove vowels from input and convert to uppercase
      const formattedOutput = removeVowelsAndFormat(itemName);

      // Get count of items in Firestore collection
      const collectionRef = collection(db, "Items"); // Replace with your collection name
      const snapshot = await getDocs(collectionRef);
      const itemCount = snapshot.docs.length;

      // Format the count with leading zeros
      const formattedCount = formatNumber(itemCount);

      // Combine the formatted string with a dash and the formatted count
      setResult(`${formattedOutput}-${formattedCount}`);

      seItemID(`${formattedOutput}-${formattedCount}`);
    } catch (err) {
      console.error("Error processing request:", err);
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Create a reference to the document using itemID as the document name
      const itemRef = doc(db, "Items", itemID);

      // Prepare data object
      const itemData = {
        name: itemName,
        isLiquor: isLiquor,
        ouncesPerBottle: isLiquor ? Number(ouncesPerBottle) : 1,
        createdAt: new Date(),
        quantity: Number(itemQuantity),
        id: itemID,
      };

      // Save to Firestore
      await setDoc(itemRef, itemData);

      // Reset form
      setItemName("");
      setIsLiquor(false);
      setOuncesPerBottle(0);
      setItemQuantity(0);
      setMessage("Item saved successfully!");
    } catch (error) {
      console.error("Error saving item:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 h-100 w-100">
      <Head>
        <title>Add Inventory</title>
        <meta
          name="description"
          content="Remove vowels and add Firestore count"
        />
      </Head>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add Inventory
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              type="text"
              id="input"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Type your text here"
              required
            />
          </div>

          <div>
            <label
              htmlFor="Item Name"
              className="block text-sm font-medium text-gray-700"
            >
              Item ID
            </label>
            <div className="mt-2 p-3 bg-gray-100 rounded-md font-mono font-bold">
              {result}
            </div>
          </div>

          <button
            onClick={generateItemID}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Generate ItemID"}
          </button>

          <div>
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700"
            >
              Item Quantity
            </label>
            <input
              type="numbers"
              id="quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Type your text here"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isLiquor"
                checked={isLiquor}
                onChange={(e) => setIsLiquor(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isLiquor"
                className="ml-2 block text-sm text-gray-700"
              >
                Is this a liquor item?
              </label>
            </div>
          </div>

          {isLiquor && (
            <div className="mb-4">
              <label
                htmlFor="ouncesPerBottle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ounces Per Bottle
              </label>
              <input
                type="number"
                id="ouncesPerBottle"
                value={ouncesPerBottle}
                onChange={(e) => setOuncesPerBottle(e.target.value)}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required={isLiquor}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Item"}
          </button>
        </form>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
      </div>
    </div>
  );
}
