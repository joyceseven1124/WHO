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
  const inputValue =
    typeof data[`${inputName}Information`] === 'string'
      ? data[`${inputName}Information`]
      : '';
  useEffect(() => {
    if (!data.submitStatus) {
      dispatch(
        editCardData({
          [inputName]: image as ImageTypeScript,
          [`${inputName}Information`]: (image as ImageTypeScript)?.name || '',
        })
      );
    }
  }, [image, dispatch, inputName, data.submitStatus]);

  return (
    <div>
      <input
        type="hidden"
        // className='hidden'
        // value={(data[inputName] as ImageTypeScript)?.name || ''}
        value={inputValue as string}
        name={`${inputName}Information`}
      />
      <input
        type="file"
        id={id}
        accept="image/jpeg, image/jpg, image/png, image/webp"
        onChange={(e) => {
          const result = handleUpload(e);
          if (!result.result && result.error) {
            setErrorMessage(result.error);
          } else {
            dispatch(editCardData({ submitStatus: false }));
          }
        }}
        ref={inputRef}
        style={{ display: 'none' }}
        name={inputName}
      />

      {data[inputName] || data[`${inputName}Url`] ? (
        <div className="flex w-full items-center justify-between">
          <Image
            src={
              (data[inputName] as ImageTypeScript)?.url ||
              (data[`${inputName}Url`] as string)
            }
            // alt={(data[inputName] as ImageTypeScript)?.name}
            alt={inputValue as string}
            width={150}
            height={150}
          />
          <ButtonCva
            onClick={() => {
              dispatch(
                editCardData({
                  submitStatus: false,
                  [inputName]: null,
                  [`${inputName}Information`]: '',
                  [`${inputName}Url`]: '',
                })
              );
              handleRemove();
            }}
            type="button"
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
