import { BusinessCardListProp, ImageTypeScript } from '@/src/lib/definitions';
import { FormDataList } from '@/src/lib/feature/formDataSlice';
import { db } from '@/src/lib/firebaseConfig';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { unstable_noStore as noStore } from 'next/cache';
import { checkAuthStatus } from './HandleAuth';

const rootCardPerPageCount = 12;

export async function websocketRootCard(): Promise<BusinessCardListProp[]> {
  noStore();
  return new Promise((resolve, reject) => {
    try {
      console.log('監測中');
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
              userPhotoUrl: data.userPhotoUrl,
              userPhotoInformation: data.userPhotoInformation,
              userBgPhotoUrl: data.userBgPhotoUrl || null,
              userBgPhotoInformation: data.userBgPhotoInformation || null,
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

export async function fetchViewContent(id: string) {
  const viewDataPath = doc(db, 'blogs', id);
  const viewData = await getDoc(viewDataPath);
  if (viewData.exists()) {
    console.log('存在', viewData.data());
  } else {
    console.log('不存在任何資料');
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
    // throw error;
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

export async function saveFormData(formData: FormDataList) {
  const result = await checkAuthStatus();
  console.log('這個人儲存表單', result);
  if (result.authStatus) {
    await setDoc(doc(db, 'blogs', result.uid), formData.formData);
  }
}

export async function saveCardContent(id: string, data: BusinessCardListProp) {
  await setDoc(doc(db, 'blogRootList', id), data);
}
