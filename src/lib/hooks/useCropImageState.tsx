import { useState } from 'react';
import { Area } from 'react-easy-crop';
import getCroppedImg, { CroppedImageResult } from '../utils/cropImage';

export default function useCropImageState(
  initialValue: string | ArrayBuffer | null
) {
  const [state, setState] = useState(initialValue);
  async function setCropImageState(
    imageURL: string,
    croppedAreaPixels: Area | null,
    rotation: number,
    imageInformation: string
  ) {
    if (imageURL && croppedAreaPixels) {
      return new Promise((resolve, reject) => {
        getCroppedImg(imageURL, croppedAreaPixels, rotation)
          .then((cropResult) => {
            if (cropResult) {
              const { file, url } = cropResult as CroppedImageResult;
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  if (typeof reader.result === 'string')
                    setState(reader.result);
                };
              }
            }
            resolve(true);
          })
          .catch((error) => {
            setState(null);
            reject(false);
          });
      });
    }
  }

  return [state, setCropImageState] as [
    string | ArrayBuffer | null,
    (
      imageURL: string,
      croppedAreaPixels: Area | null,
      rotation: number,
      imageInformation: string
    ) => Promise<void>,
  ];
}
