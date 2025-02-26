'use client';

import { useState, useEffect } from 'react';
import { db } from '../../../_utils/Firebase'; 
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import DeleteItemModalButton from './deleteItemButton';

export default function EditItemModalButton({ itemID }) {
    
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        itemID: '',
        supplier: '',
        name: '',
        type: '',
        alcoholStyle: '',
        price: '',
        quantity: '',
        country: '',
        volume: '',
        alcoholPercentage: '',
    });

    const itemType = ['Cooler', 'Hard Liquor', 'Beer', 'Wine', 'Liqueurs', 'Non-Alcoholic'];
    const liquorType = ['Whiskey', 'Vodka', 'Rum', 'Tequila', 'Gin', 'Brandy'];

    // Handle fetching item data and updating formData
    useEffect(() => {
        if (!itemID) {
            console.warn('itemID is undefined, skipping fetch');
            return;
        }

        const fetchItemData = async () => {
            try {
                const itemRef = doc(db, 'Inventory_Database', itemID);
                const itemDoc = await getDoc(itemRef);
                if (itemDoc.exists()) {
                    const fetchedData = itemDoc.data();
                    setFormData(fetchedData);
                    setLoading(false); // Stop loading after data is fetched
                } else {
                    console.warn('No document found for itemID: ', itemID);
                    setLoading(false); // Stop loading if no document is found
                }
            } catch (error) {
                console.error("Error fetching item data:", error);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchItemData();
    }, [itemID]); // Re-fetch whenever itemID changes

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'price' || name === 'alcoholPercentage'
                ? parseFloat(value) || 0.0
                : ['quantity', 'volume'].includes(name)
                ? parseInt(value) || 0
                : value,
        }));
    };

    // Handle form submission and update Firestore DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const itemRef = doc(db, 'Inventory_Database', itemID);
            await updateDoc(itemRef, formData);
            alert(`Item ${itemID} updated successfully!`);
            console.log('Item updated: ', formData);
        } catch (error) {
            console.error(`Error: ${error} when updating item: ${itemID}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle item type change
    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            type: selectedType,
        }));
    };

    // Handle item deletion
    const handleDelete = async (e, itemID) => {
        e.preventDefault();

        const confirmDelete = window.confirm(`Are you sure you want to delete item: ${formData.name}?`);

        if (confirmDelete) {
            try {
                const itemRef = doc(db, "Inventory_Database", itemID);
                await deleteDoc(itemRef);
                console.log(`Item ${itemID} deleted from the database`);
                alert(`Item ${itemID} deleted from the database`);
                document.getElementById('edit_item_modal').close();
            } catch (error) {
                console.error('Error deleting item: ', error);
                alert('Could not delete the item, please try again later');
            }
        } else {
            console.log('Delete action cancelled');
        }
    };

    // Handle cancel action
    const handleCancel = (e) => {
        e.preventDefault();
        console.log('Edit action cancelled');
        document.getElementById('edit_item_modal').close();
    };

    // Open modal
    const openModal = () => {
        console.log('Opening modal to edit item: ', itemID);
        document.getElementById('edit_item_modal').showModal();
    };

    return (
        <div className="flex flex-col items-center m-2">
            <button
                className="btn bg-orange-500 rounded-xl text-black p-5"
                onClick={openModal}
                disabled={loading} // Disable button while loading
            >
                Edit Item
            </button>

            <dialog id="edit_item_modal" key={itemID} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {/* Check if data is loaded */}
                    {loading ? (
                        <div>Loading...</div> // Show loading indicator until data is fetched
                    ) : (
                        <form className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-white">
                            <h2 className="text-xl font-bold text-black text-center m-2">Edit Item</h2>
                            
                            <div className="bg-orange-300 p-4 rounded-lg">
                                {/* Item ID (not editable) */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="itemID" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Item ID:
                                    </label>
                                    <input
                                        type="text"
                                        name="itemID"
                                        value={formData.itemID || ""}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                        disabled
                                    />
                                </div>

                                {/* Supplier */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="supplier" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Supplier:
                                    </label>
                                    <input
                                        type="text"
                                        name="supplier"
                                        value={formData.supplier || ""}
                                        onChange={handleInputChange}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                    />
                                </div>

                                {/* Name */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="name" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                        required
                                    />
                                </div>

                                {/* Item Type */}
                                <div className='flex items-center mb-4'>
                                    <label htmlFor="type" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                        Item Type:
                                    </label>
                                    <select name="type" className="border-orange-500 w-3/4 bg-white text-black border p-2 ml-4" value={formData.type} onChange={handleTypeChange} required>
                                        <option value="">Select Item Type</option>
                                        {itemType.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Liquor Type */}
                                {formData.type === 'Hard Liquor' && (
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="alcoholStyle" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                            Liquor Type:
                                        </label>
                                        <select name="alcoholStyle" className="border-orange-500 w-3/4 bg-white text-black border p-2 ml-4" value={formData.alcoholStyle} onChange={handleInputChange}>
                                            <option value=""> Select Liquor Type </option>
                                            {liquorType.map((style, index) => (
                                                <option key={index} value={style}>
                                                    {style}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="price" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Price:
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price || ""}
                                        onChange={handleInputChange}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="quantity" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Quantity:
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity || ""}
                                        onChange={handleInputChange}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                        required
                                    />
                                </div>

                                {/* Country */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="country" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Country:
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country || ""}
                                        onChange={handleInputChange}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                    />
                                </div>

                                {/* Volume */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="volume" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Volume (mL):
                                    </label>
                                    <input
                                        type="number"
                                        name="volume"
                                        value={formData.volume || ""}
                                        onChange={handleInputChange}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                    />
                                </div>

                                {/* Alcohol Percentage */}
                                <div className="flex items-center mb-4">
                                    <label htmlFor="alcoholPercentage" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Alcohol Percentage (%):
                                    </label>
                                    <input
                                        type="number"
                                        name="alcoholPercentage"
                                        value={formData.alcoholPercentage || ""}
                                        onChange={handleInputChange}
                                        className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn bg-orange-500 text-black p-2 rounded-lg"
                            >
                                Update Item
                            </button>

                            <div className="flex items-center justify-between ">
                                <button
                                    type="button"
                                    className="btn bg-red-500 text-white p-2 rounded-lg w-1/2 mr-2"
                                    onClick={(e) => handleDelete(e, itemID)}>
                                        Delete
                                </button>
                                
                                <button 
                                    type="cancel" 
                                    className="btn bg-gray-400 text-white p-2 rounded-lg w-1/2 ml-2" 
                                    onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
}
