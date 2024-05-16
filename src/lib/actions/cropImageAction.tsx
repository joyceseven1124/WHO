'use server';
import {
  deleteImage,
  saveImageBase64Crop,
} from '@/src/lib/handleData/handleContentData';
import { State } from '../definitions';

const cropImageAction = async (
  prevState: State | void,
  formData: FormData
): Promise<State | void> => {
  const imageURL = formData.get('imageURL') as string;
  const imageInformation = formData.get('imageInformation') as string;
  const cropResult = formData.get('cropResult') as string;

  try {
    if (cropResult) {
      const imageUploadValue = await saveImageBase64Crop(
        cropResult,
        imageInformation
      );
      console.log('儲存過後的網址結果', imageUploadValue);
      if (imageUploadValue.status) {
        deleteImage(imageURL);
        return {
          message: '裁切成功',
          errors: '',
          success: true,
          resultData: imageUploadValue.url,
        };
      }
    }
    return { message: '請重新再試一遍', errors: '', success: false };
  } catch (error) {
    return { message: '裁切失敗', errors: error, success: false };
  }
};

export { cropImageAction };
