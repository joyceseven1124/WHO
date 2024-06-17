import { BusinessCardListProp } from '@/src/lib/definitions';
import { db } from '@/src/lib/firebaseConfig';
import {
  and,
  collection,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

type CallbackType = (data: BusinessCardListProp[], error?: Error) => void;

export const getRootCards = (
  page: number = 1,
  keyWord: string | null = null,
  callback: CallbackType
): (() => void) => {
  const rootCardPerPageCount = 12;
  const lastVisible = (page - 1) * rootCardPerPageCount - 1;
  let qRootCard;

  if (!keyWord) {
    qRootCard = query(
      collection(db, 'blogRootList'),
      and(where('finishAllForm', '==', true)),
      orderBy('time'),
      startAfter(lastVisible),
      limit(rootCardPerPageCount)
    );
  } else {
    qRootCard = query(
      collection(db, 'blogRootList'),
      and(
        where('finishAllForm', '==', true),
        or(where('work', '==', keyWord), where('userName', '==', keyWord))
      ),
      orderBy('time'),
      startAfter(lastVisible),
      limit(rootCardPerPageCount)
    );
  }

  const unsubscribe = onSnapshot(
    qRootCard,
    (querySnapshot) => {
      const rootCard: BusinessCardListProp[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        rootCard.push({
          id: doc.id,
          cardType: data.cardType,
          userName: data.userName || '',
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
      callback(rootCard);
    },
    (error) => {
      console.error('Error getting documents: ', error);
      callback([], error);
    }
  );

  return unsubscribe;
};
