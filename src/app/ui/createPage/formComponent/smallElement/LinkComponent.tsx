'use client';
import { useAppSelector } from '@/src/lib/RThooks';
import { selectFormData } from '@/src/lib/feature/formDataSlice';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import LinkDialog from './LinkDialog';

const LinkComponentStyle = styled.button`
  width: fit-content;
  border-bottom: ${(props) => props.theme.editLine};
  outline: none;
  color: ${(props) => props.theme.gray};
`;

export default function LinkComponent() {
  const [showEditCard, setShowCardList] = useState(false);
  const data = useAppSelector(selectFormData);
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const childData = data[nodeKey]['children'][childKey];
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
        {/* {linkWord} */}
        {childData && childData.linkText ? childData.linkText : '了解更多'}
      </LinkComponentStyle>
      {showEditCard && <LinkDialog setShowCardList={setShowCardList} />}
    </>
  );
}
