'use client';
import { MEDIA_QUERY_LG, MEDIA_QUERY_MD } from '@/src/app/style';
import {
  FormElement,
  changeFormChildElement,
} from '@/src/lib/feature/formDataSlice';
import { useAppDispatch, useAppSelector, useAppStore } from '@/src/lib/hooks';
import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import styled, { ThemeProvider } from 'styled-components';
import { NodeKeyContext } from '../../../../lib/context';
import { Theme } from '../../../theme';
import DeleteButton from '../button/DeleteButton';
import PortfolioEditCard from '../card/PortfolioEditCard';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;

  ${MEDIA_QUERY_MD} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  ${MEDIA_QUERY_LG} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ListCardWrapper = styled.div`
  border: ${(props) => props.theme.editLine};
  padding: 50px 30px;
`;

export default function PortfolioEditCardList({
  nodeKey,
}: {
  nodeKey: string;
}) {
  const dispatch = useAppDispatch();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const sortableJsRef = useRef<Sortable | null>(null);

  const formList = useAppSelector((state) => state.FormData.formData);
  const currentComponentChild = formList[nodeKey]['children'];
  let cardList: React.ReactElement[] = [];
  if (currentComponentChild && Object.keys(currentComponentChild).length > 0) {
    const cardListKey = Object.keys(currentComponentChild);
    cardList = [];
    cardListKey.map((key: string) => {
      cardList.push(
        <PortfolioEditCard childKey={key} key={key}></PortfolioEditCard>
      );
    });
  }

  const onListChange = () => {
    const list: { [key: string]: FormElement } = {};
    if (gridRef.current) {
      //  PortfolioEditCard 中設有dataset.id
      const newData = [...gridRef.current.children]
        .map((i: any) => i.dataset.id)
        .map((id: string) => {
          list[id] = currentComponentChild[id];
        });

      const data = { nodeKey: nodeKey, children: list };
      dispatch(changeFormChildElement(data));
    }
  };

  useEffect(() => {
    if (gridRef.current) {
      sortableJsRef.current = new Sortable(gridRef.current, {
        animation: 150,
        onEnd: onListChange,
      });
    }
  }, []);
  return (
    <NodeKeyContext.Provider value={nodeKey}>
      <ThemeProvider theme={Theme}>
        <ListCardWrapper>
          <div className="flex justify-end">
            <DeleteButton />
          </div>
          <ListWrapper ref={gridRef} id="gridDemo">
            {cardList}
          </ListWrapper>
        </ListCardWrapper>
      </ThemeProvider>
    </NodeKeyContext.Provider>
  );
}
