import ButtonCva from '@/src/app/ui/ButtonCva';
import TextArea from '@/src/app/ui/createPage/formComponent/smallElement/TextArea';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import ListPointRow from './ListPointRow';

export default function ListPointColumn({
  columnId,
  columnIndex,
}: {
  columnId: string;
  columnIndex: number;
}) {
  const {
    getInputArrayValue,
    handleTextAreaDispatch,
    getInputValue,
    handleTextAreaArrayDispatch,
  } = useTextAreaInputValue(columnId);

  const elements = getInputArrayValue();
  const inputTitleValue = getInputValue();
  const handleAddNewList = () => {
    const newDataIndex = elements.length;
    handleTextAreaArrayDispatch(undefined, newDataIndex);
  };

  return (
    <Draggable draggableId={columnId} index={columnIndex}>
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="border p-5"
        >
          <TextArea
            placeholderText="限制20字元，列點標題"
            textCount={20}
            styleHeight={'40'}
            dispatchFunction={handleTextAreaDispatch}
            value={inputTitleValue}
          />
          <Droppable droppableId={`${columnId}-droppable`} type="task">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {elements.map((element: string | undefined, index: number) => {
                  return (
                    <ListPointRow
                      key={index}
                      rowId={`${columnId}-${index}`}
                      rowIndex={index}
                      childKey={columnId}
                      inputValue={element}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div
            className="mt-2 flex w-full justify-center"
            onClick={handleAddNewList}
          >
            <ButtonCva type="button" size={'sm'} intent={'fourth'}>
              新增列點
            </ButtonCva>
          </div>
        </div>
      )}
    </Draggable>
  );
}
