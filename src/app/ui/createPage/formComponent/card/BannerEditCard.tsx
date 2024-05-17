'use client';
import { MEDIA_QUERY_SM } from '@/src/app/style';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { ChildKeyContext } from '@/src/lib/provider/context';
import { useContext } from 'react';
import styled from 'styled-components';
import ImageComponent from '../smallElement/ImageComponent';
import TextArea from '../smallElement/TextArea';

const BannerCardWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 10px;
  ${MEDIA_QUERY_SM} {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }
`;

export default function BannerEditCard() {
  const childKey = useContext(ChildKeyContext);
  const { handleTextAreaDispatch, getInputValue } =
    useTextAreaInputValue(childKey);
  const valueInputProp = getInputValue();
  const componentHeight = '300px';
  return (
    <BannerCardWrapper>
      <ImageComponent styleNodeHeight={componentHeight} />
      <TextArea
        placeholderText="請簡短介紹，字元限制500"
        textCount={500}
        dispatchFunction={handleTextAreaDispatch}
        value={valueInputProp}
        styleHeight={componentHeight}
      />
    </BannerCardWrapper>
  );
}
