'use client';
import ButtonCva from '@/src/app/ui/ButtonCva';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const EditLinkCard = styled.form`
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
  const LinkTitle = useAppSelector((state) => state.FormData.formData);
  const dispatch = useAppDispatch();
  return (
    <EditLinkCard>
      <EditLinkInput>
        <label htmlFor="linkTitle">連結標題:</label>
        <input type="text" id="linkTitle" placeholder="了解更多" />
      </EditLinkInput>
      <EditLinkInput>
        <label htmlFor="linkURL">連結:</label>
        <input type="text" id="linkURL" placeholder="https://www.test.com/" />
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
            setShowCardList(false);
          }}
        >
          確認
        </ButtonCva>
      </EditLinkButtons>
    </EditLinkCard>
  );
}
