'use client';
import { useAppDispatch } from '@/src/lib/RThooks';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { useContext } from 'react';
import TextArea from '../smallElement/TextArea';

export default function StringCard() {
  const childKey = useContext(ChildKeyContext);
  const { handleTextAreaDispatch, getInputValue } =
    useTextAreaInputValue(childKey);
  const valueInputProp = getInputValue();
  return (
    <TextArea
      placeholderText="請簡短介紹，字元限制1000"
      textCount={1000}
      dispatchFunction={handleTextAreaDispatch}
      value={valueInputProp}
      styleHeight={'300px'}
    />
  );
}
