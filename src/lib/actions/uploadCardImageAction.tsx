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
    const imageUploadURL = await saveImage(imageFile, fileName);
    console.log(imageUploadURL, '圖片上傳問題');
    if (imageUploadURL.status) {
      return {
        ...state,
        success: true,
        message: '上傳成功',
        successImageUrl: imageUploadURL.url,
      };
    } else {
      return { ...state, message: '請重新上傳一次', success: false };
    }
    console.log(imageUploadURL, '圖片上傳問題');
  } catch (error) {
    return { ...state, message: '上傳過程中發生錯誤', success: false };
  }
}
