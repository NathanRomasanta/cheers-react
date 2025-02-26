'use client';

/**
 **  Component: inventoryTable.js
 **
 **  Description:
 **  This component is responsible for rendering the inventory table
 **  with the fetched data from Firestore.
 **  Inventory Item Data is mapped using their props 
 **/

import React from 'react';
import EditItemModalButton from './editItemModal';


 export default function InventoryTable({ inventoryTableHeaders, inventoryTableData}) {

    return(
        <div className="flex flex-col gap-8 h-full w-full rounded-lg bg-zinc-800 overflow-scroll px-15 items-center">
            <div>
            <table className="table table-pin-rows table-pin-cols table-sm">
                
                {/* Table Header Data passed from Parent Component */}
                <thead>
                    <tr className="bg-white text-black border-black">
                        {inventoryTableHeaders.map((header, index) => (
                            <th 
                                key={index} 
                                className="text-center m-2 p-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                
                {/* Table Row Data fetched from Firestore in Parent Component*/}
                <tbody>
                    {inventoryTableData.map((item, index) => {
                        console.log('FETCHING Item ID: ', item.id);
                        return(
                        <tr key={index} className="hover border p-2">
                            <td className="border p-2">
                                <input type="checkbox" className="hover:border-red-700 hover:border-2"/>
                            </td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.id}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.supplier}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.name}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.type}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.alcoholStyle}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.price}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.quantity}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.country}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.volume}</td>
                            <td className="hover:text-red-700 text-center m-2 p-3">{item.alcoholPercentage}</td>
                            <td className="text-center align-middle">
                                <EditItemModalButton itemID={item.id}/>
                            </td>
                        </tr>
                        );
                    })}
                    
                </tbody>
            </table>
            </div>
        </div>
    );
 }
