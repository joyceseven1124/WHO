'use server';
// import { BusinessCardItems } from '@/src/lib/feature/businessCardDataSlice';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { db } from '@/src/lib/firebaseConfig';
import { saveImage } from '@/src/lib/handleData';
import { doc, setDoc } from 'firebase/firestore';
import { z } from 'zod';
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
    userPhoto: z
      .any({ invalid_type_error: '必須放上大頭貼' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        '需繳交圖檔，如jpeg|jpg|png|webp|gif'
      ),
    userBgPhoto: z
      .any({ invalid_type_error: '必須繳交圖檔' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        '需繳交圖檔，如jpeg|jpg|png|webp|gif'
      )
      .nullable(),
  })
  .omit({ id: true });
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
      errors: validatedFields.error.flatten().fieldErrors,
      message: '創建失敗，有些欄位未符合標準',
    };
  }
  const { cardType, name, work, description, userPhoto, userBgPhoto } =
    validatedFields.data;
  const id = 'test2';
  const date = getCurrentDateFormatted();
  try {
    const userImageUrl = await saveImage(userPhoto);
    await setDoc(doc(db, 'blogRootList', id), {
      id: id,
      cardType: cardType,
      name: name,
      work: work,
      description: description,
      url: userImageUrl,
      userPhoto: {
        url: userImageUrl,
        size: userPhoto.size,
        type: userPhoto.type,
        name: `test-user-name`,
        lastModified: userPhoto.lastModified,
      },
      userBgPhoto: userBgPhoto,
      // 暫時
      finishAllForm: true,
      time: date,
    });
    return {
      success: true,
    };
  } catch (error) {
    return { success: false, message: '儲存失敗' };
  }
}
