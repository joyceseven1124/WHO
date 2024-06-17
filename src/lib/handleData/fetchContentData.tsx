// 'use server';
import { db } from '@/src/lib/firebaseConfig';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
} from 'firebase/firestore';
import { unstable_noStore as noStore } from 'next/cache';
import { orderData } from '../utils/orderData';

const rootCardPerPageCount = 12;
const mouseReplace = process.env.NEXT_PUBLIC_MOUSE_REPLACE || '';

export async function fetchCountPageRootCard() {
  noStore();
  try {
    const coll = collection(db, 'blogRootList');
    const snapshot = await getCountFromServer(coll);
    const page = Math.ceil(snapshot.data().count / rootCardPerPageCount);
    return page;
  } catch (error) {
    return error;
  }
}

export async function fetchViewContent(id: string) {
  noStore();
  const newId = id.replace(/%40|@/g, mouseReplace);
  const viewDataPath = doc(db, 'blogs', newId);
  const viewData = await getDoc(viewDataPath);
  if (viewData.exists()) {
    const data = viewData.data();
    const { formData, selfInformation } = data;
    const newData = orderData({ formData, selfInformation });
    return { success: true, data: newData };
  } else {
    return { success: false, data: null };
  }
}

export async function fetchBusinessCard(id: string) {
  noStore();
  const newId = id.replace(/%40|@/g, mouseReplace);
  const cardDataPath = doc(db, 'blogRootList', newId);
  const cardData = await getDoc(cardDataPath);
  if (cardData.exists()) {
    return { success: true, data: cardData.data() };
  } else {
    return { success: false, data: null };
  }
}
