"use client";

import React from "react";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/_utils/Firebase";

const CreatePOSItem = () => {

  const [itemData, setItemData] = useState({
    id: '',
    name: '',
    supplier: '',
    category: '',
    alcoholStyle: '',
    price: '',
    quantity: '',
    country: '',
    volume: '',
    alcoholPercentage: '',
  });

  const [itemCategory, setItemCategory] = useState('');
  const [alcoholStyle, setAlcoholStyle] = useState('');

  const alcoholTypes = ['Cooler', 'Hard Liquor', 'Liqueurs', 'Beer', 'Wine', 'Non-Alcoholic'];
  const liquorStyles = ['Whiskey', 'Vodka', 'Rum', 'Tequila', 'Gin', 'Brandy'];

  // Handle Item Category Change
  // i.e. - Cooler, Hard Liquor, Liqueurs, Beer, Wine, Non-Alcoholic
  const handleCategoryChange = (selectedCategory) => {
    console.log('Selected Category:', selectedCategory);
    setItemCategory(selectedCategory);
    setItemData({
      ...itemData,
      category: selectedCategory,
    });
  };

  // Handle Alcohol Style Change
  // i.e. - Whiskey, Vodka, Rum, Tequila, Gin, Brandy
  const handleAlcoholStyleChange = (selectedStyle) => {
    console.log('Selected Style:', selectedStyle);
    setAlcoholStyle(selectedStyle);
    setItemData({
      ...itemData,
      alcoholStyle: selectedStyle,
    });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: name === 'price' || name === 'alcoholPercentage' ? parseFloat(value) : 0,
      [name]: name === 'quantity' || name === 'volume' ? parseInt(value) : 0,
      [name]: value, // Save as string for other fields
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'Inventory_Database', itemData.id), itemData);
      alert (`Item ${itemData.name} has been added to the database`);
      setItemData({
        id: '',
        name: '',
        supplier: '',
        category: itemCategory,
        alcoholStyle: alcoholStyle || '',
        price: '',
        quantity: '',
        country: '',
        volume: '',
        alcoholPercentage: '',
      });
      setItemType('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding document: ', error);
      return;
    }
  };

  return (
    <div className="flex flex-col w-auto items-center">

      <h1 className="flex text-2xl font-bold text-center m-2 p-4"> Create POS Item </h1>
      
      <div className="bg-orange-300 p-4 w-3/4">
      <form onSubmit={handleSubmit} className="flex flex-col h-11/12 p-3 space-y-4">
          
          {/* ID Field */}
          <div className="flex w-full items-center mb-2">
            <label className="text-lg font-bold m-2 text-left w-1/4">ID: </label>
            <input
              type="text"
              name="id"
              value={itemData.id}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-md w-3/4"
              />
            </div>

          
          <div className="flex w-full items-center mb-2">
            <label className="text-lg font-bold m-2 text-left w-1/4">Item Name: </label>
            <input
              type="text"
              name="name"
              value={itemData.name}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-md w-3/4"
            />
          </div>

          <div className="flex w-full items-center mb-2">
            <label className="text-lg font-bold m-2 text-left w-1/4">Supplier: </label>
            <input
              type="text"
              name="supplier"
              value={itemData.supplier}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-md w-3/4"
            />
          </div>

          <div className="flex w-full items-center mb-2">
            <label className="text-lg font-bold m-2 text-left w-1/4">Category: </label>
            <select
              value={itemCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-3/4"
              >
              <option value="">Select Item Category</option>
              {alcoholTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))};
            </select>
          </div>

          {/* Conditional Rendering if 'Hard Liquor' is selected as category type */}
          {itemCategory === 'Hard Liquor' && (
            <div className="flex w-full items-center mb-2">
              <label className="text-lg font-bold m-2 text-left w-1/4">Alcohol Style: </label>
              <select
                value={alcoholStyle}
                onChange={(e) => handleAlcoholStyleChange(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md w-3/4"
                >
                <option value="">Select Alcohol Style</option>
                {liquorStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
                </select>
            </div>
            )}
          
          <div className="flex w-full items-center mb-2">
              <label className="text-lg font-bold m-2 text-left w-1/4">Price: </label>
              <input
                type="text"
                name="price"
                value={itemData.price}
                onChange={handleInputChange}
                required
                className="p-2 border border-gray-300 rounded-md w-3/4"
                />
          </div>
          
          <div className="flex w-full items-center mb-2">
            <label className="text-lg font-bold m-2 text-left w-1/4">Quantity: </label>
            <input
              type="text"
              name="quantity"
              value={itemData.quantity}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-md w-3/4"
              />
          </div>
          
          <div className="flex w-full items-center mb-2">
            <label className="text-lg font-bold m-2 text-left w-1/4">Country: </label>
            <input
              type="text"
              name="country"
              value={itemData.country}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-md w-3/4"
              />
          </div>


          <div className="flex w-full items-center mb-2">
              <label className="text-lg font-bold m-2 text-left w-1/4">Volume (mL): </label>
            <input
              type="text"
              name="volume"
              value={itemData.volume}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-md w-3/4"
              />
            </div>
          
          
            <div className="flex w-full items-center mb-2">
              <label className="text-lg font-bold m-2 text-left w-1/4">Alcohol (%): </label>
              <input
                type="text"
                name="alcoholPercentage"
                value={itemData.alcoholPercentage}
                onChange={handleInputChange}
                required
                className="p-2 border border-gray-300 rounded-md w-3/4"
                />
            </div>
          
          <div className="flex justify-end w-full mb-2">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg border-2 border-black hover:bg-orange-600 transition-colors w-full"
              >
              Submit
            </button>

          </div>

          <div className="flex justify-end w-full mb-2">
          <button
              type="reset"
              className="px-4 py-2 bg-red-400 text-black rounded-lg border-2 border-black hover:bg-orange-600 transition-colors w-1/2 mr-2"
              >
              Reset
            </button>

            <button
              type="cancel"
              className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-orange-600 transition-colors w-1/2 ml-2"
              >
              Cancel
            </button>
          </div>
          

      </form>
      </div>
    </div>
  );
};

export default CreatePOSItem;
