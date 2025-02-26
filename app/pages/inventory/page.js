"use client";


import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../_utils/Firebase';
import InventoryTable from './components/inventoryTable';
import AddItem from './components/addItemModal';


export default function InventoryPage() {

    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    let userName = { job: 'Inventory', name: 'John Doe', id: 1};

    /** Table Headers **/
    let InventoryTableHeaders = [
        '',
        'ID',
        'Supplier',
        'Name',
        'Type',
        'Alcohol Style',
        'Price',
        'Quantity',
        'Country', 
        'Volume (mL)',
        'Alcohol %'
    ];

    // Fetch Data from Firestore DB collection 'Inventory_Database'
    const fetchInventoryData = async () => {
        setLoading(true);

        try {
            const querySnapshot = await getDocs(collection(db, "Inventory_Database"));
            const itemsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setInventoryItems(itemsArray);
        } catch (error) {
            console.log('Error fetching items: ', error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger the data fetch on component mount
    useEffect(() => {
        fetchInventoryData();
    }, []); // Save to empty array for only initial fetch
    
    
    //** Map fetched data to table **/
    const inventoryTableData = inventoryItems.map((item) => ({
        id: item.id,
        supplier: item.supplier,
        name: item.name,
        type: item.type,
        alcoholStyle: item.alcoholStyle,
        price: item.price,
        quantity: item.quantity,
        country: item.country,
        volume: item.volume,
        alcoholPercentage: item.alcoholPercentage

    }));

    // Message is displayed if no data is available
    if (!Array.isArray(inventoryTableData) || inventoryTableData.length === 0) {
        return <div className="flex flex-row bg-amber-50 h-full w-full">No data available</div>;
    }

    console.log('Table Data: ', inventoryTableData);

    return(
        <div className="flex flex-col bg-amber-50 h-full w-full">
            <h1 className="text-2xl font-bold mb-4 text-orange-500 text-center">Inventory</h1>
            <div className="rounded-lg w-full">
            <InventoryTable 
                inventoryTableHeaders={InventoryTableHeaders} 
                inventoryTableData={inventoryTableData}
            />
            </div>
            <div>
                <AddItem fetchInventoryData={fetchInventoryData}/>
            </div>
        </div>
    );

}