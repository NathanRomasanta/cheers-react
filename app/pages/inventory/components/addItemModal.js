'use client';

/**
 **   Component: addItemModal.js
 **
 **   Description:
 **   This component allows users to add new items to the firestore database
 **   using a modal form.
 **/

 import { setDoc, doc } from 'firebase/firestore';
 import { db } from '../../../_utils/Firebase';
 import { useState } from 'react';

 export default function AddItem({ fetchInventoryData }) {
    const [selectType, setSelectedType] = useState('');
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
    })

    const itemType = ['Cooler', 'Hard Liquor', 'Beer', 'Wine', 'Liqueurs', 'Non-Alcoholic'];
    const liquorType = ['Whiskey', 'Vodka', 'Rum', 'Tequila', 'Gin', 'Brandy'];

    // Handle Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'price' || name === 'alcoholPercentage'
                ? parseFloat(value) || 0.0    // Price and alcoholPercentage are saved as a float 
                : ['quantity', 'volume'].includes(name)
                ? parseInt(value) || 0     // Quantity and Volume are saved as integers
                : value || prevData [name],                    // All other fields are saved as strings

        }));
    };


    // Handle Item Type Category Change
    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        console.log('Selected Type: ', selectedType);
        setSelectedType(selectedType);
        setFormData( (prevData) => ({
            ...prevData,
            type: selectedType, // Selected type is set as the item type
        }));
    };

    // Handle Form Submission and add item data to Firestore data
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.itemID) {
            alert('Item ID is required!');
            return;
        }

        try {
            await setDoc(doc(db, "Inventory_Database", formData.itemID), formData);
            alert('Item added successfully!');
            console.log(`Item ID ${formData.itemID} : ${formData.name} added to DB!` );
            setFormData({
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
        } catch (error) {
            console.log('Error adding item: ', error);
            alert('Failed to add item: ', itemID);
            return;
        }
        fetchInventoryData(); // Refresh inventory data
    };

    return(
        <div className='flex flex-col h-11/12 w-full items-center mt-44'>

            {/* Modal Wrapper - open using document.getElementById('ID').showModal() method */}
            <button className="btn bg-orange-500 rounded-xl text-black p-5" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Item</button>
            <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                
                
                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-white">
                    <h2 className="text-xl font-bold text-black text-center m-2">Add Item</h2>
                    
                    <div className="bg-orange-300 rounded-lg p-4">
                        
                        {/* Item ID Input */}
                        <div className='flex items-center mb-4'>
                            <label htmlFor="itemID" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Item ID:
                            </label>
                            <input 
                                type="text" 
                                name="itemID" 
                                value={formData.itemID} 
                                onChange={handleInputChange} 
                                className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                required
                            />
                        </div>

                        <div className='flex items-center mb-4'>
                            <label htmlFor="supplier" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Supplier:
                            </label>
                            <input 
                                type="text" 
                                name="supplier" 
                                value={formData.supplier} 
                                onChange={handleInputChange} 
                                className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                            />
                        </div>

                        <div className='flex items-center mb-4'>
                            <label htmlFor="name" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Name:
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                required
                            />
                        </div>
                        
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
                        
                        {/* Liquor Type dropdown only conditionally renders if 'Hard Liquor' is selected as item type */}
                        <div>
                            {formData.type == 'Hard Liquor' && (
                                <div className="flex items-center mb-4">
                                    <label htmlFor="alcoholStyle" className="w-1/4 text-left p-2 text-black font-bold text-lg">
                                        Liquor Type:
                                    </label>
                                    <select name="alcoholStyle" className="border-orange-500 w-3/4 bg-white text-black p-2 ml-4" value={formData.alcoholStyle} onChange={handleInputChange}>
                                        <option value=""> Select Liquor Type </option>
                                        {liquorType.map((style, index) => (
                                            <option key={index} value={style}>
                                                {style}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className='flex items-center mb-4'>
                            <label htmlFor="price" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Price:
                            </label>
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleInputChange} 
                                className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        <div className='flex items-center mb-4'>
                            <label htmlFor="quantity" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Quantity:
                            </label>
                                <input 
                                    type="text" 
                                    name="quantity" 
                                    value={formData.quantity} 
                                    onChange={handleInputChange} 
                                    className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                                    required
                                />
                        </div>

                        <div className='flex items-center mb-4'>
                            <label htmlFor="country" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Country:
                            </label>
                            <input 
                                type="text" 
                                name="country" 
                                value={formData.country} 
                                onChange={handleInputChange} 
                                className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                            />
                        </div>

                        <div className='flex items-center mb-4'>
                            <label htmlFor="volume" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Volume (mL):
                            </label>
                            <input 
                                type="text" 
                                name="volume" 
                                value={formData.volume} 
                                onChange={handleInputChange} 
                                className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                            />
                        </div>

                        <div className='flex items-center mb-4'>
                            <label htmlFor="alcoholPercentage" className="w-1/4 text-left p-2 text-black font-bold text-lg"> 
                                Alcohol Percentage (%):
                            </label>
                            <input 
                                type="number" 
                                name="alcoholPercentage" 
                                value={formData.alcoholPercentage} 
                                onChange={handleInputChange} 
                                className="input input-bordered border-orange-500 w-3/4 bg-white text-black border p-2 ml-4"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn bg-orange-500 text-black p-2 rounded-lg">Add Item</button>
                </form>
            
                </div>
            </dialog>
        </div>

    );
 };