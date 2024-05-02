import { BusinessCardListProp, ImageTypeScript } from '@/src/lib/definitions';
import { db } from '@/src/lib/firebaseConfig';
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { unstable_noStore as noStore } from 'next/cache';

const rootCardPerPageCount = 12;

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
            // rootCard.push(doc.data());
            const data = doc.data();
            rootCard.push({
              id: doc.id,
              cardType: data.cardType,
              name: data.name,
              work: data.work,
              description: data.description,
              userPhoto: data.userPhoto,
              userBgPhoto: data.userBgPhoto,
              finishAllForm: data.finishAllForm,
              time: data.time,
            });
          });
          // return rootCard;
          resolve(rootCard);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    } catch (error) {
      console.log(error);
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

export async function saveImage(file: File) {
  noStore();
  const storage = getStorage();
  const metadata = {
    contentType: `${file.type}`,
  };
  const storageRef = ref(storage, 'rootCard/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  try {
    await uploadTask;
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    return url;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}
