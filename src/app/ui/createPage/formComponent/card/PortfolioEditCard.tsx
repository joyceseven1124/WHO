'use client';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { removeFormChildElement } from '@/src/lib/feature/formDataSlice';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { useContext } from 'react';
import styled from 'styled-components';
import { PortfolioCardStyle } from '../../../ComponentStyle';
import DeleteButton from '../button/DeleteButton';
import ImageComponent from '../smallElement/ImageComponent';
import LinkComponent from '../smallElement/LinkComponent';
import TextArea from '../smallElement/TextArea';

export default function PortfolioEditCard({ childKey }: { childKey: string }) {
  const nodeKey = useContext(NodeKeyContext);
  const dispatch = useAppDispatch();
  const { handleTextAreaDispatch, getInputValue } =
    useTextAreaInputValue(childKey);
  const valueInputProp = getInputValue();

  return (
    <ChildKeyContext.Provider value={childKey}>
      <PortfolioCardStyle className={childKey} data-id={childKey}>
        <div
          className="mb-2 flex justify-end"
          onClick={() => {
            dispatch(
              removeFormChildElement({ nodeKey: nodeKey, childKey: childKey })
            );
          }}
        >
          <DeleteButton />
        </div>
        <div className="mb-4">
          <ImageComponent />
        </div>
        <div className="mb-4">
          <TextArea
            placeholderText="請簡短介紹，字元限制120 例如：購物網站"
            textCount={120}
            dispatchFunction={handleTextAreaDispatch}
            value={valueInputProp}
          />
        </div>
        <div className="mb-4 flex justify-end">
          <LinkComponent />
        </div>
      </PortfolioCardStyle>
    </ChildKeyContext.Provider>
  );
}
