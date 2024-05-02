'use client';
import DeleteButton from '@/src/app/ui/createPage/formComponent/button/DeleteButton';
import TextArea from '@/src/app/ui/createPage/formComponent/smallElement/TextArea';
import { useAppDispatch } from '@/src/lib/RThooks';
import { NodeKeyContext } from '@/src/lib/context';
import { editFormChildElement } from '@/src/lib/feature/formDataSlice';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { useContext } from 'react';
import styled from 'styled-components';

const ListPointWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  column-gap: 10px;
  .point {
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.circleColor};
  }
`;

export default function ListPointRow({
  rowId,
  rowIndex,
  childKey,
  inputValue,
}: {
  rowId: string;
  rowIndex: number;
  childKey: string;
  inputValue: string | undefined;
}) {
  const nodeKey = useContext(NodeKeyContext);
  const dispatch = useAppDispatch();
  const { handleTextAreaArrayDispatch, getInputArrayValue } =
    useTextAreaInputValue(childKey);
  const handleDispatch = (inputValue: string) => {
    handleTextAreaArrayDispatch(inputValue, rowIndex);
  };

  const handleDeleteRow = () => {
    const data = getInputArrayValue();
    const newData = [...data];
    console.log(rowIndex, 'index');
    newData.splice(rowIndex, 1);
    dispatch(
      editFormChildElement({
        nodeKey: nodeKey,
        childKey: childKey,
        elements: { listTextArray: newData },
      })
    );
  };

  return (
    <Draggable draggableId={rowId} index={rowIndex}>
      {(provided: DraggableProvided) => (
        <ListPointWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="point"></div>
          <TextArea
            placeholderText="限制20字元"
            textCount={20}
            styleHeight={'30'}
            dispatchFunction={handleDispatch}
            value={inputValue}
          />
          <div onClick={handleDeleteRow}>
            <DeleteButton />
          </div>
        </ListPointWrapper>
      )}
    </Draggable>
  );
}
