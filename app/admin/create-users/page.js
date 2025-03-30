"use client";

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "/app/_utils/Firebase"; // Ensure you have firebaseConfig.js setup

export default function CreateUsers() {
  const options = [
    "Super Admin",
    "Barista",
    "Cashout Admin",
    "Inventory Admin",
  ];
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountType, setaAccountType] = useState(null);

  const handleSelect = (option) => {
    setaAccountType(option);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSuccess("Account created successfully!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 h-100 w-100">
      <div className="w-max mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-black">Sign Up</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-3 w-2xl">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <h2 className="text-2xl font-bold mb-4 text-black">
            Select Account Type
          </h2>
          <div className="flex flex-col gap-2">
            {options.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer text-black"
              >
                <input
                  type="checkbox"
                  checked={accountType === option}
                  onChange={() => handleSelect(option)}
                  className="w-5 h-5"
                />
                {option}
              </label>
            ))}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}

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
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="description"
                >
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
    </div>
  );
}
