import {
  collection,
  doc,
  setDoc,
  getFirestore,
  addDoc,
} from 'firebase/firestore';
import { db } from '../../_utils/Firebase';

async function addPosItem(data) {
  if (data.category === 'wines') {
    await addDoc(
      collection(db, 'Pos_Items', data.category, 'wine_items'),
      data
    );
  }
  if (data.category === 'cocktails') {
    await addDoc(
      collection(db, 'Pos_Items', data.category, 'cocktail_items'),
      data
    );
  }
}

export default addPosItem;
