'use client';
import { ListPointerWrapper } from '@/src/app/ui/ComponentStyle';
import DeleteButton from '@/src/app/ui/createPage/formComponent/button/DeleteButton';
import TextArea from '@/src/app/ui/createPage/formComponent/smallElement/TextArea';
import { useAppDispatch } from '@/src/lib/RThooks';
import { editFormChildElement } from '@/src/lib/feature/formDataSlice';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { NodeKeyContext } from '@/src/lib/provider/context';
import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { useContext } from 'react';

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
        <ListPointerWrapper
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
        </ListPointerWrapper>
      )}
    </Draggable>
  );
}
