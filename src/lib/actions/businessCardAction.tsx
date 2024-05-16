'use server';
// import { BusinessCardItems } from '@/src/lib/feature/businessCardDataSlice';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { auth } from '@/src/auth';
import { db } from '@/src/lib/firebaseConfig';
import {
  saveCardContent,
  saveImage,
} from '@/src/lib/handleData/handleContentData';
import { doc, setDoc } from 'firebase/firestore';
import { z } from 'zod';
import { checkAuthStatus } from '../handleData/handleAuth';
import { getCurrentDateFormatted } from '../utils/getCurrentDateFormatted';

const MAX_FILE_SIZE = 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const BusinessCardSchema = z
  .object({
    id: z.string(),
    cardType: z.enum(
      ['BusinessCardBook', 'BusinessCardFlip', 'BusinessCardSlide'],
      {
        invalid_type_error: '請選擇其中一個卡片樣式',
      }
    ),
    name: z.string().nonempty({ message: '名稱不可為空' }),
    work: z.string().nonempty({ message: '職稱不可為空' }),
    description: z.string().nullable(),
    position: z.string(),
    userPhoto: z
      .any({ invalid_type_error: '必須放上大頭貼' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小'),
    // .refine(
    //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //   '需繳交圖檔，如jpeg|jpg|png|webp'
    // ),
    userPhotoInformation: z.string(),
    userBgPhotoInformation: z.string(),
    userBgPhoto: z
      .any({ invalid_type_error: '必須繳交圖檔' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小')
      // .refine(
      //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      //   '需繳交圖檔，如jpeg|jpg|png|webp'
      // )
      .nullable(),

    userPhotoUrl: z.string(),
    userBgPhotoUrl: z.string(),
  })
  .omit({
    id: true,
    userPhotoInformation: true,
    userBgPhotoInformation: true,
    position: true,
    userPhotoUrl: true,
    userBgPhotoUrl: true,
  });
const CreateBusinessCard = BusinessCardSchema.superRefine((data, ctx) => {
  if (data.cardType === 'BusinessCardFlip' && !data.userBgPhoto) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '必須放上背景圖片',
    });
  }
});

export type State = {
  errors?: {
    cardType?: string[];
    name?: string[];
    work?: string[];
    description?: string[];
    userPhoto?: string[];
    userBgPhoto?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function createBusinessCard(
  state: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateBusinessCard.safeParse({
    cardType: formData.get('cardType'),
    name: formData.get('name'),
    work: formData.get('work'),
    description: formData.get('description'),
    userPhoto: formData.get('userPhoto'),
    userBgPhoto: formData.get('userBgPhoto'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: '創建失敗，有些欄位未符合標準',
    };
  }
  const { cardType, name, work, description, userPhoto, userBgPhoto } =
    validatedFields.data;
  // const id = 'test2';
  const userPhotoInformation =
    formData.get('userPhotoInformation')?.toString() || '';
  const userBgPhotoInformation =
    formData.get('userBgPhotoInformation')?.toString() || '';
  const date = getCurrentDateFormatted();
  const urlPosition = formData.get('position');
  const userPhotoUrl = formData.get('userPhotoUrl') as string;
  const userBgPhotoUrl = formData.get('userBgPhotoUrl') as string;
  let checkIsFirstSubmit = true;
  if (urlPosition !== 'WhoForm/create') {
    checkIsFirstSubmit = false;
  }
  // const result = await checkAuthStatus();
  // console.log('目前登入狀態1234', result);

  // if (result.authStatus) {
  //   try {
  //     const userImageUrl = await saveImage(userPhoto, userPhotoInformation);
  //     let userImageBgUrl;
  //     if (userBgPhoto) {
  //       userImageBgUrl = await saveImage(userBgPhoto, userBgPhotoInformation);
  //     }
  //     await setDoc(doc(db, 'blogRootList', result.email), {
  //       id: result.email,
  //       cardType: cardType,
  //       name: name,
  //       work: work,
  //       description: description,
  //       userPhotoUrl: userImageUrl.url,
  //       userPhotoInformation: userPhotoInformation,
  //       userBgPhotoUrl: userImageBgUrl?.url || userBgPhoto,
  //       userBgPhotoInformation: userBgPhotoInformation,
  //       finishAllForm: true,
  //       time: date,
  //       submitStatus: true,
  //     });
  //     return {
  //       success: true,
  //       message: '儲存成功，請按下一步',
  //     };
  //   } catch (error) {
  //     return { success: false, message: '儲存失敗' };
  //   }
  // }
  const result = await checkAuthStatus();
  console.log('目前登入狀態1234', result);
  const session = await auth();
  if (session && session.user && session.user.email) {
    try {
      let userImageUrl;
      if (userPhotoUrl === '') {
        userImageUrl = await saveImage(userPhoto, userPhotoInformation);
      }
      let userImageBgUrl;
      if (userBgPhoto === '') {
        userImageBgUrl = await saveImage(userBgPhoto, userBgPhotoInformation);
      }
      console.log('儲存成功2');
      const data = {
        id: session.user.email,
        cardType: cardType,
        name: name,
        work: work,
        description: description || '',
        userPhotoUrl: userImageUrl?.url || userPhotoUrl || '',
        userPhotoInformation: userPhotoInformation,
        userBgPhotoUrl: userImageBgUrl?.url || userBgPhotoUrl || '',
        userBgPhotoInformation: userBgPhotoInformation,
        finishAllForm: !checkIsFirstSubmit,
        time: date,
        submitStatus: true,
        userPhoto: null,
        userBgPhoto: null,
      };
      console.log('儲存成功1');
      await saveCardContent(session.user.email, data);
      // await setDoc(doc(db, 'blogRootList', session.user.email), {
      //   id: session.user.email,
      //   cardType: cardType,
      //   name: name,
      //   work: work,
      //   description: description,
      //   userPhotoUrl: userImageUrl.url,
      //   userPhotoInformation: userPhotoInformation,
      //   userBgPhotoUrl: userImageBgUrl?.url || userBgPhoto,
      //   userBgPhotoInformation: userBgPhotoInformation,
      //   finishAllForm: true,
      //   time: date,
      //   submitStatus: true,
      // });
      console.log('儲存成功');
      return {
        success: true,
        message: '儲存成功，請按下一步',
      };
    } catch (error) {
      console.log('儲存失敗', error);
      return { success: false, message: '儲存失敗' };
    }
  }

  return { success: false, message: '請登入後再填寫資料' };
}
