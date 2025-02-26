"use client";

/**
 ** Component: DeleteItemButton.js
 **
 ** Description:
 ** This button component will be nested in the Edit Item Form Modal.
 ** It will allow users to delete items from the firestore inventory database.
 **/

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../_utils/Firebase';


export default function DeleteItemModalButton( {itemID}) {
    
    const handleDelete = async (itemID) => {
        try {
            const itemRef = doc(db, "Inventory_Database", itemID);
            await deleteDoc(itemRef);
            console.log(`Item ${itemID} has been successfully deleted from the database`);
        } catch (error) {
            console.error('Error deleting item: ', error);
            throw error;
        };
    };

    const handleCancel = async () => {
        console.log('Delete action has been cancelled');
        return;
    }
    
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Delete</button>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
               <p>Are you sure you want to delete the following item? This action cannot be undone.</p>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn bg-slate-200 text-black rounded lg" onClick={handleCancel}>Cancel</button>
                    <button className="btn bg-red-600 text-white rounded-lg" onClick={() => handleDelete(itemID)}>Delete</button>
                </form>
                </div>
            </div>
            </dialog>
        </div>
    );

}