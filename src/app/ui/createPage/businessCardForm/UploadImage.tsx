import { Theme } from '@/src/app/theme';
import ButtonCva from '@/src/app/ui/ButtonCva';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { ImageTypeScript } from '@/src/lib/definitions';
import {
  editCardData,
  selectCardData,
} from '@/src/lib/feature/businessCardDataSlice';
import useImage from '@/src/lib/hooks/useImage';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UploadingButton from './UploadingButtonStyle';

export function UploadImage({
  imageLabel,
  id,
  inputName,
  value,
}: {
  imageLabel: string;
  id: string;
  inputName: string;
  value: ImageTypeScript | null;
}) {
  const { image, handleUpload, handleRemove, inputRef } = useImage();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCardData);
  const [errorMessage, setErrorMessage] = useState<null | string>();
  useEffect(() => {
    if (!data.submitStatus) {
      dispatch(editCardData({ [inputName]: image as ImageTypeScript }));
    }
  }, [image, dispatch, inputName, data.submitStatus]);

  return (
    <div>
      <input
        type="file"
        id={id}
        accept="image/jpeg, image/jpg, image/png, image/webp"
        onChange={(e) => {
          const result = handleUpload(e);
          dispatch(editCardData({ submitStatus: false }));
          if (!result.result && result.error) {
            setErrorMessage(result.error);
          }
        }}
        ref={inputRef}
        style={{ display: 'none' }}
        name={inputName}
      />

      {data[inputName] ? (
        <div className="flex w-full items-center justify-between">
          <Image
            src={(data[inputName] as ImageTypeScript)?.url}
            alt={(data[inputName] as ImageTypeScript)?.name}
            width={150}
            height={150}
          />
          <ButtonCva
            onClick={() => {
              dispatch(editCardData({ submitStatus: false }));
              handleRemove();
            }}
          >
            Remove
          </ButtonCva>
        </div>
      ) : (
        <label htmlFor={id}>
          <div className="flex items-center gap-x-2">
            <UploadingButton>Upload Image</UploadingButton>
            <div>
              {errorMessage ? (
                <div style={{ color: Theme.errorRed }}>{errorMessage}</div>
              ) : (
                imageLabel
              )}
            </div>
          </div>
        </label>
      )}
    </div>
  );
}
