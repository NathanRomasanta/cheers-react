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
    return await addDoc(
      collection(db, 'Pos_Items', data.category, 'wine_items'),
      data
    );
  }
  if (data.category === 'cocktails') {
    return await addDoc(
      collection(db, 'Pos_Items', data.category, 'cocktail_items'),
      data
    );
  }
  if (data.category === 'beers') {
    return await addDoc(
      collection(db, 'Pos_Items', data.category, 'beer_items'),
      data
    );
  }
  if (data.category === 'food') {
    return await addDoc(
      collection(db, 'Pos_Items', data.category, 'food_items'),
      data
    );
  }
}

export default addPosItem;
