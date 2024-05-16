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

export default function StringCard() {
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const dispatch = useAppDispatch();
  const { handleTextAreaDispatch, getInputValue } =
    useTextAreaInputValue(childKey);
  const valueInputProp = getInputValue();
  return (
    <TextArea
      placeholderText="請簡短介紹，字元限制300"
      textCount={300}
      dispatchFunction={handleTextAreaDispatch}
      value={valueInputProp}
      styleHeight={'300px'}
    />
  );
}
