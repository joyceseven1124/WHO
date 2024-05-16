'use server';
import { z } from 'zod';
import { saveImage } from '../handleData/handleContentData';

export type State = {
  cardImage?: {
    file?: string[];
  };
  message?: string | null;
  success?: boolean;
  errors?: Record<string, string[]>;
  successImageUrl?: string;
};

const MAX_FILE_SIZE = 1048576;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// 更新 Zod schema 使用正确的文件验证
const UploadCardImageSchema = z.object({
  cardImage: z
    .any({ invalid_type_error: '必須放上' })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: '只能繳交5MB的圖片大小',
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      '需繳交圖檔，如jpeg|jpg|png|webp'
    )
    .nullable(),
});

export async function uploadCardImageAction(
  state: State,
  formData: FormData
): Promise<State> {
  try {
    console.log('我要上傳圖片囉');
    const file = formData.get('cardImage');
    const validatedFields = UploadCardImageSchema.safeParse({
      cardImage: file,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        message: '請重新上傳圖片',
        success: false,
      };
    }

    const imageFile = validatedFields.data.cardImage;
    const fileName = (formData.get('fileName') as string) || imageFile.name;
    // 先暫時拿掉
    const imageUploadURL = await saveImage(imageFile, fileName);
    console.log('儲存完畢', fileName, imageUploadURL);
    if (imageUploadURL.status) {
      console.log('上傳成功');
      return {
        ...state,
        success: true,
        message: '上傳成功',
        successImageUrl: imageUploadURL.url,
      };
    } else {
      console.log('上傳失敗再一次');
      return { ...state, message: '請重新上傳一次', success: false };
    }
  } catch (error) {
    console.log(error, '圖片無法上傳的原因');
    return { ...state, message: '上傳過程中發生錯誤', success: false };
  }
}
