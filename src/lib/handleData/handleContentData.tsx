'use server';
import { auth } from '@/src/auth';
import { BusinessCardListProp, ImageTypeScript } from '@/src/lib/definitions';
import { db } from '@/src/lib/firebaseConfig';
import { checkAuthStatus } from '@/src/lib/handleData/HandleAuth';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from 'firebase/storage';
import { unstable_noStore as noStore } from 'next/cache';
import { orderData } from '../utils/orderData';

const rootCardPerPageCount = 12;
const mouseReplace = process.env.MOUSE_REPLACE || '';

export async function websocketRootCard(): Promise<BusinessCardListProp[]> {
  noStore();
  return new Promise((resolve, reject) => {
    try {
      const qRootCard = query(
        collection(db, 'blogRootList'),
        where('finishAllForm', '==', true)
      );
      const unsubscribe = onSnapshot(
        qRootCard,
        (querySnapshot) => {
          const rootCard: BusinessCardListProp[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            rootCard.push({
              id: data.id,
              cardType: data.cardType,
              name: data.name,
              work: data.work,
              description: data.description,
              userPhotoUrl: data.userPhotoUrl,
              userPhotoInformation: data.userPhotoInformation,
              userBgPhotoUrl: data.userBgPhotoUrl || null,
              userBgPhotoInformation: data.userBgPhotoInformation || null,
              finishAllForm: data.finishAllForm,
              time: data.time,
              submitStatus: true,
              userPhoto: null,
              userBgPhoto: null,
            });
          });
          resolve(rootCard);
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

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

export async function saveImage(file: File, imageName: string) {
  noStore();
  const storage = getStorage();
  const metadata = {
    contentType: `${file.type}`,
  };
  const storageRef = ref(storage, 'rootCard/' + imageName);
  try {
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    await uploadTask;
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    return { status: true, url: url };
  } catch (error) {
    return { status: false, error: error };
  }
}

export async function saveImageBase64Crop(file: string, imageName: string) {
  noStore();
  const storage = getStorage();
  const storageRef = ref(storage, 'rootCard/' + imageName);
  try {
    const snapshot = await uploadString(storageRef, file, 'data_url');
    const url = await getDownloadURL(snapshot.ref);
    return { status: true, url: url };
  } catch (error) {
    return { status: false, error: error };
  }
}

export async function deleteImage(imagePath: string) {
  noStore();
  const storage = getStorage();
  const desertRef = ref(storage, imagePath);
  deleteObject(desertRef)
    .then(() => {
      return { result: true };
    })
    .catch((error) => {
      return { result: false, message: error };
    });
}

export async function saveFormData(formData: any) {
  const result = await checkAuthStatus();
  const session = await auth();
  if (session && session.user && session.user.email && result.authStatus) {
    const newId = session.user.email.replace(/%40|@/g, mouseReplace);
    try {
      await setDoc(doc(db, 'blogs', newId), formData);
      await updateDoc(doc(db, 'blogRootList', newId), { finishAllForm: true });
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error };
    }
  }
}

export async function saveCardContent(id: string, data: BusinessCardListProp) {
  const newId = id.replace(/%40|@/g, mouseReplace);
  await setDoc(doc(db, 'blogRootList', newId), data);
}
