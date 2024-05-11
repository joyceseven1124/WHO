'use server';
// import { BusinessCardItems } from '@/src/lib/feature/businessCardDataSlice';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { db } from '@/src/lib/firebaseConfig';
import { saveImage } from '@/src/lib/handleData/handleContentData';
import { doc, setDoc } from 'firebase/firestore';
import { z } from 'zod';
import { checkAuthStatus } from '../handleData/HandleAuth';
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
    // id: z.string(),
    cardType: z.enum(
      ['BusinessCardBook', 'BusinessCardFlip', 'BusinessCardSlide'],
      {
        invalid_type_error: '請選擇其中一個卡片樣式',
      }
    ),
    name: z.string().nonempty({ message: '名稱不可為空' }),
    work: z.string().nonempty({ message: '職稱不可為空' }),
    description: z.string().nullable(),
    userPhoto: z
      .any({ invalid_type_error: '必須放上大頭貼' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        '需繳交圖檔，如jpeg|jpg|png|webp'
      ),
    userPhotoInformation: z.string(),
    userBgPhotoInformation: z.string(),
    userBgPhoto: z
      .any({ invalid_type_error: '必須繳交圖檔' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        '需繳交圖檔，如jpeg|jpg|png|webp'
      )
      .nullable(),
  })
  .omit({ id: true, userPhotoInformation: true, userBgPhotoInformation: true });
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
  console.log('近來');
  const validatedFields = CreateBusinessCard.safeParse({
    cardType: formData.get('cardType'),
    name: formData.get('name'),
    work: formData.get('work'),
    description: formData.get('description'),
    userPhoto: formData.get('userPhoto'),
    userBgPhoto: formData.get('userBgPhoto'),
  });

  if (!validatedFields.success) {
    console.log('創建失敗');
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
  const result = await checkAuthStatus();
  console.log('目前登入狀態1234', result);

  if (result.authStatus) {
    try {
      // 先暫時隱藏 今天修改一下

      const userImageUrl = await saveImage(userPhoto, userPhotoInformation);
      let userImageBgUrl;

      if (userBgPhoto) {
        userImageBgUrl = await saveImage(userBgPhoto, userBgPhotoInformation);
      }

      await setDoc(doc(db, 'blogRootList', result.uid), {
        id: result.uid,
        cardType: cardType,
        name: name,
        work: work,
        description: description,
        userPhotoUrl: userImageUrl.url,
        userPhotoInformation: userPhotoInformation,
        // userPhoto: {
        //   url:userPhoto,
        //   // size: userPhoto.size,
        //   // type: userPhoto.type,
        //   name: userPhotoInformation,
        //   // lastModified: userPhoto.lastModified,
        // },
        userBgPhotoUrl: userImageBgUrl?.url || userBgPhoto,
        userBgPhotoInformation: userBgPhotoInformation,
        // 暫時
        finishAllForm: true,
        time: date,
        submitStatus: true,
      });
      return {
        success: true,
      };
    } catch (error) {
      return { success: false, message: '儲存失敗' };
    }
  }

  return { success: false, message: '請登入後再填寫資料' };
}
