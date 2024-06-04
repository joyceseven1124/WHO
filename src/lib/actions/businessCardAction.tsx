'use server';
import { auth } from '@/src/auth';
import {
  saveCardContent,
  saveImage,
} from '@/src/lib/handleData/handleContentData';
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
    userName: z.string().nonempty({ message: '名稱不可為空' }),
    work: z.string().nonempty({ message: '職稱不可為空' }),
    description: z.string().nullable(),
    position: z.string(),
    userPhoto: z
      .any({ invalid_type_error: '必須放上大頭貼' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小'),
    userPhotoInformation: z.string(),
    userBgPhotoInformation: z.string(),
    userBgPhoto: z
      .any({ invalid_type_error: '必須繳交圖檔' })
      .refine((file) => file?.size <= MAX_FILE_SIZE, '只能繳交1MB的圖片大小')
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
    userName?: string[];
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
    userName: formData.get('userName'),
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
  const { cardType, userName, work, description, userPhoto, userBgPhoto } =
    validatedFields.data;
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

  const result = await checkAuthStatus();
  const session = await auth();
  if (session && session.user && session.user.email) {
    try {
      let userImageUrl;
      if (userPhotoUrl === '') {
        userImageUrl = await saveImage(userPhoto, userPhotoInformation);
      }
      let userImageBgUrl;
      if (userBgPhotoUrl === '' && userBgPhoto && userBgPhotoInformation) {
        userImageBgUrl = await saveImage(userBgPhoto, userBgPhotoInformation);
      }
      const data = {
        id: session.user.email,
        cardType: cardType,
        userName: userName,
        work: work,
        description: description || '',
        userPhotoUrl: userImageUrl?.url || userPhotoUrl || '',
        userPhotoInformation: userPhotoInformation,
        userBgPhotoUrl: userImageBgUrl?.url || userBgPhotoUrl || '',
        userBgPhotoInformation: userBgPhotoInformation || '',
        finishAllForm: !checkIsFirstSubmit,
        time: date,
        submitStatus: true,
        userPhoto: null,
        userBgPhoto: null,
      };
      await saveCardContent(session.user.email, data);
      return {
        success: true,
        message: '儲存成功，請按下一步',
      };
    } catch (error) {
      return { success: false, message: '儲存失敗' };
    }
  }

  return { success: false, message: '請登入後再填寫資料' };
}
