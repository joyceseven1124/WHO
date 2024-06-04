'use server';
import { saveImageBase64Crop } from '@/src/lib/handleData/saveContentData';
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
      if (imageUploadValue.status) {
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
