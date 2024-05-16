import ButtonCva from '@/src/app/ui/ButtonCva';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { createBusinessCard } from '@/src/lib/actions/businessCardAction';
import {
  editCardData,
  selectCardData,
} from '@/src/lib/feature/businessCardDataSlice';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import styled from 'styled-components';
import AuthButtonSubmit from '../../login/AuthButtonSubmit';
import { UploadImage } from './UploadImage';

const FormStyle = styled.form`
  max-width: 400px;
  padding: 20px;
  margin: auto;
  display: grid;
  row-gap: 20px;
`;

const CardInput = styled.div`
  color: black;
  display: grid;
  grid-template-columns: 60px auto;

  align-items: center;
  column-gap: 10px;
  row-gap: 2px;
  width: 100%;

  .input-label {
    cursor: pointer;
    font-size: 18px;
  }

  input,
  textarea {
    border: 1px solid black;
    border-radius: 5px;
    font-size: 16px;
    padding: 10px;
    outline: none;
    &:focus {
      border: 1px solid gray;
    }
  }

  input {
    height: 40px;
  }

  textarea {
    height: 120px;
    resize: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  justify-self: right;
`;

const ErrorMessage = styled.p`
  grid-column: 2;
  color: ${(props) => props.theme.errorRed};
  font-size: 12px;
  text-align: left;
`;

export default function BusinessCardForm() {
  let textAreaLength;
  const data = useAppSelector(selectCardData);
  const dispatch = useAppDispatch();
  const cardType = data.cardType;
  const initialState = { message: null, errors: {}, success: false };
  const [state, formDispatch] = useFormState(createBusinessCard, initialState);
  const pathname = usePathname();
  switch (cardType) {
    case 'BusinessCardBook':
      textAreaLength = 32;

    case 'BusinessCardFlip':
      textAreaLength = 85;

    case 'BusinessCardSlide':
      textAreaLength = 85;

    default:
      textAreaLength = 96;
  }

  useEffect(() => {
    if (state && state.success) {
      dispatch(editCardData({ submitStatus: true }));
    }
  }, [state, dispatch]);

  return (
    <FormStyle action={formDispatch}>
      {/* <input type="hidden" name="id" value={'/test'} /> */}
      <input type="hidden" name="position" value={pathname} />
      <input type="hidden" name="cardType" value={data.cardType} />
      <input
        type="hidden"
        name="userPhotoUrl"
        value={data.userPhotoUrl || ''}
      />
      <input
        type="hidden"
        name="userBgPhotoUrl"
        value={data.userBgPhotoUrl || ''}
      />
      <CardInput>
        <label className="input-label" htmlFor="userPhotoInput">
          大頭貼:
        </label>
        <UploadImage
          imageLabel={'限1MB'}
          id={'userPhotoInput'}
          inputName="userPhoto"
          value={data.userPhoto}
        />
        {state?.errors?.userPhoto &&
          state.errors.userPhoto.map((error: string) => (
            <ErrorMessage key={error}>{error}</ErrorMessage>
          ))}
      </CardInput>

      <CardInput>
        <label className="input-label" htmlFor="nameInput">
          名稱:
        </label>
        <input
          type="text"
          maxLength={12}
          placeholder="限制12字元"
          id="nameInput"
          name="name"
          onChange={(e) =>
            dispatch(
              editCardData({ name: e.target.value, submitStatus: false })
            )
          }
          value={data.name}
        ></input>
        {state?.errors?.name &&
          state.errors.name.map((error: string) => (
            <ErrorMessage key={error}>{error}</ErrorMessage>
          ))}
      </CardInput>

      <CardInput>
        <label className="input-label" htmlFor="workInput">
          職稱:
        </label>
        <input
          type="text"
          maxLength={12}
          placeholder="限制12字元"
          id="workInput"
          name="work"
          onChange={(e) =>
            dispatch(
              editCardData({ work: e.target.value, submitStatus: false })
            )
          }
          value={data.work}
        ></input>
        {state?.errors?.work &&
          state.errors.work.map((error: string) => (
            <ErrorMessage key={error}>{error}</ErrorMessage>
          ))}
      </CardInput>

      <CardInput>
        <label className="input-label" htmlFor="introductionInput">
          介紹:
        </label>
        <textarea
          maxLength={textAreaLength}
          placeholder={`限制字數${textAreaLength}`}
          id="introductionInput"
          name="description"
          onChange={(e) =>
            dispatch(
              editCardData({ description: e.target.value, submitStatus: false })
            )
          }
          value={data.description}
        />
      </CardInput>

      {cardType === 'BusinessCardFlip' && (
        <CardInput>
          <label className="input-label" htmlFor="bgPhotoInput">
            背景圖:
          </label>
          <UploadImage
            imageLabel={'限1MB'}
            id={'bgPhotoInput'}
            inputName="userBgPhoto"
            value={data.userBgPhoto}
          />
        </CardInput>
      )}

      <ButtonWrapper>
        {state.success && data.submitStatus ? (
          <div className="text-lime-600">儲存成功</div>
        ) : (
          <AuthButtonSubmit>儲存</AuthButtonSubmit>
          // <ButtonCva type="submit" intent={'secondary'}>
          //   儲存
          // </ButtonCva>
        )}
      </ButtonWrapper>
    </FormStyle>
  );
}
