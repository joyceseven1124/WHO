'use client';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { NodeKeyContext } from '@/src/lib/context';
import {
  addFormChildElement,
  changeFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import styled from 'styled-components';
import { PortfolioCardListWrapperStyle } from '../../../ComponentStyle';
import PortfolioEditCard from '../card/PortfolioEditCard';

const AddComponentButtonStyle = styled.div`
  color: ${(props) => props.theme.gray};
  font-size: 18px;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.gray};
  cursor: pointer;
  background-color: #e2e2e2;
  &:hover {
    color: white;
    background-color: #8e8e8e;
    .cardButtonIcon {
      color: white;
    }
  }
`;

export default function PortfolioEditCardList() {
  const nodeKey = useContext(NodeKeyContext);
  const dispatch = useAppDispatch();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const sortableJsRef = useRef<Sortable | null>(null);
  const formList = useAppSelector(selectFormData);

  const currentComponentChild = formList[nodeKey]['children'];
  let cardList: React.ReactElement[] = [];
  if (currentComponentChild && Object.keys(currentComponentChild).length > 0) {
    const cardListKey = Object.keys(currentComponentChild);
    cardList = [];
    cardListKey.map((key: string, index: number) => {
      cardList.push(
        <PortfolioEditCard childKey={key} key={key}></PortfolioEditCard>
      );
    });
  }

  const onListChange = () => {
    // const list: { [key: string]: FormElement } = {};
    const list: string[] = [];
    if (gridRef.current) {
      //  PortfolioEditCard 中設有data-id
      const newData = [...gridRef.current.children]
        .map((i: any) => i.dataset.id)
        .map((id: string) => {
          if (id !== 'card-button') {
            list.push(id);
          }
        });
      const data = { nodeKey: nodeKey, childrenPositionArray: list };
      dispatch(changeFormChildElement(data));
    }
  };

  useEffect(() => {
    if (gridRef.current) {
      sortableJsRef.current = new Sortable(gridRef.current, {
        animation: 150,
        onEnd: onListChange,
        filter: '.cardButton',
      });
    }
  });
  return (
    <>
      <PortfolioCardListWrapperStyle ref={gridRef} id="gridDemo">
        {cardList}
        {cardList.length < formList[nodeKey]['componentCount'] && (
          <AddComponentButtonStyle
            className="cardButton text-black"
            data-id="card-button"
            onClick={() => {
              dispatch(
                addFormChildElement({
                  nodeKey: nodeKey,
                  childKey: `${Date.now()}`,
                })
              );
            }}
          >
            新增卡片
            <PlusCircleIcon className="cardButtonIcon h-[24px] w-[24px] text-gray-500  peer-focus:text-gray-900" />
          </AddComponentButtonStyle>
        )}
      </PortfolioCardListWrapperStyle>
    </>
  );
}
