'use client';
import { useState } from 'react';
import styled from 'styled-components';
import LinkDialog from './LinkDialog';

const LinkComponentStyle = styled.button`
  width: fit-content;
  border-bottom: ${(props) => props.theme.editLine};
  outline: none;
  color: ${(props) => props.theme.gray};
`;

export default function LinkComponent() {
  const [linkWord, setTextWord] = useState('了解更多');
  const [showEditCard, setShowCardList] = useState(false);

  const editLink = () => {
    setShowCardList((prevState) => !prevState);
  };

  return (
    <>
      <LinkComponentStyle
        type="button"
        onClick={() => {
          editLink();
        }}
      >
        {linkWord}
      </LinkComponentStyle>
      {showEditCard && <LinkDialog setShowCardList={setShowCardList} />}
    </>
  );
}
