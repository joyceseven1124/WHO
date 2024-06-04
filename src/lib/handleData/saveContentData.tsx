// 'use server';
// import { auth } from '@/src/auth';
import { BusinessCardListProp, ImageTypeScript } from '@/src/lib/definitions';
import { db } from '@/src/lib/firebaseConfig';
import { getToken } from '@/src/lib/handleData/handleAuthData';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from 'firebase/storage';
import { unstable_noStore as noStore } from 'next/cache';

const mouseReplace = process.env.NEXT_PUBLIC_MOUSE_REPLACE || '';

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
  const tokens = await getToken();
  if (tokens && tokens?.decodedToken.email) {
    const userId = tokens?.decodedToken.email.replace(/%40|@/g, mouseReplace);
    try {
      await setDoc(doc(db, 'blogs', userId), formData);
      await updateDoc(doc(db, 'blogRootList', userId), { finishAllForm: true });
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error };
    }
  } else {
    return { success: false, errorMessage: '請先登入' };
  }
}

export async function saveCardContent(id: string, data: BusinessCardListProp) {
  const newId = id.replace(/%40|@/g, mouseReplace);
  await setDoc(doc(db, 'blogRootList', newId), data);
}
