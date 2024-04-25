'use client';
import { MEDIA_QUERY_LG, MEDIA_QUERY_MD } from '@/src/app/style';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import {
  FormElement,
  changeFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import styled, { ThemeProvider } from 'styled-components';
import { NodeKeyContext } from '../../../../../lib/context';
import { Theme } from '../../../../theme';
import DeleteButton from '../button/DeleteButton';
import PortfolioEditCard from '../card/PortfolioEditCard';
import TextInput from '../smallElement/TextInput';

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
  const formList = useAppSelector(selectFormData);
  const [openList, setOpenList] = useState(true);

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
      //  PortfolioEditCard 中設有data-id
      const newData = [...gridRef.current.children]
        .map((i: any) => i.dataset.id)
        .map((id: string) => {
          list[id] = currentComponentChild[id];
        });

      const data = { nodeKey: nodeKey, children: list };
      dispatch(changeFormChildElement(data));
    }
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  useEffect(() => {
    if (gridRef.current) {
      sortableJsRef.current = new Sortable(gridRef.current, {
        animation: 150,
        onEnd: onListChange,
      });
    }
  });
  return (
    <NodeKeyContext.Provider value={nodeKey}>
      <ThemeProvider theme={Theme}>
        <ListCardWrapper>
          <div>
            <TextInput
              placeholderText="填寫表格的標題"
              textCount={50}
              styleHeight={'80px'}
              styleFontSize={'24px'}
            />
            <ListItemButton onClick={handleClick} className="black">
              {openList ? (
                <ExpandLess className="text-black" />
              ) : (
                <ExpandMore className="text-black" />
              )}
            </ListItemButton>
          </div>
          <div className="flex justify-end">
            <DeleteButton />
          </div>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <ListWrapper ref={gridRef} id="gridDemo">
              {cardList}
            </ListWrapper>
          </Collapse>
        </ListCardWrapper>
      </ThemeProvider>
    </NodeKeyContext.Provider>
  );
}
