'use client';
import { useAppDispatch } from '@/src/lib/RThooks';
import {
  editFormElement,
  removeFormElement,
} from '@/src/lib/feature/formDataSlice';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { NodeKeyContext } from '@/src/lib/provider/context';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../../../theme';
import DeleteButton from '../button/DeleteButton';
import TextArea from '../smallElement/TextArea';

const ListCardWrapper = styled.div`
  border: ${(props) => props.theme.editLine};
  padding: 50px 30px;
`;

const ButtonGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export default function ListLayout({
  nodeKey,
  children,
  collapseStatus,
}: {
  nodeKey: string;
  children: React.ReactNode;
  collapseStatus: boolean;
}) {
  const [openList, setOpenList] = useState(true);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    setOpenList(!openList);
  };
  const { getTitleInputValue } = useTextAreaInputValue('0');
  const titleValue = getTitleInputValue(nodeKey);
  useEffect(() => {
    if (collapseStatus) {
      setOpenList(false);
    } else {
      setOpenList(true);
    }
  }, [collapseStatus]);

  const handleTitleInputDispatch = (inputValue: string) => {
    dispatch(editFormElement({ nodeKey: nodeKey, componentTitle: inputValue }));
  };

  return (
    <NodeKeyContext.Provider value={nodeKey}>
      <ThemeProvider theme={Theme}>
        <ListCardWrapper>
          <div
            className="mb-4 flex justify-end"
            onClick={() => {
              dispatch(removeFormElement({ nodeKey: nodeKey }));
            }}
          >
            <DeleteButton />
          </div>

          <TextArea
            placeholderText="填寫表格的標題"
            textCount={50}
            styleHeight={'80px'}
            styleFontSize={'24px'}
            dispatchFunction={handleTitleInputDispatch}
            value={titleValue}
          />
          {/* 調整順序時，得collapse，且使用者不能再調整 */}
          {!collapseStatus && (
            <ListItemButton
              onClick={handleClick}
              className="black"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                margin: '20px auto',
              }}
            >
              {openList ? (
                <>
                  <ExpandLess className="text-black" />
                  <p className="text-black">收起</p>
                </>
              ) : (
                <>
                  <ExpandMore className="text-black" />
                  <p className="text-black">展開</p>
                </>
              )}
            </ListItemButton>
          )}

          <Collapse in={openList} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        </ListCardWrapper>
      </ThemeProvider>
    </NodeKeyContext.Provider>
  );
}
