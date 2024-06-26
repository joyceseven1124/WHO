'use client';
import ButtonCva from '@/src/app/ui/ButtonCva';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import {
  editFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

const EditLinkCard = styled.div`
  padding: 12px;
  border: 1px solid ${(props) => props.theme.gray};
  box-shadow: -5px 9px 28px -4px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  width: fit-content;
  display: grid;
  row-gap: 15px;
  position: absolute;
  background-color: white;
  z-index: 20;
`;

const EditLinkInput = styled.div`
  display: grid;
  grid-template-columns: auto 200px;
  column-gap: 10px;
  label {
    color: ${(props) => props.theme.gray};
  }

  input {
    outline: none;
    border: 1px solid ${(props) => props.theme.gray};
    border-radius: 4px;
    padding: 4px;
    font-size: 14px;
  }
`;

const EditLinkButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  column-gap: 10px;
`;

export default function LinkDialog({
  setShowCardList,
}: {
  setShowCardList: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const linkTitleRef = useRef<HTMLInputElement>(null);
  const linkURLRef = useRef<HTMLInputElement>(null);
  const data = useAppSelector(selectFormData);
  const childData = data[nodeKey]['children'][childKey];
  useEffect(() => {
    if (childData && childData.linkText && childData.linkText.trim() !== '') {
      linkTitleRef.current?.setAttribute('value', childData.linkText);
    }

    if (childData && childData.linkURL && childData.linkURL.trim() !== '') {
      linkURLRef.current?.setAttribute('value', childData.linkURL);
    }
  }, [childData]);
  return (
    <EditLinkCard>
      <EditLinkInput>
        <label htmlFor="linkTitle">連結標題:</label>
        <input
          type="text"
          id="linkTitle"
          placeholder="了解更多"
          ref={linkTitleRef}
          maxLength={10}
        />
      </EditLinkInput>
      <EditLinkInput>
        <label htmlFor="linkURL">連結:</label>
        <input
          type="text"
          id="linkURL"
          placeholder="https://www.test.com/"
          ref={linkURLRef}
        />
      </EditLinkInput>
      <EditLinkButtons>
        <ButtonCva
          size={'sm'}
          type="button"
          onClick={() => {
            setShowCardList(false);
          }}
        >
          取消
        </ButtonCva>
        <ButtonCva
          size={'sm'}
          type="button"
          intent={'secondary'}
          onClick={() => {
            dispatch(
              editFormChildElement({
                nodeKey: nodeKey,
                childKey: childKey,
                elements: {
                  linkText: linkTitleRef.current?.value,
                  linkURL: linkURLRef.current?.value,
                },
              })
            );
            setShowCardList(false);
          }}
        >
          確認
        </ButtonCva>
      </EditLinkButtons>
    </EditLinkCard>
  );
}
