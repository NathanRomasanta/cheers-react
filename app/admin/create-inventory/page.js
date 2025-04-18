'use client';
import { useState, useRef, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '/app/_utils/Firebase'; // You'll need to create this config file
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css';
import {
  EllipsisVertical,
  Martini,
  CalendarArrowDown,
  Search,
  SquareChevronDown,
} from 'lucide-react';

export default function AddInventory() {
  const [itemID, seItemID] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [ouncesPerBottle, setOuncesPerBottle] = useState('');
  const [isLiquor, setIsLiquor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);
  const [optionList, setOptionList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  // Function to remove vowels from a string and convert to uppercase
  const removeVowelsAndFormat = (str) => {
    return str.replace(/[aeiouAEIOU]/g, '').toUpperCase();
  };

  // Function to format number with leading zeros
  const formatNumber = (number) => {
    // Format to ensure 3 digits with leading zeros
    return number.toString().padStart(3, '0');
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
      const collectionRef = collection(db, 'Inventory'); // Replace with your collection name
      const snapshot = await getDocs(collectionRef);
      const itemCount = snapshot.docs.length;

      // Format the count with leading zeros
      const formattedCount = formatNumber(itemCount);

      // Combine the formatted string with a dash and the formatted count
      setResult(`${formattedOutput}-${formattedCount}`);

      seItemID(`${formattedOutput}-${formattedCount}`);
    } catch (err) {
      console.error('Error processing request:', err);
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setOptionList(['Liquor', 'Wine', 'RTDs', 'N/A Beverages']);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Create a reference to the document using itemID as the document name
      const itemRef = doc(db, 'Inventory', itemID);

      // Prepare data object
      const itemData = {
        name: itemName,
        isLiquor: Boolean(isLiquor),
        ouncesPerBottle: isLiquor ? Number(ouncesPerBottle) : 1,
        createdAt: new Date(),
        category: selectedCategory,
        quantity: Number(itemQuantity),
        id: itemID,
      };

      // Save to Firestore
      await setDoc(itemRef, itemData);

      // Reset form
      setItemName('');
      setIsLiquor(false);
      setOuncesPerBottle(0);
      setItemQuantity(0);
      setMessage('Item saved successfully!');
      setResult('');
      seItemID('');
      setSelectedCategory('Select Category');

      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory item successfully made',
        life: 3000,
      });
    } catch (error) {
      console.error('Error saving item:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 h-100 w-100'>
      <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
          Add Inventory
        </h1>
        <Toast ref={toast} />
        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          <div>
            <label
              htmlFor='input'
              className='block text-sm font-medium text-gray-700'>
              Item Name
            </label>
            <input
              name='itemName'
              type='text'
              id='input'
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className='input input-bordered input-warning focus:outline-none  focus:border-black text-black'
              placeholder='Type your text here'
              required
            />
          </div>

          <div>
            <label
              name='itemID'
              htmlFor='Item Name'
              className='block text-sm font-medium text-gray-700'>
              Item ID
            </label>
            <div className='mt-2 p-3 bg-gray-100 rounded-md font-mono font-bold  text-black'>
              {result}
            </div>
          </div>

          <button
            name='generateItemID'
            onClick={generateItemID}
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
            {isLoading ? 'Processing...' : 'Generate ItemID'}
          </button>

          <div>
            <label
              htmlFor='input'
              className='block text-sm font-medium text-gray-700'>
              Item Quantity
            </label>
            <input
              name='itemQuantity'
              type='number'
              id='quantity'
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              className='input input-bordered input-warning  mt-1 block w-full border  rounded-md shadow-sm py-2 px-3 focus:outline-none  focus:border-black text-black'
              placeholder='Type your text here'
            />
          </div>
          <div></div>
          <label
            htmlFor='input'
            className='block text-sm font-medium text-gray-700'>
            Category
          </label>
          <div className='dropdown'>
            <button
              tabIndex={0}
              className='btn btn-outline border-orange-400 bg-orange-400 bg-opacity-35 text-orange-700 hover:bg-orange-400 hover:bg-opacity-55 hover:border-rose-400 rounded-xl mr-2 flex items-center gap-2'>
              {selectedCategory}
              <SquareChevronDown size={14} />
            </button>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-white text-gray-800 h-max rounded-box z-10 w-52 p-2 shadow-md'>
              {optionList.length > 0 ? (
                optionList.map((option, index) => (
                  <li key={index}>
                    <a
                      className='hover:bg-orange-100 block p-2 rounded-md cursor-pointer'
                      onClick={() => {
                        setSelectedCategory(option);
                      }}>
                      {option}
                    </a>
                  </li>
                ))
              ) : (
                <li className='p-2 text-gray-500'>No options available</li>
              )}
            </ul>
          </div>

          <div className='mb-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='isLiquor'
                id='isLiquor'
                checked={isLiquor}
                onChange={(e) => setIsLiquor(e.target.checked)}
                className='checkbox checkbox-warning'
              />
              <label
                htmlFor='isLiquor'
                className='ml-2 block text-sm text-gray-700'>
                Is this a liquor item?
              </label>
            </div>
          </div>

          {isLiquor && (
            <div className='mb-4'>
              <label
                htmlFor='ouncesPerBottle'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Ounces Per Bottle
              </label>
              <input
                name='ouncesPerBottle'
                type='number'
                id='ouncesPerBottle'
                value={ouncesPerBottle}
                onChange={(e) => setOuncesPerBottle(e.target.value)}
                min='0'
                step='0.1'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                required={isLiquor}
              />
            </div>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50'>
            {isSubmitting ? 'Saving...' : 'Save Item'}
          </button>
        </form>

        {error && <div className='mt-4 text-sm text-red-600'>{error}</div>}
      </div>
    </div>
  );
}
