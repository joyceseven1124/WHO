'use client';
import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
  MEDIA_QUERY_SSM,
} from '@/src/app/style';
import { useAppDispatch } from '@/src/lib/RThooks';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
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
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const dispatch = useAppDispatch();
  const { handleTextAreaDispatch, getInputValue } =
    useTextAreaInputValue(childKey);
  const valueInputProp = getInputValue();
  const componentHeight = '300px';
  return (
    // <ChildKeyContext.Provider value={childKey}>
    <BannerCardWrapper>
      <ImageComponent styleNodeHeight={componentHeight} />
      <TextArea
        placeholderText="請簡短介紹，字元限制250"
        textCount={250}
        dispatchFunction={handleTextAreaDispatch}
        value={valueInputProp}
        styleHeight={componentHeight}
        // dispatchFunction={handleTextAreaDispatch}
        // value={valueInputProp}
      />
    </BannerCardWrapper>
    // </ChildKeyContext.Provider>
  );
}
