'use client';
import styled from 'styled-components';
import { ChildKeyContext } from '../../../../lib/context';
import DeleteButton from '../button/DeleteButton';
import ImageComponent from '../smallElement/ImageComponent';
import LinkComponent from '../smallElement/LinkComponent';
import TextInput from '../smallElement/TextInput';

const CardWrapper = styled.div`
  color: black;
  display: block;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function PortfolioEditCard({ childKey }: { childKey: string }) {
  return (
    <ChildKeyContext.Provider value={childKey}>
      <CardWrapper className={childKey} data-id={childKey}>
        <div className="flex justify-end">
          <DeleteButton />
        </div>
        <div className="mb-4">
          <ImageComponent />
        </div>
        <div className="mb-4">
          <TextInput
            placeholderText="請簡短介紹 例如：購物網站"
            textCount={120}
          ></TextInput>
        </div>
        <div className="mb-4 flex justify-end">
          <LinkComponent />
        </div>
      </CardWrapper>
    </ChildKeyContext.Provider>
  );
}
